import { memo } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ExternalLink,
  Images as ImagesIcon,
  Play,
  Sparkles,
  Video,
} from "lucide-react";
import { cn } from "../ui/utils";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { resolveWorkMediaUrl, type WorkPortfolioItem } from "../../utils/workApi";
import { workHeadingFont, workProjectYear } from "./workPortfolioUtils";

type Props = {
  item: WorkPortfolioItem;
  index: number;
  total: number;
  onOpenGallery: (item: WorkPortfolioItem) => void;
};

function WorkProjectCardInner({ item, index, total, onOpenGallery }: Props) {
  const reduceMotion = useReducedMotion() === true;
  const year = workProjectYear(item.createdAt);
  const imgCount = item.gallery.length;
  const hasCover = Boolean(item.gallery[0]);
  const isFeature = index === 0 && total >= 3;
  const hasVideo = Boolean(item.video?.trim());

  const media = (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        isFeature ? "aspect-[4/3] min-h-[220px] md:aspect-auto md:min-h-[min(100%,420px)] md:max-h-[480px]" : "aspect-[4/3]",
      )}
    >
      {hasCover ? (
        <button
          type="button"
          onClick={() => onOpenGallery(item)}
          className="group/img relative block h-full w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
          aria-label={`Open gallery: ${item.title}`}
        >
          <ImageWithFallback
            src={resolveWorkMediaUrl(item.gallery[0])}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.04]"
            loading={index < 4 ? "eager" : "lazy"}
            decoding="async"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 transition-opacity duration-300 group-hover/img:opacity-90"
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
            <span className="translate-y-2 text-sm font-semibold text-foreground opacity-0 transition-all duration-300 group-hover/img:translate-y-0 group-hover/img:opacity-100">
              View gallery
              {imgCount > 1 ? ` · ${imgCount} images` : ""}
            </span>
          </div>
        </button>
      ) : (
        <div className="flex h-full min-h-[200px] w-full flex-col items-center justify-center gap-2 text-muted-foreground">
          <ImagesIcon className="h-12 w-12 opacity-35" aria-hidden />
          <span className="text-sm">No preview</span>
        </div>
      )}

      <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-2 sm:left-4 sm:top-4">
        {year ? (
          <span
            className="rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur-md"
            style={workHeadingFont}
          >
            {year}
          </span>
        ) : null}
        {imgCount > 1 ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
            <ImagesIcon className="h-3 w-3" aria-hidden />
            {imgCount}
          </span>
        ) : null}
        {hasVideo ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 px-2.5 py-1 text-[11px] font-medium text-primary-foreground backdrop-blur-sm">
            <Video className="h-3 w-3" aria-hidden />
            Video
          </span>
        ) : null}
      </div>
    </div>
  );

  const body = (
    <div
      className={cn(
        "flex flex-1 flex-col justify-center",
        isFeature ? "p-6 sm:p-8 lg:p-10" : "p-5 sm:p-6",
      )}
    >
      <p
        className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary"
        style={workHeadingFont}
      >
        {item.clientName || "Client"}
      </p>
      <h2
        className={cn(
          "font-semibold tracking-tight text-foreground",
          isFeature ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl",
        )}
        style={workHeadingFont}
      >
        {item.title}
      </h2>
      <p
        className={cn(
          "mt-3 leading-relaxed text-muted-foreground",
          isFeature ? "line-clamp-4 text-base sm:line-clamp-5" : "line-clamp-3 text-sm sm:text-base",
        )}
      >
        {item.description || "—"}
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {hasCover ? (
          <button
            type="button"
            onClick={() => onOpenGallery(item)}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            Open gallery
          </button>
        ) : null}
        {item.url?.trim() ? (
          <a
            href={item.url.trim()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            Live project
          </a>
        ) : null}
        {hasVideo ? (
          <a
            href={(item.video ?? "").trim()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            <Play className="h-4 w-4 shrink-0" />
            Watch reel
          </a>
        ) : null}
      </div>
    </div>
  );

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: reduceMotion ? 0 : Math.min(index * 0.07, 0.35) }}
      className={cn(isFeature && "lg:col-span-2")}
    >
      <div
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-shadow duration-300 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5",
          isFeature && "md:flex-row md:items-stretch",
        )}
      >
        {isFeature ? (
          <>
            <div className="md:w-[min(52%,560px)] md:shrink-0">{media}</div>
            <div className="flex min-w-0 flex-1 flex-col border-t border-border/60 md:border-l md:border-t-0">
              {body}
            </div>
          </>
        ) : (
          <>
            {media}
            {body}
          </>
        )}
      </div>
    </motion.article>
  );
}

export const WorkProjectCard = memo(WorkProjectCardInner);
