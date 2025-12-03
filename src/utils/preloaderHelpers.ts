// Simple preloader helper functions

// Font family constant for consistency
export const getPreloaderFontFamily = () => ({
  fontFamily: 'Josefin Sans, sans-serif'
});

// Simple progress calculation
export const calculateProgress = (current: number, increment: number = 15) => {
  return Math.min(current + Math.random() * increment, 100);
};

// Check if loading is complete
export const isLoadingComplete = (progress: number) => {
  return progress >= 100;
};