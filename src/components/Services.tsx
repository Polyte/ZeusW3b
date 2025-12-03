import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Code, Globe, Shield, Gamepad2, ArrowRight, Star, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "motion/react";

export default function Services() {
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Software Development",
      description: "Custom software solutions built with modern technologies and best practices for scalable, maintainable applications that grow with your business.",
      features: ["Full-Stack Development", "API Integration", "Database Design", "Cloud Architecture"],
      color: "from-blue-500/20 to-blue-600/10",
      iconColor: "text-blue-500",
      borderColor: "border-blue-500/20",
      hoverColor: "hover:border-blue-500/40"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Development",
      description: "Responsive, fast, and user-friendly websites that drive business growth and engage your audience with exceptional user experiences.",
      features: ["React & Next.js", "E-commerce Solutions", "Progressive Web Apps", "SEO Optimization"],
      color: "from-green-500/20 to-green-600/10",
      iconColor: "text-green-500",
      borderColor: "border-green-500/20",
      hoverColor: "hover:border-green-500/40"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your digital assets and ensure compliance with industry standards and regulations.",
      features: ["Security Audits", "Penetration Testing", "Compliance Solutions", "Incident Response"],
      color: "from-red-500/20 to-red-600/10",
      iconColor: "text-red-500",
      borderColor: "border-red-500/20",
      hoverColor: "hover:border-red-500/40"
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Game Development",
      description: "Immersive gaming experiences across multiple platforms with cutting-edge graphics and engaging gameplay mechanics.",
      features: ["Unity & Unreal Engine", "Mobile Games", "VR/AR Development", "Game Analytics"],
      color: "from-purple-500/20 to-purple-600/10",
      iconColor: "text-purple-500",
      borderColor: "border-purple-500/20",
      hoverColor: "hover:border-purple-500/40"
    }
  ];

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,theme(colors.primary/3),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,theme(colors.accent/8),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-primary mr-2" />
            <span 
              className="text-sm font-medium text-primary tracking-wider" 
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Our Expertise
            </span>
          </div>
          <h2 
            className="text-5xl md:text-7xl lg:text-8xl mb-8 text-foreground font-bold tracking-tight leading-none"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            Core Services
          </h2>
          <p 
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            We specialize in four key areas of technology, delivering excellence 
            and innovation in every project we undertake with passion and precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className={`group relative h-full border-2 ${service.borderColor} ${service.hoverColor} hover:shadow-2xl transition-all duration-500 overflow-hidden hover:scale-[1.02]`}>
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Decorative elements */}
                <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-accent/10 to-transparent rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-6 left-6 w-12 h-12 bg-gradient-to-br from-primary/10 to-transparent rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                
                <CardHeader className="relative z-10 pb-6">
                  <div className={`${service.iconColor} mb-8 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center w-20 h-20 bg-gradient-to-br from-background to-accent/20 rounded-3xl border border-border/50 shadow-lg`}>
                    {service.icon}
                  </div>
                  <CardTitle 
                    className="text-3xl mb-4 text-foreground group-hover:text-foreground transition-colors font-semibold tracking-tight"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    {service.title}
                  </CardTitle>
                  <CardDescription 
                    className="text-lg text-muted-foreground leading-relaxed font-light"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <div className="space-y-4 mb-10">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-base">
                        <div className={`w-2 h-2 ${service.iconColor.replace('text-', 'bg-')} rounded-full mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-300`}></div>
                        <span 
                          className="text-muted-foreground font-light"
                          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full group/btn border-2 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 hover:border-primary/30 transition-all duration-300 h-12 font-medium tracking-wide"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    <span className="mr-2">Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-16 px-12 text-lg font-medium tracking-wide"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            Discuss Your Project
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}