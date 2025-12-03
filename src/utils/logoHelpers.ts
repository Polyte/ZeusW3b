// Font family constant
export const LOGO_FONT_FAMILY = { fontFamily: 'Josefin Sans, sans-serif' };

// Simple animation helper
export const getSimpleHoverAnimation = (isHovered: boolean) => {
  return isHovered ? {
    scale: [1, 1.1, 1]
  } : {};
};