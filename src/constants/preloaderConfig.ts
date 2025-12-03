// Simple Preloader Configuration Constants
export const PRELOADER_CONFIG = {
  progressUpdateInterval: 150,
  completionDelay: 500
} as const;

export const PRELOADER_ANIMATIONS = {
  container: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 }
  },
  logo: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" }
  },
  text: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.3, duration: 0.5 }
  },
  progress: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { delay: 0.6, duration: 0.4 }
  }
} as const;

// Font family constant for consistency
export const PRELOADER_FONT_FAMILY = { fontFamily: 'Josefin Sans, sans-serif' };