import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import zeusLogo from "figma:asset/dcf68d79f4c8a130a95c8ce6f948273175eadda7.png";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Loading progress simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => {
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      >
        {/* Main Content */}
        <div className="text-center">
          {/* Zeus Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 relative"
          >
            <motion.div
              className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full shadow-2xl overflow-hidden"
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 10px 30px rgba(139, 92, 246, 0.3)",
                  "0 15px 40px rgba(59, 130, 246, 0.4)",
                  "0 10px 30px rgba(139, 92, 246, 0.3)"
                ]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <img 
                src={zeusLogo} 
                alt="Zeus Labs" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Lightning effect around logo */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ 
                opacity: [0, 0.8, 0],
                scale: [0.8, 1.3, 0.8]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.5
              }}
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
                filter: 'blur(8px)'
              }}
            />
          </motion.div>

          {/* Company Name */}
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-foreground mb-2"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            ZeusLabs
          </motion.h1>

          <motion.p
            className="text-muted-foreground mb-8"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Innovation & Technology
          </motion.p>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="w-64 mx-auto"
          >
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-foreground rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            
            <motion.div
              className="mt-2 text-center"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="text-muted-foreground text-sm">
                {Math.round(progress)}%
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}