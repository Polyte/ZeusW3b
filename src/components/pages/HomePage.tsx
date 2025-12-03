import Hero from "../Hero";
import ServicesSlider from "../ServicesSlider";
import { Button } from "../ui/button";
import { Users, Award, Clock, Star, Sparkles, Zap, Target, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export default function HomePage() {
  const stats = [
    { 
      icon: <Users className="w-6 h-6" />, 
      value: "50+", 
      label: "Happy Clients", 
      description: "Worldwide",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    { 
      icon: <Award className="w-6 h-6" />, 
      value: "100%", 
      label: "Success Rate", 
      description: "Project Delivery",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    { 
      icon: <Clock className="w-6 h-6" />, 
      value: "24/7", 
      label: "Support", 
      description: "Always Available",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    { 
      icon: <Star className="w-6 h-6" />, 
      value: "5.0", 
      label: "Rating", 
      description: "Client Reviews",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, TechStart Inc.",
      content: "ZeusLabs transformed our vision into reality. Their expertise in full-stack development is unmatched.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612c058?w=60&h=60&fit=crop&crop=face",
      company: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop"
    },
    {
      name: "Michael Chen",
      role: "Founder, SecureNet",
      content: "The cybersecurity audit they provided was comprehensive and helped us achieve compliance seamlessly.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      company: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop"
    },
    {
      name: "Emma Davis",
      role: "Product Manager, GameCorp",
      content: "Our mobile game exceeded 1M downloads thanks to their exceptional game development skills.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      company: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop"
    }
  ];

  const achievements = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Delivery",
      description: "Average project completion 40% faster than industry standards",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precision Engineering",
      description: "99.9% accuracy in project requirements and specifications",
      color: "text-red-500",
      bgColor: "bg-red-500/10"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Growth Impact",
      description: "Average 200% business growth for our clients post-launch",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    }
  ];

  return (
    <>
      <Hero />
      
      {/* Introduction Section - Reduced padding */}
      <section className="py-16 md:py-20 relative overflow-hidden scroll-reveal">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full mb-6"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)"
                }}
              >
                <Sparkles className="w-4 h-4 text-primary mr-2 animate-pulse" />
                <span 
                  className="text-sm font-medium text-primary tracking-wider"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  Welcome to ZeusLabs
                </span>
              </motion.div>
              
              <motion.h2 
                className="text-4xl md:text-6xl mb-6 text-foreground font-bold tracking-tight leading-none"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Powering Innovation
              </motion.h2>
              
              <motion.p 
                className="text-lg text-muted-foreground leading-relaxed font-light mb-8"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                We are a cutting-edge technology company specializing in software development, 
                web development, cybersecurity, and game development. Our mission is to transform 
                your ambitious ideas into powerful digital experiences.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => window.location.hash = 'contact'}
                    size="lg" 
                    className="btn-gradient-blue transition-all duration-300 h-12 px-6 font-medium tracking-wide"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    Get Started Today
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => window.location.hash = 'about'}
                    variant="outline" 
                    size="lg" 
                    className="border-2 hover:bg-accent/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-12 px-6 font-medium tracking-wide"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    Learn More
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ 
                  scale: 1.02,
                  y: -10,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)"
                }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop"
                  alt="ZeusLabs Team Innovation"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 bg-white dark:bg-card p-4 rounded-2xl shadow-xl border"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)"
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                      Award Winning
                    </div>
                    <div className="text-xs text-muted-foreground" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                      Technology Solutions
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats Grid - Reduced padding */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-4 rounded-2xl bg-gradient-to-br from-card/50 to-accent/10 border border-border/50 backdrop-blur-sm cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
                }}
              >
                <motion.div
                  className={`${stat.color} mb-2 flex justify-center p-2 ${stat.bgColor} rounded-xl w-fit mx-auto`}
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.icon}
                </motion.div>
                <div 
                  className="text-2xl lg:text-3xl font-bold text-foreground mb-1"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {stat.value}
                </div>
                <div 
                  className="text-sm font-semibold text-foreground mb-1"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {stat.label}
                </div>
                <div 
                  className="text-xs text-muted-foreground"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section - Removed gradients */}
      <section className="py-16 md:py-20 relative scroll-reveal">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-4xl md:text-6xl mb-6 text-foreground font-bold tracking-tight"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Why Choose Us
            </h2>
            <p 
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              We don't just build software, we craft digital experiences that drive real results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center p-6 rounded-3xl bg-card border border-border/50 backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.02,
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                }}
              >
                <motion.div
                  className={`${achievement.color} mb-4 flex justify-center p-3 ${achievement.bgColor} rounded-2xl w-fit mx-auto`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {achievement.icon}
                </motion.div>
                <h3 
                  className="text-lg font-semibold text-foreground mb-3"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {achievement.title}
                </h3>
                <p 
                  className="text-muted-foreground leading-relaxed font-light text-sm"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with Slider - Reduced padding */}
      <section className="py-16 md:py-20 relative scroll-reveal">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-background to-accent/5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-4xl md:text-6xl mb-6 text-foreground font-bold tracking-tight"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Our Services
            </h2>
            <p 
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Discover how we can help bring your vision to life with our comprehensive technology solutions.
            </p>
          </motion.div>

          <ServicesSlider />
        </div>
      </section>

      {/* Testimonials Section - Reduced padding */}
      <section className="py-16 md:py-20 relative scroll-reveal">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-4xl md:text-6xl mb-6 text-foreground font-bold tracking-tight"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              What Clients Say
            </h2>
            <p 
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Don't just take our word for it - hear from the companies we've helped succeed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <motion.div
                  className="h-full border-2 border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-500 overflow-hidden rounded-2xl bg-card"
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  {/* Company Image */}
                  <motion.div
                    className="h-20 overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ImageWithFallback
                      src={testimonial.company}
                      alt={`${testimonial.name} company`}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                    />
                  </motion.div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ImageWithFallback
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                      </motion.div>
                      <div>
                        <div 
                          className="text-sm font-semibold text-foreground"
                          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                        >
                          {testimonial.name}
                        </div>
                        <div 
                          className="text-xs text-muted-foreground"
                          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                        >
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <p 
                      className="text-sm text-muted-foreground leading-relaxed font-light italic"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      "{testimonial.content}"
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Reduced padding */}
      <section className="py-16 md:py-20 relative scroll-reveal">
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
              className="text-4xl md:text-6xl mb-6 text-foreground font-bold tracking-tight"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Ready to Start?
            </h2>
            <p 
              className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed font-light"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Let's discuss how we can transform your ideas into powerful digital solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => window.location.hash = 'contact'}
                  size="lg" 
                  className="btn-gradient-orange transition-all duration-300 h-14 px-10 text-lg font-medium tracking-wide"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => window.location.hash = 'projects'}
                  size="lg" 
                  className="btn-teal transition-all duration-300 h-14 px-10 text-lg font-medium tracking-wide"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  View Our Work
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}