/**
 * ZeusLabs API — SQLite (node:sqlite) + uploads for Our Work portfolio.
 * Requires Node.js 22.5+ (DatabaseSync).
 * Run: npm run dev:api (or npm run dev for Vite + API together)
 */
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { DatabaseSync } from "node:sqlite";
import {
  mkdirSync,
  existsSync,
  createReadStream,
  unlinkSync,
  writeFileSync,
} from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const UPLOAD_DIR = path.join(DATA_DIR, "uploads");
const DB_PATH = path.join(DATA_DIR, "zeuslabs.db");

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

mkdirSync(UPLOAD_DIR, { recursive: true });

const db = new DatabaseSync(DB_PATH);
db.exec(`
  CREATE TABLE IF NOT EXISTS work_items (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    gallery_json TEXT NOT NULL DEFAULT '[]',
    video TEXT NOT NULL DEFAULT '',
    url TEXT NOT NULL DEFAULT '',
    client_name TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL
  );
`);

export type WorkRow = {
  id: string;
  title: string;
  description: string;
  gallery: string[];
  video: string;
  url: string;
  clientName: string;
  createdAt: string;
};

type SqlWorkRow = {
  id: string;
  title: string;
  description: string;
  gallery_json: string;
  video: string;
  url: string;
  client_name: string;
  created_at: string;
};

/** Ensure relative paths work in <img src> (leading slash, no accidental spaces). */
function normalizeGalleryUrl(u: unknown): string {
  if (typeof u !== "string") return "";
  const t = u.trim();
  if (!t) return "";
  if (/^https?:\/\//i.test(t) || t.startsWith("data:") || t.startsWith("blob:")) return t;
  return t.startsWith("/") ? t : `/${t.replace(/^\/+/, "")}`;
}

function rowToItem(row: SqlWorkRow): WorkRow {
  let gallery: string[] = [];
  try {
    gallery = JSON.parse(row.gallery_json || "[]");
    if (!Array.isArray(gallery)) gallery = [];
  } catch {
    gallery = [];
  }
  gallery = gallery.map(normalizeGalleryUrl).filter(Boolean);
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    gallery,
    video: row.video,
    url: row.url,
    clientName: row.client_name,
    createdAt: row.created_at,
  };
}

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  }),
);

app.get("/api/health", (c) => c.json({ ok: true, db: existsSync(DB_PATH) }));

const selectAll = db.prepare(
  `SELECT id, title, description, gallery_json, video, url, client_name, created_at
   FROM work_items ORDER BY datetime(created_at) DESC`,
);

app.get("/api/work", (c) => {
  const rows = selectAll.all() as SqlWorkRow[];
  return c.json(rows.map(rowToItem));
});

const insertStmt = db.prepare(
  `INSERT INTO work_items (id, title, description, gallery_json, video, url, client_name, created_at)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
);

app.post("/api/work", async (c) => {
  try {
    const body = await c.req.json<{
      title: string;
      description?: string;
      gallery?: string[];
      video?: string;
      url?: string;
      clientName?: string;
    }>();
    if (!body?.title?.trim()) {
      return c.json({ error: "title required" }, 400);
    }
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const gallery = Array.isArray(body.gallery)
      ? body.gallery.map(normalizeGalleryUrl).filter(Boolean)
      : [];
    const galleryJson = JSON.stringify(gallery);
    insertStmt.run(
      id,
      body.title.trim(),
      (body.description ?? "").trim(),
      galleryJson,
      (body.video ?? "").trim(),
      (body.url ?? "").trim(),
      (body.clientName ?? "").trim(),
      createdAt,
    );
    const row = db
      .prepare(
        `SELECT id, title, description, gallery_json, video, url, client_name, created_at FROM work_items WHERE id = ?`,
      )
      .get(id) as SqlWorkRow;
    return c.json(rowToItem(row));
  } catch (e) {
    console.error(e);
    return c.json({ error: "create failed" }, 500);
  }
});

const selectGallery = db.prepare(`SELECT gallery_json FROM work_items WHERE id = ?`);
const deleteRow = db.prepare(`DELETE FROM work_items WHERE id = ?`);

app.delete("/api/work/:id", (c) => {
  const id = c.req.param("id");
  const row = selectGallery.get(id) as { gallery_json: string } | undefined;
  if (!row) return c.json({ error: "not found" }, 404);

  let gallery: string[] = [];
  try {
    gallery = JSON.parse(row.gallery_json || "[]");
  } catch {
    gallery = [];
  }
  for (const u of gallery) {
    if (typeof u === "string" && u.startsWith("/api/uploads/")) {
      const fn = path.basename(u.replace("/api/uploads/", ""));
      const diskPath = path.join(UPLOAD_DIR, fn);
      try {
        if (existsSync(diskPath)) unlinkSync(diskPath);
      } catch {
        /* ignore */
      }
    }
  }

  deleteRow.run(id);
  return c.json({ ok: true });
});

const RASTER_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".avif"]);

async function saveUploadCompressed(buf: Buffer, safeExt: string): Promise<{ name: string }> {
  const skipCompress =
    safeExt === ".svg" ||
    safeExt === ".gif" ||
    safeExt === ".bin" ||
    !RASTER_EXT.has(safeExt);

  if (skipCompress) {
    const name = `${randomUUID()}${safeExt}`;
    writeFileSync(path.join(UPLOAD_DIR, name), buf);
    return { name };
  }

  try {
    let pipeline = sharp(buf).rotate();
    const meta = await pipeline.metadata();
    const maxEdge = 1920;
    const w = meta.width ?? 0;
    const h = meta.height ?? 0;
    if (w > maxEdge || h > maxEdge) {
      pipeline = pipeline.resize(maxEdge, maxEdge, {
        fit: "inside",
        withoutEnlargement: true,
      });
    }
    const webpBuf = await pipeline.webp({ quality: 82, effort: 4 }).toBuffer();
    const name = `${randomUUID()}.webp`;
    writeFileSync(path.join(UPLOAD_DIR, name), webpBuf);
    return { name };
  } catch (e) {
    console.warn("upload: sharp compress failed, storing original", e);
    const name = `${randomUUID()}${safeExt}`;
    writeFileSync(path.join(UPLOAD_DIR, name), buf);
    return { name };
  }
}

app.post("/api/work/upload", async (c) => {
  try {
    const form = await c.req.formData();
    const files = form.getAll("files") as File[];
    if (!files.length) {
      return c.json({ error: "no files", urls: [] }, 400);
    }
    const urls: string[] = [];
    for (const file of files) {
      if (!(file instanceof File) || file.size === 0) continue;
      const orig = file.name || "upload";
      const ext = path.extname(orig).toLowerCase() || ".bin";
      const safeExt = ext.match(/^\.[a-z0-9]{1,8}$/) ? ext : ".bin";
      const buf = Buffer.from(await file.arrayBuffer());
      if (buf.length > 25 * 1024 * 1024) continue;
      const { name } = await saveUploadCompressed(buf, safeExt);
      urls.push(`/api/uploads/${name}`);
    }
    return c.json({ urls });
  } catch (e) {
    console.error(e);
    return c.json({ error: "upload failed", urls: [] }, 500);
  }
});

app.get("/api/uploads/:name", (c) => {
  const raw = c.req.param("name");
  if (!raw || raw.includes("..") || raw.includes("/") || raw.includes("\\")) {
    return c.text("bad request", 400);
  }
  const filename = path.basename(raw);
  const diskPath = path.join(UPLOAD_DIR, filename);
  const resolved = path.resolve(diskPath);
  const resolvedDir = path.resolve(UPLOAD_DIR);
  if (!resolved.startsWith(resolvedDir) || !existsSync(resolved)) {
    return c.text("not found", 404);
  }
  const ext = path.extname(resolved).toLowerCase();
  const type = MIME[ext] ?? "application/octet-stream";
  return new Response(createReadStream(resolved) as unknown as BodyInit, {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
});

const port = Number(process.env.PORT) || 8787;
console.log(`API + SQLite (node:sqlite) at http://127.0.0.1:${port}  (DB: ${DB_PATH})`);
serve({ fetch: app.fetch, port });
