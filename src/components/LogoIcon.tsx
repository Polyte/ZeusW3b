import { motion } from "motion/react";
import { useState } from "react";
import { LOGO_ANIMATIONS, ICON_SIZE_CONFIGS, LOGO_IMAGE_SRC } from "../constants/logoAnimations";

interface LogoIconProps {
  onClick?: () => void;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
}

export default function LogoIcon({ 
  onClick, 
  size = "md", 
  className = "",
  animated = true 
}: LogoIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  const logoSize = ICON_SIZE_CONFIGS[size];

  const MotionComponent = animated ? motion.div : 'div';

  const motionProps = animated ? {
    onHoverStart: () => setIsHovered(true),
    onHoverEnd: () => setIsHovered(false),
    whileHover: { scale: LOGO_ANIMATIONS.hover.scale },
    whileTap: { scale: 0.95 }
  } : {};

  const logoMotionProps = animated ? {
    animate: isHovered ? {
      rotate: [0, LOGO_ANIMATIONS.hover.rotate, -LOGO_ANIMATIONS.hover.rotate, 0],
      boxShadow: LOGO_ANIMATIONS.lightning.glow.boxShadow
    } : {
      boxShadow: "0 4px 20px rgba(139, 92, 246, 0.3)"
    },
    transition: { 
      duration: LOGO_ANIMATIONS.hover.duration, 
      ease: LOGO_ANIMATIONS.hover.ease 
    }
  } : {};

  const LogoWrapper = animated ? motion.div : 'div';

  return (
    <MotionComponent
      className={`relative cursor-pointer select-none ${className}`}
      onClick={onClick}
      {...motionProps}
    >
      <LogoWrapper
        className={`${logoSize} rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden`}
        {...logoMotionProps}
      >
        <img 
          src={LOGO_IMAGE_SRC} 
          alt="Zeus Labs Icon" 
          className="w-full h-full object-cover"
        />
      </LogoWrapper>
      
      {/* Lightning effect on hover */}
      {animated && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.8, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            filter: 'blur(4px)'
          }}
        />
      )}
    </MotionComponent>
  );
}