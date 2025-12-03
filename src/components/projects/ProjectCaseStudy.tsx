import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowLeft, Download, ExternalLink, Users, Calendar, TrendingUp, Target, Lightbulb, Cog, CheckCircle, Star, Quote } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ProjectCaseStudyProps {
  projectId: string;
}

export default function ProjectCaseStudy({ projectId }: ProjectCaseStudyProps) {
  const caseStudies = {
    'financeflow': {
      title: "FinanceFlow - Banking Platform",
      subtitle: "Revolutionizing Digital Banking Experience",
      category: "Software Development",
      categoryColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      client: "National Bank Corp",
      duration: "18 months",
      teamSize: "12 developers",
      budget: "$2.5M",
      overview: "FinanceFlow represents a complete digital transformation of traditional banking, built from the ground up with modern architecture and user-centric design. The platform serves over 100,000 active users with real-time transaction processing, AI-powered insights, and enterprise-grade security.",
      challenge: "National Bank Corp needed to modernize their legacy banking system that was built in the early 2000s. The existing system couldn't handle modern security requirements, lacked mobile support, and provided poor user experience. They needed a complete overhaul while ensuring zero downtime during migration.",
      solution: "We designed a cloud-native, microservices-based platform using React for the frontend and Node.js for the backend. The solution included real-time transaction processing, AI-powered financial insights, advanced fraud detection, and a mobile-first responsive design.",
      results: [
        { metric: "User Growth", value: "400%", description: "Increase in active users" },
        { metric: "Performance", value: "60%", description: "Faster transaction processing" },
        { metric: "User Satisfaction", value: "4.9/5", description: "Average user rating" },
        { metric: "Security Incidents", value: "0", description: "Zero breaches since launch" }
      ],
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS Lambda", "Docker", "Kubernetes"],
      challenges: [
        "Legacy system integration with 20+ year old infrastructure",
        "Real-time transaction processing at scale (1M+ daily transactions)",
        "Regulatory compliance (PCI DSS, SOX, Basel III)",
        "Zero-downtime migration strategy"
      ],
      solutions: [
        "Implemented strangler fig pattern for gradual migration",
        "Event-driven architecture with Apache Kafka for real-time processing",
        "Comprehensive audit trails and encryption at rest/transit",
        "Blue-green deployment strategy with automated rollback"
      ],
      keyFeatures: [
        "Real-time transaction monitoring with instant notifications",
        "AI-powered spending insights and financial recommendations",
        "Advanced fraud detection using machine learning algorithms",
        "Multi-factor authentication with biometric support",
        "Customizable dashboard with drag-and-drop widgets",
        "Mobile-first responsive design with offline capabilities"
      ],
      testimonial: {
        text: "ZeusLabs exceeded our expectations in every way. The new platform has transformed our customer experience and operational efficiency. The migration was seamless, and the ongoing support has been exceptional.",
        author: "Sarah Mitchell",
        role: "CTO, National Bank Corp",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612c058?w=60&h=60&fit=crop&crop=face"
      },
      timeline: [
        { phase: "Discovery & Planning", duration: "2 months", description: "Requirements gathering, system analysis, architecture design" },
        { phase: "MVP Development", duration: "4 months", description: "Core features, authentication, basic transaction processing" },
        { phase: "Advanced Features", duration: "6 months", description: "AI insights, fraud detection, mobile optimization" },
        { phase: "Migration & Testing", duration: "4 months", description: "Data migration, security testing, user acceptance testing" },
        { phase: "Launch & Optimization", duration: "2 months", description: "Go-live support, performance optimization, user training" }
      ],
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      ]
    },
    'secureshield': {
      title: "SecureShield - Enterprise Security Suite",
      subtitle: "Next-Generation Cybersecurity Platform",
      category: "Cybersecurity",
      categoryColor: "bg-red-500/10 text-red-600 border-red-500/20",
      client: "Global Tech Inc",
      duration: "24 months",
      teamSize: "15 security specialists",
      budget: "$4.2M",
      overview: "SecureShield is an enterprise-grade cybersecurity platform that protects Fortune 500 companies through AI-powered threat detection, automated incident response, and comprehensive compliance management. The platform monitors over 10 million security events daily.",
      challenge: "Global Tech Inc was facing increasing cyber threats with their existing security tools generating too many false positives and lacking coordinated response capabilities. They needed a unified platform that could detect sophisticated threats in real-time while reducing operational overhead.",
      solution: "We built a comprehensive security platform using Python and machine learning for threat detection, Elasticsearch for log analysis, and automated response workflows. The solution provides real-time monitoring, AI-powered threat detection, and streamlined incident response.",
      results: [
        { metric: "Threats Prevented", value: "10M+", description: "Security incidents blocked" },
        { metric: "Detection Accuracy", value: "99.5%", description: "Threat detection rate" },
        { metric: "Response Time", value: "90%", description: "Faster incident response" },
        { metric: "Compliance Score", value: "100%", description: "SOC2 compliance rating" }
      ],
      technologies: ["Python", "TensorFlow", "Elasticsearch", "Kibana", "Apache Kafka", "Redis", "Docker", "Kubernetes"],
      challenges: [
        "Real-time analysis of massive data volumes (TB/day)",
        "Reducing false positive rates from 40% to under 1%",
        "Integration with 50+ existing security tools",
        "Meeting strict compliance requirements (SOC2, ISO 27001)"
      ],
      solutions: [
        "Distributed processing with Apache Spark for real-time analytics",
        "Advanced ML models with continuous learning capabilities",
        "Unified API layer for seamless tool integration",
        "Automated compliance reporting and audit trails"
      ],
      keyFeatures: [
        "AI-powered threat detection with behavioral analysis",
        "Automated incident response and containment",
        "Real-time security dashboard with threat intelligence",
        "Comprehensive compliance reporting (SOC2, ISO 27001)",
        "Advanced forensic analysis and investigation tools",
        "Integration with 100+ security tools and platforms"
      ],
      testimonial: {
        text: "SecureShield has revolutionized our security operations. The AI-powered detection capabilities have dramatically reduced false positives while catching threats our previous tools missed. It's been a game-changer for our security team.",
        author: "Michael Chen",
        role: "CISO, Global Tech Inc",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
      },
      timeline: [
        { phase: "Security Assessment", duration: "3 months", description: "Threat landscape analysis, security audit, requirements definition" },
        { phase: "Core Platform", duration: "8 months", description: "Threat detection engine, data pipeline, basic dashboard" },
        { phase: "AI Integration", duration: "6 months", description: "Machine learning models, behavioral analysis, automated response" },
        { phase: "Compliance Module", duration: "4 months", description: "Compliance reporting, audit trails, certification support" },
        { phase: "Deployment & Training", duration: "3 months", description: "Production deployment, team training, knowledge transfer" }
      ],
      images: [
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop"
      ]
    },
    // Add similar detailed case studies for other projects...
    'ecocommerce': {
      title: "EcoCommerce - Sustainable Marketplace",
      subtitle: "Revolutionizing E-commerce for Sustainability",
      category: "Web Development",
      categoryColor: "bg-green-500/10 text-green-600 border-green-500/20",
      client: "EcoVentures Ltd",
      duration: "14 months",
      teamSize: "10 developers",
      budget: "$1.8M",
      overview: "EcoCommerce is a next-generation e-commerce platform that connects eco-conscious consumers with sustainable brands. The platform features carbon footprint tracking, green shipping options, and environmental impact visualization, serving over 500,000 active users.",
      challenge: "EcoVentures needed a platform that could showcase sustainable products while providing transparency about environmental impact. Traditional e-commerce solutions lacked the sophisticated tracking and visualization needed for sustainability metrics.",
      solution: "We developed a custom e-commerce platform using Next.js and Shopify's headless commerce API, integrated with carbon tracking APIs and environmental impact databases. The solution provides real-time sustainability metrics and gamified eco-friendly shopping experiences.",
      results: [
        { metric: "User Base", value: "500K+", description: "Active eco-conscious users" },
        { metric: "Conversion Rate", value: "35%", description: "Increase in conversions" },
        { metric: "Carbon Impact", value: "2M kg", description: "CO2 emissions saved" },
        { metric: "Seller Growth", value: "400%", description: "Sustainable brands onboarded" }
      ],
      technologies: ["Next.js", "TypeScript", "Shopify API", "Stripe", "MongoDB", "GraphQL", "Vercel", "Cloudinary"],
      challenges: [
        "Complex carbon footprint calculations for thousands of products",
        "Real-time inventory management across multiple suppliers",
        "Integration with various shipping providers for green options",
        "Building trust through transparency and certification verification"
      ],
      solutions: [
        "Custom carbon calculation engine with lifecycle assessment",
        "Headless commerce architecture for flexibility and performance",
        "Multi-provider shipping API with carbon offset integration",
        "Blockchain-based certification verification system"
      ],
      keyFeatures: [
        "Carbon footprint tracking for every product and order",
        "Sustainable product filtering and recommendation engine",
        "Green shipping options with carbon offset calculations",
        "Environmental impact visualization and personal scorecards",
        "Eco-friendly packaging options and zero-waste initiatives",
        "Rewards system for sustainable shopping behavior"
      ],
      testimonial: {
        text: "EcoCommerce has perfectly captured our vision of sustainable commerce. The platform not only provides an excellent shopping experience but also educates and motivates customers to make environmentally conscious choices. Sales have exceeded our projections by 150%.",
        author: "Emma Green",
        role: "CEO, EcoVentures Ltd",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
      },
      timeline: [
        { phase: "Market Research", duration: "2 months", description: "Sustainability requirements, user research, competitive analysis" },
        { phase: "Platform Development", duration: "5 months", description: "Core e-commerce functionality, carbon tracking integration" },
        { phase: "Sustainability Features", duration: "4 months", description: "Impact visualization, green shipping, rewards system" },
        { phase: "Testing & Launch", duration: "2 months", description: "User testing, performance optimization, go-to-market" },
        { phase: "Growth & Optimization", duration: "1 month", description: "Post-launch optimization, feature enhancements" }
      ],
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop"
      ]
    }
    // Add more case studies for other projects with similar detail...
  };

  const caseStudy = caseStudies[projectId as keyof typeof caseStudies];

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
          <Button onClick={() => window.location.hash = 'projects'}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
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
            className="max-w-4xl mx-auto"
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
            
            <Badge className={`${caseStudy.categoryColor} border backdrop-blur-sm font-medium mb-6`}>
              Case Study • {caseStudy.category}
            </Badge>
            
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl mb-6 text-foreground font-bold tracking-tight leading-none"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              {caseStudy.title}
            </h1>
            
            <h2 
              className="text-xl md:text-2xl text-muted-foreground mb-8 font-light"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              {caseStudy.subtitle}
            </h2>

            {/* Project Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { label: "Client", value: caseStudy.client, icon: Users },
                { label: "Duration", value: caseStudy.duration, icon: Calendar },
                { label: "Team Size", value: caseStudy.teamSize, icon: Users },
                { label: "Budget", value: caseStudy.budget, icon: TrendingUp }
              ].map((detail, index) => {
                const IconComponent = detail.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center p-4 rounded-xl bg-card border border-border/50"
                  >
                    <IconComponent className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div 
                      className="text-lg font-bold text-foreground"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {detail.value}
                    </div>
                    <div 
                      className="text-sm text-muted-foreground"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {detail.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => window.location.hash = `project-demo-${projectId}`}
                  size="lg" 
                  className="btn-gradient-blue transition-all duration-300 h-14 px-8 text-lg font-medium tracking-wide"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Live Demo
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 hover:bg-accent/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-14 px-8 text-lg font-medium tracking-wide"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h3 
              className="text-3xl font-bold text-foreground mb-8"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Project Overview
            </h3>
            <p 
              className="text-lg text-muted-foreground leading-relaxed font-light mb-12"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              {caseStudy.overview}
            </p>

            {/* Project Images */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {caseStudy.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-2xl overflow-hidden shadow-lg border border-border/50"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${caseStudy.title} screenshot ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-16 bg-gradient-to-b from-accent/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Challenge */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full border-2 border-border/50 hover:shadow-lg transition-all duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-red-500" />
                    </div>
                    <span 
                      className="text-2xl font-bold"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      The Challenge
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p 
                    className="text-muted-foreground leading-relaxed font-light mb-6"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    {caseStudy.challenge}
                  </p>
                  <h4 
                    className="font-semibold text-foreground mb-4"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    Key Challenges:
                  </h4>
                  <div className="space-y-3">
                    {caseStudy.challenges.map((challenge, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span 
                          className="text-sm text-muted-foreground font-light"
                          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                        >
                          {challenge}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="h-full border-2 border-border/50 hover:shadow-lg transition-all duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-green-500" />
                    </div>
                    <span 
                      className="text-2xl font-bold"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      Our Solution
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p 
                    className="text-muted-foreground leading-relaxed font-light mb-6"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    {caseStudy.solution}
                  </p>
                  <h4 
                    className="font-semibold text-foreground mb-4"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    Implementation Approach:
                  </h4>
                  <div className="space-y-3">
                    {caseStudy.solutions.map((solution, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span 
                          className="text-sm text-muted-foreground font-light"
                          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                        >
                          {solution}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 
              className="text-3xl font-bold text-foreground mb-4"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Project Results
            </h3>
            <p 
              className="text-muted-foreground max-w-2xl mx-auto font-light"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Measurable impact and outcomes achieved through our solution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {caseStudy.results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-card to-accent/10 border border-border/50 hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div 
                  className="text-4xl font-bold text-primary mb-2"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {result.value}
                </div>
                <div 
                  className="text-lg font-semibold text-foreground mb-2"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {result.metric}
                </div>
                <div 
                  className="text-sm text-muted-foreground font-light"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {result.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-gradient-to-r from-accent/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-2 border-border/50 hover:shadow-xl transition-all duration-500">
              <CardContent className="p-8 lg:p-12">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Quote className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <blockquote 
                  className="text-xl md:text-2xl text-center text-foreground mb-8 leading-relaxed font-light italic"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  "{caseStudy.testimonial.text}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <ImageWithFallback
                    src={caseStudy.testimonial.avatar}
                    alt={caseStudy.testimonial.author}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="text-center">
                    <div 
                      className="font-semibold text-foreground"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {caseStudy.testimonial.author}
                    </div>
                    <div 
                      className="text-sm text-muted-foreground font-light"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {caseStudy.testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h3 
              className="text-3xl font-bold text-foreground text-center mb-12"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Project Timeline
            </h3>
            <div className="space-y-8">
              {caseStudy.timeline.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-6"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h4 
                        className="text-xl font-semibold text-foreground"
                        style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                      >
                        {phase.phase}
                      </h4>
                      <Badge variant="outline" className="w-fit">
                        {phase.duration}
                      </Badge>
                    </div>
                    <p 
                      className="text-muted-foreground font-light"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {phase.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 bg-gradient-to-b from-accent/5 via-background to-accent/5">
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
              Technologies Used
            </h3>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {caseStudy.technologies.map((tech, index) => (
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
                    <Cog className="w-3 h-3 mr-2" />
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => window.location.hash = `project-demo-${projectId}`}
                  size="lg" 
                  className="btn-gradient-green transition-all duration-300 h-14 px-8 text-lg font-medium tracking-wide"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Live Demo
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => window.location.hash = `project-code-${projectId}`}
                  variant="outline" 
                  size="lg" 
                  className="border-2 hover:bg-accent/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-14 px-8 text-lg font-medium tracking-wide"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  View Source Code
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}