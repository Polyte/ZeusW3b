import { useState, useEffect } from 'react';
import { Command, Search, Home, Briefcase, Code, FileText, Mail, Calendar, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CommandAction {
  id: string;
  label: string;
  icon: any;
  action: () => void;
  shortcut?: string;
}

interface CommandPaletteProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onOpenBooking: () => void;
}

export default function CommandPalette({ onNavigate, onOpenSearch, onOpenBooking }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const commands: CommandAction[] = [
    {
      id: 'home',
      label: 'Go to Home',
      icon: Home,
      action: () => onNavigate('/'),
      shortcut: 'H'
    },
    {
      id: 'services',
      label: 'View Services',
      icon: Briefcase,
      action: () => onNavigate('/services'),
      shortcut: 'S'
    },
    {
      id: 'projects',
      label: 'View Projects',
      icon: Code,
      action: () => onNavigate('/projects'),
      shortcut: 'P'
    },
    {
      id: 'blog',
      label: 'View Blog',
      icon: FileText,
      action: () => onNavigate('/blog'),
      shortcut: 'B'
    },
    {
      id: 'contact',
      label: 'Contact Us',
      icon: Mail,
      action: () => onNavigate('/contact'),
      shortcut: 'C'
    },
    {
      id: 'search',
      label: 'Search...',
      icon: Search,
      action: () => {
        setIsOpen(false);
        onOpenSearch();
      },
      shortcut: '/'
    },
    {
      id: 'booking',
      label: 'Book Consultation',
      icon: Calendar,
      action: () => {
        setIsOpen(false);
        onOpenBooking();
      },
      shortcut: 'K'
    }
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      
      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const executeCommand = (action: () => void) => {
    action();
    setIsOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-32 left-1/2 -translate-x-1/2 w-full max-w-xl bg-background border border-border rounded-lg shadow-2xl overflow-hidden z-50"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none"
                autoFocus
              />
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-muted border border-border rounded text-xs">ESC</kbd>
              </div>
            </div>

            {/* Commands List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <p>No commands found</p>
                </div>
              ) : (
                <div className="p-2">
                  {filteredCommands.map((command) => {
                    const Icon = command.icon;
                    return (
                      <motion.button
                        key={command.id}
                        onClick={() => executeCommand(command.action)}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group"
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="group-hover:text-primary transition-colors">
                            {command.label}
                          </span>
                        </div>
                        {command.shortcut && (
                          <kbd className="px-2 py-1 bg-muted border border-border rounded text-xs">
                            {command.shortcut}
                          </kbd>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-border bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-background border border-border rounded">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-background border border-border rounded">↵</kbd>
                  Select
                </span>
              </div>
              <span className="flex items-center gap-1">
                <Command className="h-3 w-3" />
                <span>+</span>
                <kbd className="px-2 py-1 bg-background border border-border rounded">K</kbd>
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
