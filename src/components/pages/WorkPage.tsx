import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Images as ImagesIcon, LayoutGrid, Sparkles } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { fetchWorkItems, type WorkPortfolioItem } from "../../utils/workApi";
import { workHeadingFont } from "../work/workPortfolioUtils";
import { WorkGalleryLightbox } from "../work/WorkGalleryLightbox";
import { WorkProjectCard } from "../work/WorkProjectCard";

function WorkGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
        <div className="aspect-[4/3] animate-pulse bg-muted md:col-span-1" />
        <div className="space-y-3 p-6">
          <div className="h-3 w-24 animate-pulse rounded bg-muted" />
          <div className="h-8 w-[85%] max-w-md animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        </div>
      </div>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-border/60 bg-card">
          <div className="aspect-[4/3] animate-pulse bg-muted" />
          <div className="space-y-3 p-5">
            <div className="h-3 w-20 animate-pulse rounded bg-muted" />
            <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-3 w-full animate-pulse rounded bg-muted" />
            <div className="h-3 w-full animate-pulse rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function WorkPage() {
  const [items, setItems] = useState<WorkPortfolioItem[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [galleryItem, setGalleryItem] = useState<WorkPortfolioItem | null>(null);
  const reduceMotion = useReducedMotion() === true;

  useEffect(() => {
    const load = async (showSkeleton: boolean) => {
      try {
        setLoadError(null);
        if (showSkeleton) setLoading(true);
        setItems(await fetchWorkItems());
      } catch {
        setLoadError(
          "Could not load Our Work. Run the API server (npm run dev includes it on port 8787).",
        );
        setItems([]);
      } finally {
        if (showSkeleton) setLoading(false);
      }
    };
    void load(true);
    const onRefresh = () => void load(false);
    window.addEventListener("work-portfolio-change", onRefresh);
    return () => window.removeEventListener("work-portfolio-change", onRefresh);
  }, []);

  const openGallery = useCallback((item: WorkPortfolioItem) => {
    if (!item.gallery?.length) return;
    setGalleryItem(item);
  }, []);

  const closeGallery = useCallback(() => {
    setGalleryItem(null);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,hsl(var(--primary)/0.12),transparent_55%),radial-gradient(ellipse_80%_50%_at_100%_50%,hsl(var(--accent)/0.08),transparent_45%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-80" />

      <section className="relative z-10 pb-20 pt-24 md:pb-28 md:pt-28">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.header
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto mb-14 max-w-3xl text-center md:mb-20"
          >
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2"
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            >
              <Sparkles className="h-4 w-4 text-primary" aria-hidden />
              <span
                className="text-xs font-semibold uppercase tracking-[0.25em] text-primary"
                style={workHeadingFont}
              >
                Portfolio
              </span>
            </motion.div>
            <h1
              className="text-4xl font-bold tracking-tight text-foreground md:text-6xl md:leading-[1.05]"
              style={workHeadingFont}
            >
              Our Work
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
              Product launches, brand systems, and engineering partnerships—selected work that shows how we
              ship with clarity and craft.
            </p>
            {!loading && !loadError && items.length > 0 ? (
              <p
                className="mt-6 text-sm font-medium text-muted-foreground"
                style={workHeadingFont}
              >
                {items.length} {items.length === 1 ? "project" : "projects"}
              </p>
            ) : null}
          </motion.header>

          {loadError && (
            <Card className="mb-10 border-destructive/40 bg-destructive/5">
              <CardContent className="py-5 text-center text-destructive text-sm md:px-8">
                {loadError}
              </CardContent>
            </Card>
          )}

          {loading && !loadError ? (
            <WorkGridSkeleton />
          ) : null}

          {!loading && !loadError && items.length === 0 ? (
            <Card className="border-dashed border-2 border-border/60 bg-muted/20">
              <CardContent className="flex flex-col items-center py-20 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                  <LayoutGrid className="h-8 w-8 text-muted-foreground" aria-hidden />
                </div>
                <p className="mb-2 text-lg font-medium text-foreground">No projects published yet</p>
                <p className="max-w-md text-sm text-muted-foreground">
                  Add entries in the admin dashboard under{" "}
                  <strong className="text-foreground">Our Work</strong> (
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">?admin=true</code>
                  ), with <code className="rounded bg-muted px-1.5 py-0.5 text-xs">npm run dev</code> so the
                  API and database are running.
                </p>
              </CardContent>
            </Card>
          ) : null}

          {!loading && !loadError && items.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 lg:gap-8">
              {items.map((item, i) => (
                <WorkProjectCard
                  key={item.id}
                  item={item}
                  index={i}
                  total={items.length}
                  onOpenGallery={openGallery}
                />
              ))}
            </div>
          ) : null}

          {!loading && !loadError && items.length > 0 ? (
            <motion.p
              initial={reduceMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground"
            >
              <ImagesIcon className="h-4 w-4 shrink-0 opacity-60" aria-hidden />
              <span>Click any project image or &ldquo;Open gallery&rdquo; to browse full-screen.</span>
            </motion.p>
          ) : null}
        </div>
      </section>

      <WorkGalleryLightbox item={galleryItem} onClose={closeGallery} />
    </div>
  );
}
