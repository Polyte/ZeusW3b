import Projects from "../Projects";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { Button } from "../ui/button";
import { ArrowRight, Star, Users, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useEffect, useState } from "react";

// Animated Counter Component
function AnimatedCounter({ from, to, duration = 2, delay = 0, suffix = "" }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => {
    if (suffix === "%") {
      // Handle decimal places for percentage values
      return (Math.round(latest * 10) / 10).toFixed(1) + suffix;
    }
    return Math.round(latest) + suffix;
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      const controls = animate(count, to, {
        duration,
        delay,
        ease: "easeOut"
      });
      setHasAnimated(true);
      return controls.stop;
    }
  }, [count, to, duration, delay, hasAnimated]);

  return <motion.span>{rounded}</motion.span>;
}

export default function ProjectsPage() {
  const projectStats = [
    {
      icon: <Star className="w-6 h-6" />,
      value: 100,
      suffix: "+",
      label: "Completed Projects",
      description: "Across Multiple Industries",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: 250,
      suffix: "+",
      label: "Happy Clients",
      description: "Worldwide Partners",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: 98.2,
      suffix: "%",
      label: "Business Growth",
      description: "Average Client Impact",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: <Award className="w-6 h-6" />,
      value: 5,
      suffix: "",
      label: "Nominated Awards",
      description: "Industry Recognition",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    }
  ];

  const industries = [
    {
      name: "FinTech",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop",
      description: "Revolutionary financial technology solutions",
      color: "bg-blue-500"
    },
    {
      name: "Healthcare",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
      description: "Digital health and medical platforms",
      color: "bg-green-500"
    },
    {
      name: "E-commerce",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      description: "Next-generation shopping experiences",
      color: "bg-purple-500"
    },
    {
      name: "Education",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      description: "EdTech and learning management systems",
      color: "bg-orange-500"
    },
    {
      name: "Gaming",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      description: "Immersive gaming and entertainment",
      color: "bg-red-500"
    },
    {
      name: "Enterprise",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      description: "Large-scale business solutions",
      color: "bg-indigo-500"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 
                className="text-5xl md:text-7xl lg:text-8xl mb-8 text-foreground font-bold tracking-tight leading-none"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                Our Projects
              </h1>
              <p 
                className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed font-light"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                With over 100 successful projects delivered to 250+ clients worldwide, we've achieved 
                an average business growth of 98.2% and earned 5 industry award nominations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => window.location.hash = 'contact'}
                  size="lg" 
                  className="btn-gradient-green hover:scale-105 transition-all duration-300 h-14 px-8 text-lg font-medium tracking-wide"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  className="btn-purple hover:scale-105 transition-all duration-300 h-14 px-8 text-lg font-medium tracking-wide"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  Download Portfolio
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                  alt="ZeusLabs Project Showcase"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Stats Section */}
      <section className="py-20 relative bg-[rgba(20,164,177,1)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {projectStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300"
              >
                <div className={`${stat.color} mb-3 flex justify-center p-3 bg-white/20 rounded-xl w-fit mx-auto backdrop-blur-sm`}>
                  {stat.icon}
                </div>
                <motion.div 
                  className="text-3xl lg:text-4xl font-bold text-white mb-2"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                >
                  <AnimatedCounter 
                    from={0} 
                    to={stat.value} 
                    duration={2.5}
                    delay={index * 0.2 + 0.5}
                    suffix={stat.suffix}
                  />
                </motion.div>
                <div 
                  className="text-sm font-semibold text-white mb-1"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {stat.label}
                </div>
                <div 
                  className="text-xs text-white/80"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-background to-accent/5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-5xl md:text-7xl mb-8 text-foreground font-bold tracking-tight"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Industries We Serve
            </h2>
            <p 
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              From startups to enterprise, we've delivered 100+ solutions across diverse industries 
              to 250+ clients worldwide with award-nominated excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500 overflow-hidden group cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={industry.image}
                      alt={industry.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className={`absolute top-4 left-4 ${industry.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      {industry.name}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 
                      className="text-xl font-semibold text-foreground mb-2"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {industry.name}
                    </h3>
                    <p 
                      className="text-muted-foreground font-light"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {industry.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Projects Section */}
      <Projects />

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-5xl md:text-7xl mb-8 text-foreground font-bold tracking-tight"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Let's Build Together
            </h2>
            <p 
              className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed font-light"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Join our 250+ satisfied clients and experience the 98.2% average growth impact. 
              Ready to see your project in our next showcase? Let's discuss your vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                onClick={() => window.location.hash = 'contact'}
                size="lg" 
                className="btn-gradient-orange hover:scale-105 transition-all duration-300 h-16 px-12 text-lg font-medium tracking-wide"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                onClick={() => window.location.hash = 'services'}
                size="lg" 
                className="btn-teal hover:scale-105 transition-all duration-300 h-16 px-12 text-lg font-medium tracking-wide"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                View Our Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}