import { useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { STOCK_IMAGES } from "../constants/stockImages";

const HERO_VIDEO_SRC = "/we-got-you.mp4";

const HERO_PARALLAX = {
  mediaYMax: 240,
  contentYMax: 96,
  mediaScaleMax: 1.15,
} as const;

export default function HeroCarousel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const cutParallax = reduceMotion === true;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mediaY = useTransform(
    scrollYProgress,
    [0, 1],
    cutParallax ? [0, 0] : [0, HERO_PARALLAX.mediaYMax],
  );
  const mediaScale = useTransform(
    scrollYProgress,
    [0, 1],
    cutParallax ? [1, 1] : [1, HERO_PARALLAX.mediaScaleMax],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    cutParallax ? [0, 0] : [0, HERO_PARALLAX.contentYMax],
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.08]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {
      /* autoplay may require muted + playsInline (set below) */
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative h-svh min-h-svh w-full overflow-hidden supports-[height:100dvh]:h-[100dvh] supports-[height:100dvh]:min-h-[100dvh]"
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: mediaY, scale: mediaScale }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={STOCK_IMAGES.hero.code}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover scale-110"
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/75 via-slate-950/65 to-purple-950/75" />
        <div className="absolute inset-0 bg-black/25" />
      </motion.div>

      <motion.div
        className="relative z-10 flex h-full will-change-transform items-center pb-[max(1rem,env(safe-area-inset-bottom,0px))]"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.85)] drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] [text-shadow:0_0_1px_rgb(0_0_0/0.95),0_1px_3px_rgb(0_0_0/0.9),0_3px_14px_rgb(0_0_0/0.72),0_6px_28px_rgb(0_0_0/0.55),0_12px_48px_rgb(0_0_0/0.42),0_20px_64px_rgb(0_0_0/0.28)] md:text-5xl lg:text-6xl"
              style={{ fontFamily: "Josefin Sans, sans-serif" }}
            >
              Transform Your Digital Vision
            </motion.h1>

            <motion.p
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="mb-10 max-w-2xl text-xl font-light leading-relaxed text-white/90 [text-shadow:0_1px_2px_rgb(0_0_0/0.88),0_2px_8px_rgb(0_0_0/0.72),0_4px_24px_rgb(0_0_0/0.55),0_8px_40px_rgb(0_0_0/0.38)] md:text-2xl"
            >
              Custom software solutions built with modern technology—from web apps
              to enterprise systems—delivered with clarity and scale.
            </motion.p>

            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.4 }}
            >
              <Button
                size="lg"
                onClick={() => (window.location.hash = "contact")}
                className="h-14 min-w-[200px] bg-white text-base font-medium tracking-wide text-black shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/90 md:h-16 md:text-lg"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
