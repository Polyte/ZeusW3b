import { useState, useEffect, useMemo } from 'react';
import { Search, X, FileText, Briefcase, Code, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { blogPosts } from '../constants/blogData';
import { projects } from '../constants/projectsData';

interface SearchResult {
  id: string;
  type: 'service' | 'project' | 'blog';
  title: string;
  description: string;
  url: string;
  tags?: string[];
}

const services = [
  {
    id: 'web-dev',
    type: 'service' as const,
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies',
    url: '/services/web-development',
    tags: ['React', 'Next.js', 'Tailwind', 'TypeScript']
  },
  {
    id: 'software-dev',
    type: 'service' as const,
    title: 'Software Development',
    description: 'Enterprise software solutions and custom applications',
    url: '/services/software-development',
    tags: ['Full Stack', 'API', 'Database', 'Cloud']
  },
  {
    id: 'cybersecurity',
    type: 'service' as const,
    title: 'Cybersecurity',
    description: 'Security audits, penetration testing, and security consulting',
    url: '/services/cybersecurity',
    tags: ['Security', 'Testing', 'Compliance', 'Protection']
  },
  {
    id: 'game-dev',
    type: 'service' as const,
    title: 'Game Development',
    description: 'Game design and development for multiple platforms',
    url: '/services/game-development',
    tags: ['Unity', '3D', 'Mobile', 'Desktop']
  }
];

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdvancedSearch({ isOpen, onClose }: AdvancedSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'service' | 'project' | 'blog'>('all');
  
  const allResults: SearchResult[] = useMemo(() => {
    return [
      ...services,
      ...projects.map(p => ({
        id: p.id,
        type: 'project' as const,
        title: p.title,
        description: p.description,
        url: `/projects/${p.id}`,
        tags: p.tags
      })),
      ...blogPosts.map(b => ({
        id: b.id,
        type: 'blog' as const,
        title: b.title,
        description: b.excerpt,
        url: `/blog/${b.id}`,
        tags: b.tags
      }))
    ];
  }, []);

  const filteredResults = useMemo(() => {
    let results = allResults;

    // Filter by type
    if (selectedFilter !== 'all') {
      results = results.filter(r => r.type === selectedFilter);
    }

    // Filter by search query
    if (query.trim()) {
      const searchLower = query.toLowerCase();
      results = results.filter(r => 
        r.title.toLowerCase().includes(searchLower) ||
        r.description.toLowerCase().includes(searchLower) ||
        r.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    return results;
  }, [query, selectedFilter, allResults]);

  const handleResultClick = (url: string) => {
    window.location.href = url;
    onClose();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'service':
        return <Briefcase className="h-4 w-4" />;
      case 'project':
        return <Code className="h-4 w-4" />;
      case 'blog':
        return <FileText className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-background border border-border rounded-lg shadow-2xl z-50 max-h-[80vh] flex flex-col"
          >
            {/* Search Input */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search services, projects, blog posts..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 pr-10"
                  autoFocus
                />
                <button
                  onClick={onClose}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Filters */}
              <div className="flex gap-2 mt-3">
                <Button
                  variant={selectedFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={selectedFilter === 'service' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('service')}
                >
                  <Briefcase className="h-4 w-4 mr-1" />
                  Services
                </Button>
                <Button
                  variant={selectedFilter === 'project' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('project')}
                >
                  <Code className="h-4 w-4 mr-1" />
                  Projects
                </Button>
                <Button
                  variant={selectedFilter === 'blog' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter('blog')}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Blog
                </Button>
              </div>
            </div>

            {/* Results */}
            <div className="overflow-y-auto flex-1 p-4">
              {filteredResults.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No results found</p>
                  {query && <p className="text-sm mt-1">Try adjusting your search query</p>}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredResults.map((result) => (
                    <motion.button
                      key={result.id}
                      onClick={() => handleResultClick(result.url)}
                      className="w-full text-left p-4 rounded-lg border border-border hover:border-primary hover:bg-muted/50 transition-all group"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-muted-foreground group-hover:text-primary transition-colors">
                          {getIcon(result.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium group-hover:text-primary transition-colors">
                              {result.title}
                            </h3>
                            <Badge variant="outline" className="capitalize">
                              {result.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {result.description}
                          </p>
                          {result.tags && result.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {result.tags.slice(0, 4).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-border bg-muted/30">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{filteredResults.length} results</span>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-background border border-border rounded">ESC</kbd>
                  <span>to close</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
