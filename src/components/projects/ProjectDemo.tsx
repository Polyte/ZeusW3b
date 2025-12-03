import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowLeft, ExternalLink, Play, Monitor, Smartphone, Tablet, Code, Zap, Users, TrendingUp, Star } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useState } from "react";

interface ProjectDemoProps {
  projectId: string;
}

export default function ProjectDemo({ projectId }: ProjectDemoProps) {
  const [currentDevice, setCurrentDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const projectDemos = {
    'financeflow': {
      title: "FinanceFlow - Banking Platform",
      subtitle: "Revolutionary Digital Banking Experience",
      description: "Experience the future of banking with our AI-powered platform featuring real-time insights, advanced security, and seamless transactions.",
      category: "Software Development",
      categoryColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      demoUrl: "https://financeflow-demo.zeuslabs.com",
      features: [
        "Real-time transaction monitoring",
        "AI-powered financial insights",
        "Advanced fraud detection",
        "Multi-factor authentication",
        "Customizable dashboard",
        "Mobile-first design"
      ],
      metrics: {
        users: "100K+",
        uptime: "99.9%",
        transactions: "1M+/day",
        satisfaction: "4.9/5"
      },
      screenshots: {
        desktop: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
        tablet: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        mobile: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=800&fit=crop"
      },
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker"],
      videoDemo: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    'secureshield': {
      title: "SecureShield - Enterprise Security Suite",
      subtitle: "Advanced Cybersecurity Monitoring",
      description: "Comprehensive security platform with AI threat detection, automated response, and real-time monitoring for enterprise infrastructure.",
      category: "Cybersecurity",
      categoryColor: "bg-red-500/10 text-red-600 border-red-500/20",
      demoUrl: "https://secureshield-demo.zeuslabs.com",
      features: [
        "AI-powered threat detection",
        "Automated incident response",
        "Real-time monitoring dashboard",
        "Compliance reporting",
        "Forensic analysis tools",
        "Network visualization"
      ],
      metrics: {
        threats: "10M+",
        accuracy: "99.5%",
        response: "15 sec",
        reduction: "95%"
      },
      screenshots: {
        desktop: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=800&fit=crop",
        tablet: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
        mobile: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=800&fit=crop"
      },
      technologies: ["Python", "TensorFlow", "Elasticsearch", "Kafka", "Docker", "Kubernetes"],
      videoDemo: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    'ecocommerce': {
      title: "EcoCommerce - Sustainable Marketplace",
      subtitle: "Next-Generation E-commerce Platform",
      description: "Revolutionary e-commerce platform focused on sustainability with carbon tracking, green shipping, and environmental impact visualization.",
      category: "Web Development",
      categoryColor: "bg-green-500/10 text-green-600 border-green-500/20",
      demoUrl: "https://ecocommerce-demo.zeuslabs.com",
      features: [
        "Carbon footprint tracking",
        "Sustainable product filtering",
        "Green shipping options",
        "Impact visualization",
        "Eco-friendly packaging",
        "Reward system for sustainability"
      ],
      metrics: {
        users: "500K+",
        conversion: "35%",
        carbonSaved: "2M kg",
        growth: "400%"
      },
      screenshots: {
        desktop: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop",
        tablet: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        mobile: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=800&fit=crop"
      },
      technologies: ["Next.js", "Shopify", "Stripe", "MongoDB", "GraphQL", "Vercel"],
      videoDemo: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    'mythlands': {
      title: "Mythlands - Fantasy MMORPG",
      subtitle: "Epic Multiplayer Fantasy Game",
      description: "Immersive multiplayer fantasy game with stunning 3D graphics, guild systems, real-time PvP, and cross-platform compatibility.",
      category: "Game Development",
      categoryColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      demoUrl: "https://mythlands-demo.zeuslabs.com",
      features: [
        "Massive multiplayer world",
        "Real-time combat system",
        "Guild management",
        "Character customization",
        "Cross-platform play",
        "In-game economy"
      ],
      metrics: {
        players: "2M+",
        retention: "85%",
        revenue: "$50M+",
        rating: "4.8/5"
      },
      screenshots: {
        desktop: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop",
        tablet: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
        mobile: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=800&fit=crop"
      },
      technologies: ["Unity", "C#", "Photon", "AWS GameLift", "PlayFab", "Mirror"],
      videoDemo: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    'healthtrack': {
      title: "HealthTrack - Medical Management System",
      subtitle: "Comprehensive Healthcare Platform",
      description: "Integrated healthcare management system with patient management, telemedicine, AI diagnostics, and HIPAA compliance.",
      category: "Software Development",
      categoryColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      demoUrl: "https://healthtrack-demo.zeuslabs.com",
      features: [
        "Patient management system",
        "Telemedicine consultations",
        "AI-powered diagnostics",
        "Electronic health records",
        "Appointment scheduling",
        "HIPAA compliance tools"
      ],
      metrics: {
        hospitals: "50+",
        patients: "1M+",
        efficiency: "40%",
        satisfaction: "4.7/5"
      },
      screenshots: {
        desktop: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=800&fit=crop",
        tablet: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
        mobile: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=800&fit=crop"
      },
      technologies: ["React", "Python", "FastAPI", "PostgreSQL", "TensorFlow", "Docker"],
      videoDemo: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    'cyberwatch': {
      title: "CyberWatch - Network Security Monitor",
      subtitle: "Advanced Network Security Solution",
      description: "Sophisticated network security monitoring with AI-powered anomaly detection, automated threat response, and forensic analysis.",
      category: "Cybersecurity",
      categoryColor: "bg-red-500/10 text-red-600 border-red-500/20",
      demoUrl: "https://cyberwatch-demo.zeuslabs.com",
      features: [
        "Network traffic analysis",
        "Anomaly detection",
        "Threat intelligence",
        "Incident response automation",
        "Forensic investigation",
        "Compliance monitoring"
      ],
      metrics: {
        accuracy: "99.5%",
        response: "15 sec",
        threats: "50K+",
        coverage: "24/7"
      },
      screenshots: {
        desktop: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop",
        tablet: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
        mobile: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=800&fit=crop"
      },
      technologies: ["Python", "Elasticsearch", "Kibana", "Suricata", "TensorFlow", "Kafka"],
      videoDemo: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    'learnsphere': {
      title: "LearnSphere - Educational Platform",
      subtitle: "Innovative EdTech Solution",
      description: "Comprehensive educational platform with personalized learning paths, AI tutoring, virtual classrooms, and analytics.",
      category: "Web Development",
      categoryColor: "bg-green-500/10 text-green-600 border-green-500/20",
      demoUrl: "https://learnsphere-demo.zeuslabs.com",
      features: [
        "Personalized learning paths",
        "AI-powered tutoring",
        "Virtual classrooms",
        "Progress analytics",
        "Interactive content",
        "Collaborative tools"
      ],
      metrics: {
        students: "100K+",
        engagement: "80%",
        improvement: "45%",
        retention: "92%"
      },
      screenshots: {
        desktop: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
        tablet: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
        mobile: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=800&fit=crop"
      },
      technologies: ["Vue.js", "Node.js", "MongoDB", "TensorFlow.js", "WebRTC", "Docker"],
      videoDemo: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    },
    'spacerunner': {
      title: "SpaceRunner - Mobile Racing Game",
      subtitle: "High-Octane Space Racing",
      description: "Adrenaline-pumping space racing game with stunning 3D graphics, multiplayer tournaments, and cross-platform play.",
      category: "Game Development",
      categoryColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      demoUrl: "https://spacerunner-demo.zeuslabs.com",
      features: [
        "3D space racing tracks",
        "Multiplayer tournaments",
        "Ship customization",
        "Cross-platform play",
        "Real-time physics",
        "Global leaderboards"
      ],
      metrics: {
        downloads: "5M+",
        rating: "4.8/5",
        revenue: "$15M+",
        retention: "75%"
      },
      screenshots: {
        desktop: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?w=1200&h=800&fit=crop",
        tablet: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?w=800&h=600&fit=crop",
        mobile: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?w=400&h=800&fit=crop"
      },
      technologies: ["Unity", "C#", "Photon Bolt", "Unity Netcode", "Addressables", "Analytics"],
      videoDemo: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
    }
  };

  const project = projectDemos[projectId as keyof typeof projectDemos];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Demo Not Found</h1>
          <Button onClick={() => window.location.hash = 'projects'}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const deviceSizes = {
    desktop: { width: "100%", height: "600px" },
    tablet: { width: "768px", height: "600px" },
    mobile: { width: "375px", height: "600px" }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => window.location.hash = 'projects'}
                variant="outline" 
                className="mb-8 border-2 hover:bg-accent/50 hover:border-primary/30 transition-all duration-300"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Button>
            </motion.div>
            
            <Badge className={`${project.categoryColor} border backdrop-blur-sm font-medium mb-6`}>
              {project.category}
            </Badge>
            
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl mb-6 text-foreground font-bold tracking-tight leading-none"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              {project.title}
            </h1>
            
            <h2 
              className="text-xl md:text-2xl text-muted-foreground mb-8 font-light"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              {project.subtitle}
            </h2>
            
            <p 
              className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light mb-12"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              {project.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="btn-gradient-blue transition-all duration-300 h-14 px-8 text-lg font-medium tracking-wide"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Try Live Demo
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => window.location.hash = `project-case-study-${projectId}`}
                  variant="outline" 
                  size="lg" 
                  className="border-2 hover:bg-accent/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-14 px-8 text-lg font-medium tracking-wide"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  View Case Study
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Device Preview Selector */}
      <section className="py-8 bg-gradient-to-r from-accent/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2 bg-card border border-border/50 rounded-xl p-2">
              {[
                { id: 'desktop', icon: Monitor, label: 'Desktop' },
                { id: 'tablet', icon: Tablet, label: 'Tablet' },
                { id: 'mobile', icon: Smartphone, label: 'Mobile' }
              ].map((device) => {
                const IconComponent = device.icon;
                return (
                  <motion.button
                    key={device.id}
                    onClick={() => setCurrentDevice(device.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      currentDevice === device.id 
                        ? 'bg-primary text-primary-foreground shadow-md' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span 
                      className="text-sm font-medium"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {device.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h3 
                className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                Interactive Demo
              </h3>
              <p 
                className="text-muted-foreground max-w-2xl mx-auto font-light"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                Experience the full functionality of {project.title} across different devices.
              </p>
            </div>

            {/* Demo Frame */}
            <div className="flex justify-center mb-8">
              <motion.div
                key={currentDevice}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative bg-gradient-to-br from-card to-accent/10 rounded-3xl p-8 shadow-2xl border border-border/50"
                style={{ 
                  maxWidth: deviceSizes[currentDevice].width,
                  width: '100%'
                }}
              >
                <div 
                  className="relative rounded-2xl overflow-hidden shadow-xl bg-background border border-border/30"
                  style={{ height: deviceSizes[currentDevice].height }}
                >
                  <ImageWithFallback
                    src={project.screenshots[currentDevice]}
                    alt={`${project.title} ${currentDevice} demo`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Demo Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-8">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        className="btn-gradient-green shadow-lg text-lg font-medium tracking-wide"
                        style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                      >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Open Live Demo
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features & Metrics */}
      <section className="py-16 bg-gradient-to-b from-accent/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 
                className="text-3xl font-bold text-foreground mb-8"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                Key Features
              </h3>
              <div className="space-y-4">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center p-4 rounded-xl bg-card border border-border/50 hover:shadow-lg transition-all duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mr-4 flex-shrink-0"></div>
                    <span 
                      className="text-foreground font-medium"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 
                className="text-3xl font-bold text-foreground mb-8"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                Project Metrics
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(project.metrics).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center p-6 rounded-2xl bg-gradient-to-br from-card to-accent/10 border border-border/50 hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div 
                      className="text-3xl font-bold text-primary mb-2"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {value}
                    </div>
                    <div 
                      className="text-sm text-muted-foreground capitalize font-medium"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h3 
              className="text-3xl font-bold text-foreground mb-8"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Built With
            </h3>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {project.technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <Badge 
                    variant="outline" 
                    className="px-4 py-2 text-sm bg-card border-border/50 hover:border-primary/30 transition-all duration-300"
                  >
                    <Code className="w-3 h-3 mr-2" />
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => window.location.hash = `project-code-${projectId}`}
                  size="lg" 
                  className="btn-gradient-purple transition-all duration-300 h-14 px-8 text-lg font-medium tracking-wide"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  <Code className="w-5 h-5 mr-2" />
                  View Source Code
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => window.location.hash = `project-case-study-${projectId}`}
                  variant="outline" 
                  size="lg" 
                  className="border-2 hover:bg-accent/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-14 px-8 text-lg font-medium tracking-wide"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  Read Case Study
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}