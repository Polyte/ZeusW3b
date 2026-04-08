import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { resolveWorkMediaUrl, type WorkPortfolioItem } from "../../utils/workApi";
import { workHeadingFont } from "./workPortfolioUtils";

type Props = {
  item: WorkPortfolioItem | null;
  onClose: () => void;
};

/**
 * Lightweight modal: no Framer Motion (layout/animate work was slowing open).
 * Thumbnails mount after the next frames so the shell + main image paint first.
 */
export function WorkGalleryLightbox({ item, onClose }: Props) {
  const gallery = item?.gallery ?? [];
  const len = gallery.length;

  const [fullscreen, setFullscreen] = useState(false);
  const [index, setIndex] = useState(0);
  const [thumbsMounted, setThumbsMounted] = useState(false);

  const fullscreenRef = useRef(fullscreen);
  fullscreenRef.current = fullscreen;

  useEffect(() => {
    setIndex(0);
    setFullscreen(false);
  }, [item?.id]);

  useEffect(() => {
    setThumbsMounted(false);
    if (!item || len < 2) return;
    let id1 = 0;
    let id2 = 0;
    id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => setThumbsMounted(true));
    });
    return () => {
      cancelAnimationFrame(id1);
      cancelAnimationFrame(id2);
    };
  }, [item?.id, len]);

  const goPrev = useCallback(() => {
    if (!item || item.gallery.length < 2) return;
    const n = item.gallery.length;
    setIndex((i) => (i - 1 + n) % n);
  }, [item]);

  const goNext = useCallback(() => {
    if (!item || item.gallery.length < 2) return;
    const n = item.gallery.length;
    setIndex((i) => (i + 1) % n);
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (fullscreenRef.current) setFullscreen(false);
        else onClose();
        return;
      }
      if (item.gallery.length < 2) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose, goPrev, goNext]);

  useEffect(() => {
    if (!item) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [item]);

  const close = () => {
    onClose();
    setFullscreen(false);
  };

  if (typeof document === "undefined") return null;
  if (!item || len < 1) return null;

  const rawMain = gallery[Math.min(index, len - 1)] ?? "";
  const mainSrc = rawMain ? resolveWorkMediaUrl(rawMain) : "";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="work-gallery-title"
      className={cn(
        "fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6",
        fullscreen ? "bg-black/95" : "bg-black/80",
      )}
    >
      <button
        type="button"
        aria-label={fullscreen ? "Exit full screen" : "Close gallery"}
        className="absolute inset-0 z-0 cursor-default"
        onClick={() => {
          if (fullscreen) setFullscreen(false);
          else close();
        }}
      >
        <span className="sr-only">Dismiss</span>
      </button>

      <div
        className={cn(
          "relative z-10 flex max-h-[min(92dvh,900px)] w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-background shadow-[0_25px_80px_-12px_rgba(0,0,0,0.65)]",
          fullscreen
            ? "h-[calc(100dvh-1.25rem)] max-h-none w-[calc(100vw-1.25rem)] sm:h-[calc(100dvh-2rem)] sm:w-[calc(100vw-2rem)]"
            : "h-[min(560px,calc(100dvh-2rem))] max-w-[min(520px,calc(100vw-2rem))]",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-border/80 bg-muted/20 px-4 py-3 sm:px-5">
          <div className="min-w-0 pt-0.5">
            <p
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
              style={workHeadingFont}
            >
              {item.clientName || "Client"}
            </p>
            <h2
              id="work-gallery-title"
              className="mt-1 truncate text-base font-semibold text-foreground sm:text-lg"
              style={workHeadingFont}
            >
              {item.title}
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-0.5">
            <button
              type="button"
              aria-label={fullscreen ? "Exit full screen" : "Full screen"}
              onClick={() => setFullscreen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div
          className={cn(
            "relative flex min-h-0 flex-1 items-center justify-center bg-gradient-to-b from-muted/30 to-muted/60",
            fullscreen ? "p-3 sm:p-6" : "p-3",
          )}
        >
          <button
            type="button"
            className="relative flex h-full min-h-[180px] w-full max-h-full items-center justify-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
            onClick={(e) => {
              e.stopPropagation();
              setFullscreen((v) => !v);
            }}
            aria-label={fullscreen ? "Exit full screen" : "Full screen"}
          >
            <div className="flex h-full w-full items-center justify-center">
              <ImageWithFallback
                src={mainSrc}
                alt={`${item.title} — ${index + 1} of ${len}`}
                className="max-h-full max-w-full object-contain"
                loading="eager"
                decoding="async"
                fetchPriority={index === 0 ? "high" : "auto"}
              />
            </div>
          </button>

          {len > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-background/95 text-foreground shadow-lg transition-colors hover:bg-accent sm:left-3"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-background/95 text-foreground shadow-lg transition-colors hover:bg-accent sm:right-3"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <p className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/75 px-3 py-1 text-xs font-medium text-white">
                {index + 1} / {len}
              </p>
            </>
          )}
        </div>

        {len > 1 && thumbsMounted && (
          <div className="shrink-0 border-t border-border/80 bg-background/95 px-3 py-2.5 sm:px-4">
            <p className="mb-2 hidden text-xs text-muted-foreground sm:block">
              {fullscreen ? "Arrow keys to navigate · Esc to exit full screen" : "Thumbnails · click main image for full screen"}
            </p>
            <div className="flex gap-2 overflow-x-auto overflow-y-hidden pb-1">
              {gallery.map((src, idx) => (
                <button
                  key={`${item.id}-thumb-${idx}`}
                  type="button"
                  onClick={() => setIndex(idx)}
                  className={cn(
                    "h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:h-16 sm:w-16",
                    idx === index
                      ? "border-primary ring-2 ring-primary/40 ring-offset-2 ring-offset-background"
                      : "border-transparent opacity-80 hover:border-border hover:opacity-100",
                  )}
                >
                  <img
                    src={resolveWorkMediaUrl(src)}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        <footer className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-border/80 bg-muted/10 px-4 py-3 sm:px-5">
          <a
            href={mainSrc}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline sm:text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open image
          </a>
          <div className="flex flex-wrap items-center gap-2">
            {item.video?.trim() ? (
              <Button variant="secondary" size="sm" className="h-9" asChild>
                <a href={item.video.trim()} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                  Watch video
                </a>
              </Button>
            ) : null}
            {item.url?.trim() ? (
              <Button variant="default" size="sm" className="h-9" asChild>
                <a href={item.url.trim()} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                  Visit project
                </a>
              </Button>
            ) : null}
          </div>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
