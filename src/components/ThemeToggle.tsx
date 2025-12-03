import { Sun, Moon, Monitor } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { initTheme, setTheme, getActiveTheme, type Theme } from '../utils/theme';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const currentTheme = initTheme();
    setThemeState(currentTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        const activeTheme = getActiveTheme('system');
        document.documentElement.classList.toggle('dark', activeTheme === 'dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setThemeState(newTheme);
    setIsOpen(false);
  };

  const activeTheme = getActiveTheme(theme);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className={`relative ${className}`}
        aria-label="Toggle theme"
      >
        <motion.div
          initial={false}
          animate={{ rotate: activeTheme === 'dark' ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTheme === 'dark' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </motion.div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-40 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50"
          >
            <button
              onClick={() => handleThemeChange('light')}
              className={`w-full px-4 py-2 flex items-center gap-2 hover:bg-muted transition-colors ${
                theme === 'light' ? 'bg-muted' : ''
              }`}
            >
              <Sun className="h-4 w-4" />
              <span>Light</span>
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className={`w-full px-4 py-2 flex items-center gap-2 hover:bg-muted transition-colors ${
                theme === 'dark' ? 'bg-muted' : ''
              }`}
            >
              <Moon className="h-4 w-4" />
              <span>Dark</span>
            </button>
            <button
              onClick={() => handleThemeChange('system')}
              className={`w-full px-4 py-2 flex items-center gap-2 hover:bg-muted transition-colors ${
                theme === 'system' ? 'bg-muted' : ''
              }`}
            >
              <Monitor className="h-4 w-4" />
              <span>System</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}