import { motion } from "motion/react";
import { useState } from "react";
import { LOGO_ANIMATIONS, SIZE_CONFIGS, LOGO_FONT_FAMILY, LOGO_IMAGE_SRC } from "../constants/logoAnimations";

interface AnimatedLogoProps {
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  showText?: boolean;
}

export default function AnimatedLogo({ 
  onClick, 
  size = "md", 
  className = "",
  showText = true 
}: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  const config = SIZE_CONFIGS[size];

  return (
    <motion.div
      className={`flex items-center gap-3 cursor-pointer select-none ${className}`}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Zeus Logo Image */}
      <motion.div
        className="relative"
        animate={isHovered ? { 
          scale: [1, LOGO_ANIMATIONS.hover.scale, 1],
          rotate: [0, LOGO_ANIMATIONS.hover.rotate, 0]
        } : {}}
        transition={{ 
          duration: LOGO_ANIMATIONS.hover.duration, 
          ease: LOGO_ANIMATIONS.hover.ease 
        }}
      >
        <motion.div
          className={`${config.logo} rounded-full overflow-hidden`}
          animate={isHovered ? {
            boxShadow: LOGO_ANIMATIONS.lightning.glow.boxShadow
          } : {
            boxShadow: "0 4px 20px rgba(139, 92, 246, 0.3)"
          }}
          transition={{ 
            duration: LOGO_ANIMATIONS.lightning.glow.duration, 
            ease: LOGO_ANIMATIONS.lightning.glow.ease 
          }}
        >
          <img 
            src={LOGO_IMAGE_SRC} 
            alt="Zeus Labs Logo" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Subtle glow effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>

      {/* Text Content */}
      {showText && (
        <motion.div
          className="flex flex-col"
          animate={isHovered ? { x: [0, 2, 0] } : {}}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Main Logo Text */}
          <motion.span
            className={`${config.text} font-bold uppercase text-foreground tracking-wide leading-tight`}
            style={LOGO_FONT_FAMILY}
            animate={isHovered ? { 
              color: ["var(--foreground)", "var(--blue-600)", "var(--foreground)"]
            } : {}}
            transition={{ duration: 0.5 }}
          >
            ZEUSLABS
          </motion.span>

          {/* Subtitle - only show on medium and large sizes */}
          {size !== "sm" && (
            <motion.div
              className={`${config.subtext} text-muted-foreground font-light tracking-wider leading-none`}
              style={LOGO_FONT_FAMILY}
              animate={isHovered ? { 
                opacity: [0.6, 1, 0.6],
                color: ["var(--muted-foreground)", "var(--purple-500)", "var(--muted-foreground)"]
              } : {}}
              transition={{ duration: 0.7 }}
            >
              Innovation & Technology
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}