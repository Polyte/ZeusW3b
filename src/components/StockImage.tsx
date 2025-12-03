import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Skeleton } from "./ui/skeleton";
import { motion } from "motion/react";

interface StockImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
  showSkeleton?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  priority?: boolean;
}

export default function StockImage({
  src,
  alt,
  width,
  height,
  className = "",
  fallbackSrc,
  showSkeleton = true,
  objectFit = "cover",
  priority = false
}: StockImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Generate a placeholder color based on the alt text
  const getPlaceholderColor = (text: string) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 85%)`;
  };

  const containerStyle = {
    width: width ? `${width}px` : "100%",
    height: height ? `${height}px` : "100%",
    position: "relative" as const
  };

  return (
    <div style={containerStyle} className={`overflow-hidden ${className}`}>
      {/* Loading Skeleton */}
      {isLoading && showSkeleton && (
        <Skeleton 
          className="absolute inset-0 w-full h-full"
          style={{ backgroundColor: getPlaceholderColor(alt) }}
        />
      )}

      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full"
      >
        <ImageWithFallback
          src={src}
          alt={alt}
          className={`w-full h-full transition-all duration-300 ${
            objectFit === "cover" ? "object-cover" :
            objectFit === "contain" ? "object-contain" :
            objectFit === "fill" ? "object-fill" :
            objectFit === "none" ? "object-none" :
            "object-scale-down"
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          style={{
            width: "100%",
            height: "100%"
          }}
        />
      </motion.div>

      {/* Error Fallback */}
      {hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-muted"
          style={{ backgroundColor: getPlaceholderColor(alt) }}
        >
          <div className="text-center p-4">
            <div className="w-12 h-12 mx-auto mb-2 bg-muted rounded-lg flex items-center justify-center">
              <svg 
                className="w-6 h-6 text-muted-foreground" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              {alt}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Preset component variants for common use cases
export const HeroImage = (props: Omit<StockImageProps, 'objectFit' | 'priority'>) => (
  <StockImage {...props} objectFit="cover" priority />
);

export const CardImage = (props: Omit<StockImageProps, 'objectFit'>) => (
  <StockImage {...props} objectFit="cover" />
);

export const ProfileImage = (props: Omit<StockImageProps, 'objectFit'>) => (
  <StockImage {...props} objectFit="cover" />
);

export const BannerImage = (props: Omit<StockImageProps, 'objectFit' | 'priority'>) => (
  <StockImage {...props} objectFit="cover" priority />
);