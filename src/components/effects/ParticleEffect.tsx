import { motion } from "motion/react";

interface ParticleEffectProps {
  isVisible: boolean;
  className?: string;
}

export default function ParticleEffect({ isVisible, className = "" }: ParticleEffectProps) {
  const particles = Array.from({ length: 6 }, (_, i) => ({
    key: i,
    className: `absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full`,
    style: {
      left: `${20 + i * 15}%`,
      top: `${30 + i * 10}%`
    },
    animate: isVisible ? {
      y: [-20, -40, -20],
      x: [0, Math.sin(i) * 10, 0],
      opacity: [0, 1, 0],
      scale: [0, 1, 0]
    } : { opacity: 0 },
    transition: {
      duration: 2 + i * 0.2,
      repeat: isVisible ? Infinity : 0,
      ease: "easeInOut",
      delay: i * 0.1
    }
  }));

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map(({ key, className: particleClassName, style, animate, transition }) => (
        <motion.div
          key={key}
          className={particleClassName}
          style={style}
          animate={animate}
          transition={transition}
        />
      ))}
    </div>
  );
}