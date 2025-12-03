import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { ArrowRight, Code, Globe, Shield, Gamepad2, Play, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { HeroImage } from "./StockImage";
import { STOCK_IMAGES } from "../constants/stockImages";

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Transform Your Digital Vision",
      subtitle: "Software Development Excellence",
      description: "Custom software solutions built with cutting-edge technologies. From web applications to enterprise systems, we bring your ideas to life with scalable, maintainable code.",
      cta: "Start Your Project",
      secondaryCta: "View Portfolio",
      icon: Code,
      type: "youtube",
      media: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1",
      fallbackImage: STOCK_IMAGES.hero.code,
      gradient: "from-blue-600/70 via-blue-700/60 to-purple-800/70",
      iconColor: "text-blue-400",
      stats: { value: "50+", label: "Projects Delivered" }
    },
    {
      id: 2,
      title: "Beautiful Web Experiences",
      subtitle: "Modern Web Development",
      description: "Responsive, fast, and engaging websites that convert visitors into customers. Built with React, Next.js, and modern frameworks for optimal performance.",
      cta: "Get Started",
      secondaryCta: "See Examples",
      icon: Globe,
      type: "image",
      media: STOCK_IMAGES.hero.technology,
      gradient: "from-green-600/90 via-teal-700/80 to-blue-800/90",
      iconColor: "text-green-400",
      stats: { value: "100%", label: "Mobile Optimized" }
    },
    {
      id: 3,
      title: "Secure Your Digital Assets",
      subtitle: "Advanced Cybersecurity",
      description: "Comprehensive security solutions to protect your business. From penetration testing to compliance audits, we ensure your digital infrastructure is bulletproof.",
      cta: "Security Audit",
      secondaryCta: "Learn More",
      icon: Shield,
      type: "youtube",
      media: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&mute=1&loop=1&playlist=ScMzIvxBSi4&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1",
      fallbackImage: STOCK_IMAGES.services.cybersecurity.main,
      gradient: "from-red-600/70 via-orange-700/60 to-pink-800/70",
      iconColor: "text-red-400",
      stats: { value: "24/7", label: "Security Monitoring" }
    },
    {
      id: 4,
      title: "Immersive Gaming Worlds",
      subtitle: "Next-Gen Game Development",
      description: "Create engaging gaming experiences across multiple platforms. From mobile games to VR experiences, we craft interactive entertainment that captivates audiences.",
      cta: "Build Your Game",
      secondaryCta: "Play Demo",
      icon: Gamepad2,
      type: "image",
      media: STOCK_IMAGES.services.gameDevelopment.main,
      gradient: "from-purple-600/90 via-pink-700/80 to-indigo-800/90",
      iconColor: "text-purple-400",
      stats: { value: "5M+", label: "Players Reached" }
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000); // 8 seconds for each slide

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Media */}
          <div className="absolute inset-0">
            {currentSlideData.type === 'youtube' ? (
              <div className="relative w-full h-full">
                <iframe
                  src={currentSlideData.media}
                  className="absolute inset-0 w-full h-full object-cover scale-150"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ pointerEvents: 'none' }}
                />
                {/* Fallback image in case YouTube doesn't load */}
                <HeroImage
                  src={currentSlideData.fallbackImage}
                  alt={currentSlideData.title}
                  className="absolute inset-0 w-full h-full -z-10"
                  width={1920}
                  height={1080}
                />
              </div>
            ) : (
              <HeroImage
                src={currentSlideData.media}
                alt={currentSlideData.title}
                className="w-full h-full"
                width={1920}
                height={1080}
              />
            )}
            <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.gradient}`}></div>
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 0.1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm"
            ></motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 0.1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute bottom-32 right-16 w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm"
            ></motion.div>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 0.05 }}
              transition={{ duration: 1.5, delay: 0.7 }}
              className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-white/10 backdrop-blur-sm"
            ></motion.div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="flex items-center mb-6"
                >
                  <div className={`${currentSlideData.iconColor} mr-4 p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20`}>
                    <currentSlideData.icon className="w-8 h-8" />
                  </div>
                  <span className="text-white/90 text-lg font-light tracking-wide">
                    {currentSlideData.subtitle}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {currentSlideData.title}
                </motion.h1>

                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl leading-relaxed font-light"
                >
                  {currentSlideData.description}
                </motion.p>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-6 mb-16"
                >
                  <Button 
                    size="lg" 
                    onClick={() => window.location.hash = 'contact'}
                    className="min-w-[200px] h-16 text-lg bg-white text-black hover:bg-white/90 shadow-2xl font-medium tracking-wide transition-all duration-300 hover:scale-105"
                  >
                    {currentSlideData.cta}
                    <ArrowRight className="w-6 h-6 ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => window.location.hash = 'projects'}
                    className="min-w-[200px] h-16 text-lg border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-medium tracking-wide transition-all duration-300 hover:scale-105"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    {currentSlideData.secondaryCta}
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl"
                >
                  <div className="text-3xl font-bold text-white mr-3">
                    {currentSlideData.stats.value}
                  </div>
                  <div className="text-white/80 text-sm font-light">
                    {currentSlideData.stats.label}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <div className="flex space-x-2">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white w-8' 
                    : 'bg-white/40 hover:bg-white/60 w-3'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {slide.type === 'youtube' && (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-10">
        {isAutoPlaying && (
          <motion.div
            key={currentSlide}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 8, ease: "linear" }}
            className="h-full bg-white"
          />
        )}
      </div>

      {/* Side Navigation Hints */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
        <div className="space-y-4">
          {slides.map((slide, index) => {
            const IconComponent = slide.icon;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`block w-16 h-16 rounded-2xl border transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white/20 border-white/40 scale-110'
                    : 'bg-white/5 border-white/20 hover:bg-white/10'
                } backdrop-blur-sm relative`}
                aria-label={`Go to ${slide.subtitle}`}
              >
                <IconComponent className={`w-6 h-6 mx-auto ${slide.iconColor}`} />
                {slide.type === 'youtube' && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Video Type Indicator */}
      {currentSlideData.type === 'youtube' && (
        <div className="absolute top-8 right-8 z-20">
          <div className="flex items-center px-4 py-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-white text-sm font-light">Live Video</span>
          </div>
        </div>
      )}
    </div>
  );
}