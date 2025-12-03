import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Code, Globe, Shield, Gamepad2, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function ServicesSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Software Development",
      description: "Custom solutions with modern technologies for scalable applications.",
      features: ["Full-Stack Development", "API Integration", "Cloud Architecture"],
      color: "from-blue-500/20 to-blue-600/10",
      iconColor: "text-blue-500",
      borderColor: "border-blue-500/20",
      buttonColor: "btn-gradient-blue",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Development",
      description: "Beautiful, responsive websites that convert and engage users.",
      features: ["React & Next.js", "E-commerce", "PWA Development"],
      color: "from-green-500/20 to-green-600/10",
      iconColor: "text-green-500",
      borderColor: "border-green-500/20",
      buttonColor: "btn-gradient-green",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your digital assets.",
      features: ["Security Audits", "Penetration Testing", "Compliance"],
      color: "from-red-500/20 to-red-600/10",
      iconColor: "text-red-500",
      borderColor: "border-red-500/20",
      buttonColor: "btn-red",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop"
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Game Development",
      description: "Immersive gaming experiences across multiple platforms.",
      features: ["Unity & Unreal", "Mobile Games", "VR/AR Development"],
      color: "from-purple-500/20 to-purple-600/10",
      iconColor: "text-purple-500",
      borderColor: "border-purple-500/20",
      buttonColor: "btn-gradient-purple",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Calculate visible slides for desktop view
  const getVisibleServices = () => {
    const visibleCount = 2; // Show 2 services at a time on desktop
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentSlide + i) % services.length;
      result.push({ ...services[index], slideIndex: index });
    }
    return result;
  };

  return (
    <div className="relative">
      {/* Desktop View - 2 cards at a time */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 gap-6">
          <AnimatePresence mode="wait">
            {getVisibleServices().map((service, index) => (
              <motion.div
                key={`${service.slideIndex}-${currentSlide}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <motion.div whileHover={{ y: -5 }}>
                  <Card className={`group h-full border-2 ${service.borderColor} hover:border-opacity-50 hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    {/* Service Image */}
                    <motion.div
                      className="relative h-40 overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ImageWithFallback
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <motion.div
                        className={`absolute top-3 left-3 ${service.iconColor} p-2 bg-white/90 backdrop-blur-sm rounded-xl border border-white/20`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        {service.icon}
                      </motion.div>
                    </motion.div>

                    <CardHeader className="relative z-10 pb-3">
                      <CardTitle 
                        className="text-xl mb-2 text-foreground group-hover:text-foreground transition-colors font-semibold tracking-tight"
                        style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                      >
                        {service.title}
                      </CardTitle>
                      <CardDescription 
                        className="text-sm text-muted-foreground leading-relaxed font-light"
                        style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                      >
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="relative z-10 pt-0">
                      <div className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-center text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                          >
                            <div className={`w-1.5 h-1.5 ${service.iconColor.replace('text-', 'bg-')} rounded-full mr-3 flex-shrink-0`}></div>
                            <span 
                              className="text-muted-foreground font-light"
                              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                            >
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                      
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          onClick={() => window.location.hash = 'services'}
                          className={`w-full ${service.buttonColor} transition-all duration-300 font-medium tracking-wide text-sm py-2`}
                          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                        >
                          <span className="mr-2">Learn More</span>
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile View - 1 card at a time */}
      <div className="md:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="group"
          >
            <motion.div whileHover={{ y: -5 }}>
              <Card className={`group h-full border-2 ${services[currentSlide].borderColor} hover:border-opacity-50 hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${services[currentSlide].color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Service Image */}
                <motion.div
                  className="relative h-48 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImageWithFallback
                    src={services[currentSlide].image}
                    alt={services[currentSlide].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <motion.div
                    className={`absolute top-4 left-4 ${services[currentSlide].iconColor} p-3 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {services[currentSlide].icon}
                  </motion.div>
                </motion.div>

                <CardHeader className="relative z-10 pb-4">
                  <CardTitle 
                    className="text-2xl mb-3 text-foreground group-hover:text-foreground transition-colors font-semibold tracking-tight"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    {services[currentSlide].title}
                  </CardTitle>
                  <CardDescription 
                    className="text-base text-muted-foreground leading-relaxed font-light"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    {services[currentSlide].description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <div className="space-y-3 mb-8">
                    {services[currentSlide].features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                      >
                        <div className={`w-2 h-2 ${services[currentSlide].iconColor.replace('text-', 'bg-')} rounded-full mr-3 flex-shrink-0`}></div>
                        <span 
                          className="text-muted-foreground font-light"
                          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                        >
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      onClick={() => window.location.hash = 'services'}
                      className={`w-full ${services[currentSlide].buttonColor} transition-all duration-300 font-medium tracking-wide`}
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      <span className="mr-2">Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-between items-center mt-6">
        <motion.button
          onClick={prevSlide}
          className="flex items-center justify-center w-12 h-12 bg-white dark:bg-card border-2 border-border rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </motion.button>

        {/* Dots Indicator */}
        <div className="flex space-x-2">
          {services.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-primary' 
                  : 'bg-border hover:bg-primary/50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>

        <motion.button
          onClick={nextSlide}
          className="flex items-center justify-center w-12 h-12 bg-white dark:bg-card border-2 border-border rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </motion.button>
      </div>

      {/* View All Services Button */}
      <motion.div 
        className="text-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            onClick={() => window.location.hash = 'services'}
            size="lg" 
            className="btn-gradient-purple transition-all duration-300 h-14 px-12 text-lg font-medium tracking-wide"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            View All Services
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}