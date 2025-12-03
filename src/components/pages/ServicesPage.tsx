import Services from "../Services";
import { motion } from "motion/react";
import { Code, Globe, Shield, Gamepad2, CheckCircle2, ArrowRight, Zap, Target, Award } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export default function ServicesPage() {
  const processSteps = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We analyze your requirements and create a detailed project roadmap.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      step: "02", 
      title: "Design & Architecture",
      description: "Our team designs the optimal solution architecture for your needs.",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "We build your solution using best practices and rigorous testing.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      step: "04",
      title: "Deployment & Support",
      description: "Launch your solution with ongoing support and maintenance.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    }
  ];

  const technologies = [
    { name: "React", category: "Frontend", color: "bg-blue-500" },
    { name: "Node.js", category: "Backend", color: "bg-green-500" },
    { name: "Python", category: "Backend", color: "bg-indigo-500" },
    { name: "TypeScript", category: "Language", color: "bg-blue-600" },
    { name: "AWS", category: "Cloud", color: "bg-orange-500" },
    { name: "Docker", category: "DevOps", color: "bg-teal-500" },
    { name: "PostgreSQL", category: "Database", color: "bg-purple-500" },
    { name: "MongoDB", category: "Database", color: "bg-green-600" },
    { name: "Unity", category: "Game Dev", color: "bg-red-500" },
    { name: "Kubernetes", category: "DevOps", color: "bg-pink-500" }
  ];

  const whyChooseUs = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Development",
      description: "We use agile methodologies to deliver results quickly without compromising quality.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      color: "text-yellow-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precision & Attention to Detail",
      description: "Every line of code is crafted with precision and tested thoroughly for optimal performance.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
      color: "text-red-500"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Award-Winning Solutions",
      description: "Our work has been recognized by industry leaders and satisfied clients worldwide.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
      color: "text-purple-500"
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
                Our Services
              </h1>
              <p 
                className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed font-light"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                Comprehensive technology solutions designed to accelerate your business growth
                and digital transformation journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => window.location.hash = 'contact'}
                  size="lg" 
                  className="btn-gradient-blue hover:scale-105 transition-all duration-300 h-14 px-8 text-lg font-medium tracking-wide"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  onClick={() => window.location.hash = 'projects'}
                  size="lg" 
                  className="btn-green hover:scale-105 transition-all duration-300 h-14 px-8 text-lg font-medium tracking-wide"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  View Case Studies
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
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
                  alt="ZeusLabs Services Overview"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 relative">
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
              Why Choose <span className="text-blue-500">ZeusLabs?</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500 overflow-hidden group">
                  <div className="h-48 overflow-hidden">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 pt-[0px] pr-[0px] pb-[0px] pl-[10px]"></div>
                  </div>
                  <CardHeader className="relative">
                    <div className={`${item.color} mb-4 p-3 bg-white/90 dark:bg-card/90 rounded-2xl w-fit`}>
                      {item.icon}
                    </div>
                    <CardTitle 
                      className="text-xl mb-3 text-foreground font-semibold"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {item.title}
                    </CardTitle>
                    <CardDescription 
                      className="text-muted-foreground leading-relaxed font-light"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <Services />

      {/* Process Section */}
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
              Our Process
            </h2>
            <p 
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              A proven methodology that ensures successful project delivery from concept to completion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-500 text-center overflow-hidden group">
                  <div className="h-32 overflow-hidden">
                    <ImageWithFallback
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <div className={`text-6xl font-bold ${step.color} mb-4 ${step.bgColor} w-fit mx-auto px-4 py-2 rounded-2xl`} 
                         style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                      {step.step}
                    </div>
                    <CardTitle 
                      className="text-xl mb-3 text-foreground font-semibold"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription 
                      className="text-muted-foreground leading-relaxed font-light"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-32 relative">
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
              Technologies We Use
            </h2>
            <p 
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              We leverage the latest and most reliable technologies to build robust solutions.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
              >
                <div className={`px-6 py-3 ${tech.color} text-white border border-white/20 rounded-full text-sm font-medium hover:scale-105 transition-all duration-200 shadow-lg cursor-pointer`}
                     style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                  {tech.name}
                  <span className="text-xs text-white/80 ml-2">({tech.category})</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.location.hash = 'contact'}
                size="lg" 
                className="btn-gradient-purple hover:scale-105 transition-all duration-300 h-16 px-12 text-lg font-medium tracking-wide"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                onClick={() => window.location.hash = 'about'}
                size="lg" 
                className="btn-orange hover:scale-105 transition-all duration-300 h-16 px-12 text-lg font-medium tracking-wide"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                Meet Our Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}