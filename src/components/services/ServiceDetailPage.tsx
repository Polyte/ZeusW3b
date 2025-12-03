import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ArrowLeft, CheckCircle, Star, Users, Clock, Award, Target, Zap, Code, Globe, Shield, Gamepad2, Cloud, Smartphone } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import ServiceRequestForm from "../ServiceRequestForm";

interface ServiceDetailPageProps {
  serviceType: string;
}

export default function ServiceDetailPage({ serviceType }: ServiceDetailPageProps) {
  // All pricing is displayed in South African Rands (ZAR)
  const serviceData = {
    "software-development": {
      title: "Software Development",
      subtitle: "Custom Software Solutions That Drive Business Growth",
      icon: <Code className="w-8 h-8" />,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      description: "Transform your business with custom software solutions built using cutting-edge technologies and industry best practices. Our team specializes in creating scalable, maintainable, and secure software that grows with your business.",
      features: [
        "Custom Enterprise Applications",
        "API Development & Integration", 
        "Database Design & Optimization",
        "Legacy System Modernization",
        "Microservices Architecture",
        "Cloud-Native Applications",
        "Real-time Data Processing",
        "Advanced Analytics & Reporting"
      ],
      technologies: ["React", "Node.js", "Python", "Java", "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "AWS", "Azure"],
      process: [
        {
          step: "Requirements Analysis",
          description: "We analyze your business needs and technical requirements to create a comprehensive project roadmap.",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
        },
        {
          step: "Architecture Design", 
          description: "Our architects design scalable system architecture and select optimal technology stack.",
          image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop"
        },
        {
          step: "Development & Testing",
          description: "Agile development with continuous testing, code reviews, and quality assurance.",
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
        },
        {
          step: "Deployment & Support",
          description: "Seamless deployment with ongoing maintenance, monitoring, and feature enhancements.",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop"
        }
      ],
      benefits: [
        {
          title: "Scalability",
          description: "Built to handle growth and increased demand",
          icon: <Target className="w-6 h-6" />
        },
        {
          title: "Security",
          description: "Enterprise-grade security and data protection",
          icon: <Shield className="w-6 h-6" />
        },
        {
          title: "Performance",
          description: "Optimized for speed and efficiency",
          icon: <Zap className="w-6 h-6" />
        }
      ],
      pricing: {
        starting: "R280,000",
        description: "Custom pricing based on project scope and complexity"
      },
      testimonial: {
        text: "ZeusLabs delivered exactly what we needed. The software has increased our operational efficiency by 40% and the support has been exceptional.",
        author: "Sarah Johnson",
        role: "CTO, TechCorp",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612c058?w=60&h=60&fit=crop&crop=face"
      }
    },
    "web-development": {
      title: "Web Development", 
      subtitle: "Modern Web Applications That Engage and Convert",
      icon: <Globe className="w-8 h-8" />,
      color: "text-green-600",
      bgColor: "bg-green-500/10", 
      borderColor: "border-green-500/20",
      heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      description: "Create stunning, responsive web applications that provide exceptional user experiences across all devices. Our web development services combine modern design principles with robust functionality to deliver results that drive business growth.",
      features: [
        "Responsive Web Design",
        "Progressive Web Apps (PWA)",
        "E-commerce Platforms",
        "Content Management Systems",
        "Single Page Applications",
        "API-First Development",
        "SEO Optimization",
        "Performance Optimization"
      ],
      technologies: ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "Tailwind CSS", "Node.js", "Express", "GraphQL", "Prisma"],
      process: [
        {
          step: "UX/UI Design",
          description: "User research, wireframing, and creating intuitive designs that convert visitors into customers.",
          image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop"
        },
        {
          step: "Frontend Development",
          description: "Building responsive, interactive interfaces using modern frameworks and best practices.",
          image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=400&h=300&fit=crop"
        },
        {
          step: "Backend Integration",
          description: "Developing robust APIs and server-side functionality for dynamic web applications.",
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
        },
        {
          step: "Testing & Launch",
          description: "Comprehensive testing across devices and browsers, followed by deployment and optimization.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
        }
      ],
      benefits: [
        {
          title: "Mobile-First Design",
          description: "Optimized for all devices and screen sizes",
          icon: <Smartphone className="w-6 h-6" />
        },
        {
          title: "Fast Loading",
          description: "Optimized for speed and search engines",
          icon: <Zap className="w-6 h-6" />
        },
        {
          title: "User Experience",
          description: "Intuitive interfaces that convert visitors",
          icon: <Users className="w-6 h-6" />
        }
      ],
      pricing: {
        starting: "R150,000",
        description: "From simple websites to complex web applications"
      },
      testimonial: {
        text: "Our new website has transformed our online presence. Traffic is up 200% and conversions have tripled since launch.",
        author: "Michael Chen",
        role: "Marketing Director, GrowthCo",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
      }
    },
    "cybersecurity": {
      title: "Cybersecurity",
      subtitle: "Comprehensive Security Solutions for Digital Protection",
      icon: <Shield className="w-8 h-8" />,
      color: "text-red-600",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20", 
      heroImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
      description: "Protect your digital assets with enterprise-grade cybersecurity solutions. Our comprehensive security services help organizations defend against evolving threats, ensure compliance, and maintain business continuity.",
      features: [
        "Security Assessments & Audits",
        "Penetration Testing",
        "Vulnerability Management",
        "Incident Response & Forensics",
        "Compliance Management",
        "Security Training & Awareness",
        "24/7 Security Monitoring",
        "Identity & Access Management"
      ],
      technologies: ["Python", "Nmap", "Metasploit", "Wireshark", "Splunk", "ELK Stack", "SIEM Tools", "Firewall Management", "Encryption", "PKI"],
      process: [
        {
          step: "Security Assessment",
          description: "Comprehensive analysis of your current security posture and identification of vulnerabilities.",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop"
        },
        {
          step: "Risk Analysis",
          description: "Detailed risk assessment and prioritization of security threats and vulnerabilities.",
          image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop"
        },
        {
          step: "Implementation",
          description: "Deployment of security controls, tools, and processes to mitigate identified risks.",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop"
        },
        {
          step: "Monitoring & Response",
          description: "Continuous monitoring, threat detection, and rapid incident response capabilities.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
        }
      ],
      benefits: [
        {
          title: "Threat Prevention",
          description: "Proactive defense against cyber attacks",
          icon: <Shield className="w-6 h-6" />
        },
        {
          title: "Compliance",
          description: "Meet industry standards and regulations",
          icon: <Award className="w-6 h-6" />
        },
        {
          title: "24/7 Monitoring",
          description: "Round-the-clock security surveillance",
          icon: <Clock className="w-6 h-6" />
        }
      ],
      pricing: {
        starting: "R220,000",
        description: "Security assessments and ongoing protection services"
      },
      testimonial: {
        text: "ZeusLabs transformed our security posture. We've had zero security incidents since implementing their solutions.",
        author: "David Rodriguez",
        role: "CISO, SecureBank",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
      }
    },
    "game-development": {
      title: "Game Development",
      subtitle: "Immersive Gaming Experiences Across All Platforms", 
      icon: <Gamepad2 className="w-8 h-8" />,
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      heroImage: "https://images.unsplash.com/photo-1511512578047-dfb367c3c1bc?w=800&h=600&fit=crop",
      description: "Bring your game ideas to life with cutting-edge game development services. From mobile games to VR experiences, we create engaging, high-quality games that captivate audiences and drive player retention.",
      features: [
        "Mobile Game Development",
        "PC & Console Games",
        "VR/AR Experiences", 
        "Multiplayer Game Systems",
        "Game Engine Development",
        "2D & 3D Art Assets",
        "Game Testing & QA",
        "Live Operations & Updates"
      ],
      technologies: ["Unity", "Unreal Engine", "C#", "C++", "Blender", "Maya", "Photoshop", "React Native", "PlayFab", "Firebase"],
      process: [
        {
          step: "Concept & Design",
          description: "Game concept development, mechanics design, and creating engaging player experiences.",
          image: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400&h=300&fit=crop"
        },
        {
          step: "Prototyping",
          description: "Rapid prototyping to test core mechanics and validate gameplay concepts.",
          image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=300&fit=crop"
        },
        {
          step: "Development",
          description: "Full game development with art creation, programming, and audio integration.",
          image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop"
        },
        {
          step: "Testing & Launch",
          description: "Comprehensive testing, optimization, and deployment across target platforms.",
          image: "https://images.unsplash.com/photo-1511512578047-dfb367c3c1bc?w=400&h=300&fit=crop"
        }
      ],
      benefits: [
        {
          title: "Cross-Platform",
          description: "Deploy to multiple platforms simultaneously",
          icon: <Globe className="w-6 h-6" />
        },
        {
          title: "Engagement",
          description: "Addictive gameplay and user retention",
          icon: <Users className="w-6 h-6" />
        },
        {
          title: "Monetization",
          description: "Integrated revenue generation strategies",
          icon: <Target className="w-6 h-6" />
        }
      ],
      pricing: {
        starting: "R450,000",
        description: "From simple mobile games to complex multiplayer experiences"
      },
      testimonial: {
        text: "The game ZeusLabs created for us has over 1M downloads and continues to grow. The quality and attention to detail is outstanding.",
        author: "Emma Wilson",
        role: "Creative Director, PlayStudio",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
      }
    },
    "cloud-solutions": {
      title: "Cloud Solutions",
      subtitle: "Scalable Cloud Infrastructure for Modern Businesses",
      icon: <Cloud className="w-8 h-8" />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20",
      heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
      description: "Transform your business with cloud-first solutions that provide scalability, reliability, and cost-effectiveness. Our cloud experts help you migrate, optimize, and manage your infrastructure for maximum performance and security.",
      features: [
        "Cloud Migration Services",
        "Infrastructure as Code",
        "DevOps & CI/CD Pipelines",
        "Container Orchestration",
        "Serverless Architecture",
        "Monitoring & Analytics",
        "Disaster Recovery",
        "Cost Optimization"
      ],
      technologies: ["AWS", "Azure", "Google Cloud", "Terraform", "Kubernetes", "Docker", "Jenkins", "Prometheus", "Grafana", "ELK Stack"],
      process: [
        {
          step: "Assessment & Strategy",
          description: "Analyze current infrastructure and develop cloud adoption strategy aligned with business goals.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
        },
        {
          step: "Migration Planning",
          description: "Detailed migration plan with minimal downtime and risk mitigation strategies.",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop"
        },
        {
          step: "Implementation",
          description: "Execute migration with monitoring, testing, and optimization at every step.",
          image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"
        },
        {
          step: "Optimization",
          description: "Ongoing monitoring, cost optimization, and performance tuning for maximum efficiency.",
          image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop"
        }
      ],
      benefits: [
        {
          title: "Scalability",
          description: "Auto-scaling based on demand",
          icon: <Target className="w-6 h-6" />
        },
        {
          title: "Cost Savings",
          description: "Optimized resource usage and pricing",
          icon: <Award className="w-6 h-6" />
        },
        {
          title: "Reliability",
          description: "99.9% uptime with automated backups",
          icon: <Shield className="w-6 h-6" />
        }
      ],
      pricing: {
        starting: "R180,000",
        description: "Cloud migration and infrastructure management services"
      },
      testimonial: {
        text: "Our cloud migration with ZeusLabs reduced our infrastructure costs by 60% while improving performance and reliability.",
        author: "Alex Kumar",
        role: "DevOps Lead, DataFlow",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face"
      }
    },
    "mobile-apps": {
      title: "Mobile Apps",
      subtitle: "Native & Cross-Platform Mobile Applications",
      icon: <Smartphone className="w-8 h-8" />,
      color: "text-teal-600", 
      bgColor: "bg-teal-500/10",
      borderColor: "border-teal-500/20",
      heroImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      description: "Create powerful mobile applications that engage users and drive business growth. Our mobile development team builds high-performance apps for iOS and Android using the latest technologies and design principles.",
      features: [
        "Native iOS & Android Apps",
        "Cross-Platform Development",
        "UI/UX Design",
        "Backend Integration",
        "Push Notifications",
        "App Store Optimization",
        "Analytics & Tracking",
        "Maintenance & Updates"
      ],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Xamarin", "Firebase", "Redux", "GraphQL", "REST APIs", "App Store Connect"],
      process: [
        {
          step: "Strategy & Planning",
          description: "Define app strategy, target audience, and key features for maximum user engagement.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
        },
        {
          step: "Design & Prototyping",
          description: "Create intuitive UI/UX designs and interactive prototypes for user testing.",
          image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop"
        },
        {
          step: "Development & Testing",
          description: "Build robust mobile apps with comprehensive testing across devices and platforms.",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop"
        },
        {
          step: "Launch & Support",
          description: "App store submission, marketing support, and ongoing maintenance and updates.",
          image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop"
        }
      ],
      benefits: [
        {
          title: "Native Performance",
          description: "Optimized for each platform's capabilities",
          icon: <Zap className="w-6 h-6" />
        },
        {
          title: "User Experience",
          description: "Intuitive design that users love",
          icon: <Users className="w-6 h-6" />
        },
        {
          title: "App Store Success",
          description: "Optimized for discovery and downloads",
          icon: <Star className="w-6 h-6" />
        }
      ],
      pricing: {
        starting: "R280,000",
        description: "From simple apps to complex enterprise solutions"
      },
      testimonial: {
        text: "Our app built by ZeusLabs has 4.8 stars on both app stores and drives 40% of our revenue. Exceptional work!",
        author: "Lisa Park",
        role: "Product Manager, MobileCo",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612c058?w=60&h=60&fit=crop&crop=face"
      }
    }
  };

  const service = serviceData[serviceType as keyof typeof serviceData];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <Button onClick={() => window.location.hash = 'services'}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Button>
        </div>
      </div>
    );
  }

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
            className="max-w-6xl mx-auto"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => window.location.hash = 'services'}
                variant="outline" 
                className="mb-8 border-2 hover:bg-accent/50 hover:border-primary/30 transition-all duration-300"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Services
              </Button>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className={`${service.bgColor} ${service.color} ${service.borderColor} border backdrop-blur-sm font-medium mb-6`}>
                  {service.icon}
                  <span className="ml-2">{service.title}</span>
                </Badge>
                
                <h1 
                  className="text-4xl md:text-6xl lg:text-7xl mb-6 text-foreground font-bold tracking-tight leading-none"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {service.title}
                </h1>
                
                <h2 
                  className="text-xl md:text-2xl text-muted-foreground mb-8 font-light"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {service.subtitle}
                </h2>

                <p 
                  className="text-lg text-muted-foreground mb-12 leading-relaxed font-light"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {service.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a 
                    href="#request-service"
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      className="btn-gradient-blue transition-all duration-300 h-14 px-8 text-lg font-medium tracking-wide"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      Request This Service
                      <Target className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.a>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      onClick={() => window.location.hash = 'contact'}
                      variant="outline" 
                      size="lg" 
                      className="border-2 hover:bg-accent/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-14 px-8 text-lg font-medium tracking-wide"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      Get Free Consultation
                    </Button>
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src={service.heroImage}
                    alt={service.title}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="text-2xl font-bold mb-2">Starting from {service.pricing.starting}</div>
                    <div className="text-sm opacity-90">{service.pricing.description}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 
              className="text-3xl md:text-5xl mb-6 text-foreground font-bold"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              What's Included
            </h2>
            <p 
              className="text-lg text-muted-foreground leading-relaxed font-light"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Comprehensive {service.title.toLowerCase()} services designed to deliver exceptional results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full border-2 border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 text-center p-6">
                  <CheckCircle className={`w-8 h-8 ${service.color} mx-auto mb-4`} />
                  <h3 
                    className="text-lg font-semibold text-foreground mb-2"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    {feature}
                  </h3>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-b from-accent/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 
              className="text-3xl md:text-5xl mb-6 text-foreground font-bold"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Our Process
            </h2>
            <p 
              className="text-lg text-muted-foreground leading-relaxed font-light"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              A proven methodology that ensures successful project delivery from start to finish.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-500 overflow-hidden group">
                  <div className="h-32 overflow-hidden">
                    <ImageWithFallback
                      src={step.image}
                      alt={step.step}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <div className={`text-4xl font-bold ${service.color} mb-4 ${service.bgColor} w-fit mx-auto px-4 py-2 rounded-xl`} 
                         style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <CardTitle 
                      className="text-xl mb-3 text-foreground font-semibold text-center"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {step.step}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription 
                      className="text-muted-foreground leading-relaxed font-light text-center"
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

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 
              className="text-3xl md:text-5xl mb-6 text-foreground font-bold"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Key Benefits
            </h2>
            <p 
              className="text-lg text-muted-foreground leading-relaxed font-light"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Why choose our {service.title.toLowerCase()} services for your next project.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {service.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-500 text-center p-8">
                  <div className={`${service.color} mb-6 p-4 ${service.bgColor} rounded-2xl w-fit mx-auto`}>
                    {benefit.icon}
                  </div>
                  <CardTitle 
                    className="text-xl mb-4 text-foreground font-semibold"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    {benefit.title}
                  </CardTitle>
                  <CardDescription 
                    className="text-muted-foreground leading-relaxed font-light"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    {benefit.description}
                  </CardDescription>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-gradient-to-b from-accent/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 
              className="text-3xl md:text-5xl mb-6 text-foreground font-bold"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Technologies We Use
            </h2>
            <p 
              className="text-lg text-muted-foreground leading-relaxed font-light"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Industry-leading tools and frameworks to build robust, scalable solutions.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {service.technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge 
                  className={`px-6 py-3 ${service.bgColor} ${service.color} ${service.borderColor} border text-lg font-medium hover:shadow-lg transition-all duration-200 cursor-pointer`}
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-2 border-border/50 p-8 md:p-12 text-center bg-gradient-to-br from-card to-accent/10">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                ))}
              </div>
              <blockquote 
                className="text-xl md:text-2xl text-foreground mb-8 font-light italic leading-relaxed"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                "{service.testimonial.text}"
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <ImageWithFallback
                  src={service.testimonial.avatar}
                  alt={service.testimonial.author}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-left">
                  <div 
                    className="font-semibold text-foreground"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    {service.testimonial.author}
                  </div>
                  <div 
                    className="text-muted-foreground"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    {service.testimonial.role}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Service Request Form Section */}
      <section id="request-service" className="py-20 bg-gradient-to-b from-accent/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ServiceRequestForm serviceName={service.title} />
          </div>
        </div>
      </section>
    </div>
  );
}