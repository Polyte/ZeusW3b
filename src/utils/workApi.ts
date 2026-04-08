export type WorkPortfolioItem = {
  id: string;
  title: string;
  description: string;
  gallery: string[];
  video: string;
  url: string;
  clientName: string;
  createdAt: string;
};

/** When the SPA is served from a different origin than the Hono API, set e.g. VITE_API_BASE_URL=https://api.yoursite.com */
function apiBase(): string {
  const raw = import.meta.env?.VITE_API_BASE_URL;
  if (raw === undefined || raw === null || String(raw).trim() === "") return "";
  return String(raw).replace(/\/$/, "");
}

const API_BASE = apiBase();

const api = (path: string) => (API_BASE ? `${API_BASE}${path}` : path);

/** Resolve gallery/cover URLs for <img src> (same-origin or split deploy). */
export function resolveWorkMediaUrl(url: string): string {
  if (!url || typeof url !== "string") return url;
  const t = url.trim();
  if (!t) return t;
  if (/^https?:\/\//i.test(t) || t.startsWith("data:") || t.startsWith("blob:")) return t;
  const p = t.startsWith("/") ? t : `/${t.replace(/^\/+/, "")}`;
  return API_BASE ? `${API_BASE}${p}` : p;
}

export function emitWorkPortfolioChange() {
  window.dispatchEvent(new Event("work-portfolio-change"));
}

export function parseGalleryInput(raw: string): string[] {
  return raw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function checkWorkApi(): Promise<boolean> {
  try {
    const r = await fetch(api("/api/health"));
    return r.ok && (await r.json()).ok === true;
  } catch {
    return false;
  }
}

export async function fetchWorkItems(): Promise<WorkPortfolioItem[]> {
  const r = await fetch(api("/api/work"));
  if (!r.ok) throw new Error(`Work API error: ${r.status}`);
  return r.json();
}

export async function createWorkItem(
  item: Omit<WorkPortfolioItem, "id" | "createdAt">,
): Promise<WorkPortfolioItem> {
  const r = await fetch(api("/api/work"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error || r.statusText);
  }
  return r.json();
}

export async function deleteWorkItemRemote(id: string): Promise<void> {
  const r = await fetch(api(`/api/work/${encodeURIComponent(id)}`), {
    method: "DELETE",
  });
  if (!r.ok) throw new Error("Delete failed");
}

/** Bulk image upload; returns public URLs (proxy to API in dev). */
export async function uploadWorkGalleryFiles(files: FileList | File[]): Promise<string[]> {
  const list = Array.from(files as FileList);
  if (!list.length) return [];
  const fd = new FormData();
  for (const f of list) fd.append("files", f);
  const r = await fetch(api("/api/work/upload"), {
    method: "POST",
    body: fd,
  });
  if (!r.ok) throw new Error("Upload failed");
  const data = (await r.json()) as { urls?: string[] };
  return data.urls ?? [];
}
