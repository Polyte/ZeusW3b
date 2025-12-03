import { motion } from "motion/react";
import { generateSpeedLines } from "../../utils/logoHelpers";

interface SpeedLinesProps {
  isVisible: boolean;
  className?: string;
}

export default function SpeedLines({ isVisible, className = "" }: SpeedLinesProps) {
  const speedLines = generateSpeedLines(isVisible);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {speedLines.map(({ key, className: lineClassName, style, animate, transition }) => (
        <motion.div
          key={key}
          className={lineClassName}
          style={style}
          animate={animate}
          transition={transition}
        />
      ))}
    </div>
  );
}