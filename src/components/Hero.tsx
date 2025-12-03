import HeroCarousel from "./HeroCarousel";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative">
      {/* Hero Carousel */}
      <HeroCarousel />
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-8 z-20 hidden md:flex flex-col items-center cursor-pointer group"
        onClick={scrollToServices}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="text-white/80 text-sm font-light mb-2 tracking-wide group-hover:text-white transition-colors">
          Scroll to explore
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center"
        >
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"></div>
          <ArrowDown className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
        </motion.div>
      </motion.div>

      {/* Floating Stats */}
      <motion.div 
        className="absolute top-1/2 left-8 z-20 hidden xl:block"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <div className="space-y-8">
          {[
            { number: "5+", label: "Years", sublabel: "Experience" },
            { number: "50+", label: "Projects", sublabel: "Completed" },
            { number: "100%", label: "Client", sublabel: "Satisfaction" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
            >
              <div className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                {stat.number}
              </div>
              <div className="text-xs text-white/80 font-light leading-none">
                {stat.label}
                <br />
                {stat.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Brand Recognition */}
      <motion.div 
        className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
          <span className="text-white/90 text-sm font-light tracking-wide" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
            Trusted by 50+ Companies Worldwide
          </span>
        </div>
      </motion.div>
    </section>
  );
}