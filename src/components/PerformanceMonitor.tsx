import { useState, useEffect } from 'react';
import { Activity, Zap, Clock, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  loadTime: number;
  pageViews: number;
}

export default function PerformanceMonitor() {
  const [isOpen, setIsOpen] = useState(false);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    loadTime: 0,
    pageViews: 0
  });

  useEffect(() => {
    // Get initial page load time
    if (performance.timing) {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      setMetrics(prev => ({ ...prev, loadTime }));
    }

    // Track page views
    const views = parseInt(sessionStorage.getItem('pageViews') || '0') + 1;
    sessionStorage.setItem('pageViews', views.toString());
    setMetrics(prev => ({ ...prev, pageViews: views }));

    // FPS Counter
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 60;

    const countFrames = () => {
      frameCount++;
      const currentTime = performance.now();
      if (currentTime >= lastTime + 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setMetrics(prev => ({ ...prev, fps }));
        frameCount = 0;
        lastTime = currentTime;
      }
      requestAnimationFrame(countFrames);
    };
    requestAnimationFrame(countFrames);

    // Memory Usage (if available)
    const updateMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usedMB = memory.usedJSHeapSize / 1048576;
        setMetrics(prev => ({ ...prev, memoryUsage: Math.round(usedMB) }));
      }
    };

    const memoryInterval = setInterval(updateMemory, 2000);
    updateMemory();

    return () => clearInterval(memoryInterval);
  }, []);

  const getPerformanceStatus = (fps: number) => {
    if (fps >= 55) return { label: 'Excellent', color: 'text-green-500' };
    if (fps >= 40) return { label: 'Good', color: 'text-yellow-500' };
    return { label: 'Poor', color: 'text-red-500' };
  };

  const status = getPerformanceStatus(metrics.fps);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Performance Monitor"
      >
        <Activity className="h-5 w-5" />
      </motion.button>

      {/* Monitor Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-40 right-6 w-80 z-40"
          >
            <Card className="p-4 shadow-xl border-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Performance
                </h3>
                <Badge variant={metrics.fps >= 55 ? 'default' : 'destructive'}>
                  {status.label}
                </Badge>
              </div>

              <div className="space-y-3">
                {/* FPS */}
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">FPS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.span
                      key={metrics.fps}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className={`font-bold ${status.color}`}
                    >
                      {metrics.fps}
                    </motion.span>
                    <span className="text-xs text-muted-foreground">fps</span>
                  </div>
                </div>

                {/* Memory Usage */}
                {metrics.memoryUsage > 0 && (
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Memory</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{metrics.memoryUsage}</span>
                      <span className="text-xs text-muted-foreground">MB</span>
                    </div>
                  </div>
                )}

                {/* Load Time */}
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Load Time</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">
                      {(metrics.loadTime / 1000).toFixed(2)}
                    </span>
                    <span className="text-xs text-muted-foreground">s</span>
                  </div>
                </div>

                {/* Page Views */}
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Page Views</span>
                  </div>
                  <span className="font-bold">{metrics.pageViews}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  Session performance metrics
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
