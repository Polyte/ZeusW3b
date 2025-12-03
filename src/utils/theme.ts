export type Theme = 'light' | 'dark' | 'system';

export const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const getActiveTheme = (theme: Theme): 'light' | 'dark' => {
  if (theme === 'system') {
    return getSystemTheme();
  }
  return theme;
};

export const applyTheme = (theme: 'light' | 'dark') => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

export const initTheme = () => {
  const stored = localStorage.getItem('theme') as Theme | null;
  const theme = stored || 'system';
  const activeTheme = getActiveTheme(theme);
  applyTheme(activeTheme);
  return theme;
};

export const setTheme = (theme: Theme) => {
  localStorage.setItem('theme', theme);
  const activeTheme = getActiveTheme(theme);
  applyTheme(activeTheme);
};
