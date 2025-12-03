// Zeus Logo Animation Constants
export const LOGO_ANIMATIONS = {
  hover: {
    scale: 1.1,
    rotate: 2,
    duration: 0.6,
    ease: "easeInOut"
  },
  text: {
    scale: 1.02,
    duration: 0.3,
    ease: "easeInOut"
  },
  lightning: {
    glow: {
      boxShadow: [
        "0 4px 20px rgba(139, 92, 246, 0.3)",
        "0 8px 30px rgba(59, 130, 246, 0.4)",
        "0 4px 20px rgba(139, 92, 246, 0.3)"
      ],
      duration: 0.8,
      ease: "easeInOut"
    },
    pulse: {
      scale: [1, 1.05, 1],
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  entrance: {
    scale: 0,
    rotate: -180,
    duration: 0.8,
    ease: "easeOut"
  }
} as const;

export const SIZE_CONFIGS = {
  sm: {
    logo: "w-8 h-8",
    text: "text-sm",
    subtext: "text-xs"
  },
  md: {
    logo: "w-10 h-10",
    text: "text-lg",
    subtext: "text-xs"
  },
  lg: {
    logo: "w-16 h-16",
    text: "text-2xl",
    subtext: "text-sm"
  }
} as const;

export const ICON_SIZE_CONFIGS = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12"
} as const;

// Font family constant
export const LOGO_FONT_FAMILY = { fontFamily: 'Josefin Sans, sans-serif' };