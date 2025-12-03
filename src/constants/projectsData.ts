import { STOCK_IMAGES } from './stockImages';

export const projects = [
  {
    id: 'financeflow',
    title: "FinanceFlow - Banking Platform",
    description: "Revolutionary digital banking platform serving 100K+ users with advanced security, AI-powered insights, and seamless UX. Complete overhaul of legacy systems with 99.9% uptime.",
    fullDescription: "A comprehensive banking platform that revolutionized online banking experience. Features include real-time transactions, AI-powered financial insights, advanced fraud detection, and mobile-first design.",
    image: STOCK_IMAGES.projects.fintech.main,
    tags: ["React", "Node.js", "PostgreSQL", "AWS", "AI/ML", "Microservices"],
    category: "Software Development",
    featured: true,
    client: "National Bank Corp",
    duration: "18 months",
    teamSize: "12 developers",
    results: {
      userGrowth: "400%",
      performance: "60% faster",
      satisfaction: "4.9/5 rating"
    },
    testimonial: {
      text: "ZeusLabs transformed our entire banking infrastructure. The platform exceeded all expectations.",
      author: "Sarah Mitchell",
      role: "CTO, National Bank Corp"
    },
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS Lambda", "Docker", "Kubernetes"],
    challenges: ["Legacy system integration", "Real-time transaction processing", "Regulatory compliance", "Scalability"],
    solutions: ["Microservices architecture", "Event-driven design", "Advanced caching", "Auto-scaling infrastructure"],
    demoUrl: "#project-demo-financeflow",
    caseStudyUrl: "#project-case-study-financeflow",
    codeUrl: "#project-code-financeflow"
  },
  {
    id: 'secureshield',
    title: "SecureShield - Enterprise Security Suite",
    description: "Comprehensive cybersecurity platform protecting Fortune 500 companies with AI threat detection, automated response, and compliance management. Prevented 10M+ security incidents.",
    fullDescription: "Enterprise-grade security platform that provides real-time threat monitoring, automated incident response, and comprehensive compliance reporting for large organizations.",
    image: STOCK_IMAGES.services.cybersecurity.main,
    tags: ["Python", "Machine Learning", "Cybersecurity", "Real-time Analytics", "AI"],
    category: "Cybersecurity",
    featured: false,
    client: "Global Tech Inc",
    duration: "24 months",
    teamSize: "15 specialists",
    results: {
      threatsPrevented: "10M+",
      responseTime: "90% faster",
      compliance: "100% SOC2"
    },
    testimonial: {
      text: "SecureShield has become the backbone of our security infrastructure. Exceptional threat detection.",
      author: "Michael Chen",
      role: "CISO, Global Tech Inc"
    },
    technologies: ["Python", "TensorFlow", "Elasticsearch", "Kafka", "Redis", "Grafana", "Docker", "Kubernetes"],
    challenges: ["Real-time threat detection", "False positive reduction", "Scale handling", "Integration complexity"],
    solutions: ["ML-powered detection", "Behavioral analysis", "Cloud-native architecture", "API-first design"],
    demoUrl: "#project-demo-secureshield",
    caseStudyUrl: "#project-case-study-secureshield",
    codeUrl: "#project-code-secureshield"
  },
  {
    id: 'ecocommerce',
    title: "EcoCommerce - Sustainable Marketplace",
    description: "Next-generation e-commerce platform focused on sustainability with 500K+ eco-conscious users. Features carbon tracking, green shipping, and impact visualization.",
    fullDescription: "A revolutionary e-commerce platform that connects eco-conscious consumers with sustainable brands, featuring carbon footprint tracking and environmental impact visualization.",
    image: STOCK_IMAGES.projects.ecommerce.main,
    tags: ["Next.js", "Shopify", "Stripe", "MongoDB", "GraphQL", "PWA"],
    category: "Web Development",
    featured: true,
    client: "EcoVentures Ltd",
    duration: "14 months",
    teamSize: "10 developers",
    results: {
      conversion: "35% increase",
      userBase: "500K+ users",
      carbonSaved: "2M kg CO2"
    },
    testimonial: {
      text: "The platform perfectly captures our sustainability mission. User engagement has been phenomenal.",
      author: "Emma Green",
      role: "CEO, EcoVentures Ltd"
    },
    technologies: ["Next.js", "TypeScript", "Shopify API", "Stripe", "MongoDB", "GraphQL", "Vercel", "Cloudinary"],
    challenges: ["Complex inventory management", "Carbon calculation", "Payment processing", "Mobile optimization"],
    solutions: ["Headless commerce", "Real-time tracking", "Multi-gateway payments", "Progressive Web App"],
    demoUrl: "#project-demo-ecocommerce",
    caseStudyUrl: "#project-case-study-ecocommerce",
    codeUrl: "#project-code-ecocommerce"
  },
  {
    id: 'mythlands',
    title: "Mythlands - Fantasy MMORPG",
    description: "Epic multiplayer fantasy game with 2M+ players worldwide. Features immersive 3D world, guild systems, real-time PvP, and cross-platform compatibility.",
    fullDescription: "A massive multiplayer online role-playing game set in a fantasy world, featuring complex guild systems, real-time combat, and stunning 3D graphics.",
    image: STOCK_IMAGES.projects.gaming.main,
    tags: ["Unity", "C#", "Photon", "AWS GameLift", "Multiplayer", "3D Graphics"],
    category: "Game Development",
    featured: false,
    client: "Mystic Games Studio",
    duration: "36 months",
    teamSize: "25 developers",
    results: {
      players: "2M+ active",
      retention: "85% monthly",
      revenue: "R900M+ generated" // Revenue in South African Rands (ZAR)
    },
    testimonial: {
      text: "ZeusLabs brought our vision to life. The game's technical excellence is matched by its creativity.",
      author: "David Storm",
      role: "Creative Director, Mystic Games"
    },
    technologies: ["Unity 2022", "C#", "Photon Fusion", "AWS GameLift", "PlayFab", "Addressables", "Mirror"],
    challenges: ["Massive multiplayer scaling", "Cross-platform sync", "Real-time combat", "Anti-cheat systems"],
    solutions: ["Dedicated server architecture", "Client prediction", "Authoritative server", "ML-based detection"],
    demoUrl: "#project-demo-mythlands",
    caseStudyUrl: "#project-case-study-mythlands",
    codeUrl: "#project-code-mythlands"
  },
  {
    id: 'healthtrack',
    title: "HealthTrack - Medical Management System",
    description: "Comprehensive healthcare platform serving 50+ hospitals with patient management, telemedicine, AI diagnostics, and HIPAA compliance. Improved patient outcomes by 40%.",
    fullDescription: "An integrated healthcare management system that streamlines patient care, enables telemedicine consultations, and provides AI-powered diagnostic assistance.",
    image: STOCK_IMAGES.projects.healthcare.main,
    tags: ["React", "Python", "PostgreSQL", "AI/ML", "FHIR", "HIPAA"],
    category: "Software Development",
    featured: false,
    client: "MedCare Networks",
    duration: "20 months",
    teamSize: "18 specialists",
    results: {
      efficiency: "40% improvement",
      hospitals: "50+ facilities",
      patients: "1M+ records"
    },
    testimonial: {
      text: "HealthTrack has revolutionized our patient care delivery. The AI diagnostics are game-changing.",
      author: "Dr. Lisa Park",
      role: "Chief Medical Officer, MedCare"
    },
    technologies: ["React", "Python", "FastAPI", "PostgreSQL", "TensorFlow", "Redis", "Docker", "AWS"],
    challenges: ["HIPAA compliance", "System integration", "AI model accuracy", "Real-time processing"],
    solutions: ["End-to-end encryption", "HL7 FHIR standards", "Federated learning", "Event-driven architecture"],
    demoUrl: "#project-demo-healthtrack",
    caseStudyUrl: "#project-case-study-healthtrack",
    codeUrl: "#project-code-healthtrack"
  },
  {
    id: 'cyberwatch',
    title: "CyberWatch - Network Security Monitor",
    description: "Advanced network security monitoring system protecting critical infrastructure. Features AI-powered anomaly detection, automated threat response, and forensic analysis.",
    fullDescription: "A sophisticated network security monitoring solution that provides real-time threat detection and automated response for critical infrastructure protection.",
    image: STOCK_IMAGES.services.cybersecurity.security,
    tags: ["Python", "Elasticsearch", "ML", "Network Security", "SIEM", "Forensics"],
    category: "Cybersecurity",
    featured: false,
    client: "CriticalInfra Corp",
    duration: "16 months",
    teamSize: "12 security experts",
    results: {
      threatDetection: "99.5% accuracy",
      responseTime: "15 seconds",
      incidents: "95% reduction"
    },
    testimonial: {
      text: "CyberWatch has become our first line of defense. The AI detection capabilities are unmatched.",
      author: "James Rodriguez",
      role: "Security Director, CriticalInfra"
    },
    technologies: ["Python", "Elasticsearch", "Kibana", "Suricata", "YARA", "TensorFlow", "Apache Kafka"],
    challenges: ["High-volume data processing", "Real-time analysis", "False positive reduction", "Forensic capabilities"],
    solutions: ["Stream processing", "Machine learning models", "Behavioral analysis", "Immutable audit logs"],
    demoUrl: "#project-demo-cyberwatch",
    caseStudyUrl: "#project-case-study-cyberwatch",
    codeUrl: "#project-code-cyberwatch"
  },
  {
    id: 'learnsphere',
    title: "LearnSphere - Educational Platform",
    description: "Innovative EdTech platform serving 100K+ students with personalized learning paths, AI tutoring, virtual classrooms, and comprehensive analytics.",
    fullDescription: "A comprehensive educational technology platform that personalizes learning experiences through AI-powered tutoring and adaptive content delivery.",
    image: STOCK_IMAGES.projects.education.main,
    tags: ["Vue.js", "Node.js", "MongoDB", "AI/ML", "WebRTC", "Analytics"],
    category: "Web Development",
    featured: false,
    client: "EduTech Solutions",
    duration: "22 months",
    teamSize: "14 developers",
    results: {
      students: "100K+ active",
      engagement: "80% increase",
      performance: "45% improvement"
    },
    testimonial: {
      text: "LearnSphere has transformed how our students learn. The AI tutoring is incredibly effective.",
      author: "Maria Santos",
      role: "Academic Director, EduTech"
    },
    technologies: ["Vue.js", "Node.js", "MongoDB", "TensorFlow.js", "WebRTC", "Socket.io", "AWS", "Docker"],
    challenges: ["Personalization at scale", "Real-time collaboration", "Content delivery", "Progress tracking"],
    solutions: ["Adaptive algorithms", "WebRTC implementation", "CDN optimization", "Analytics pipeline"],
    demoUrl: "#project-demo-learnsphere",
    caseStudyUrl: "#project-case-study-learnsphere",
    codeUrl: "#project-code-learnsphere"
  },
  {
    id: 'spacerunner',
    title: "SpaceRunner - Mobile Racing Game",
    description: "High-octane space racing game with 5M+ downloads. Features stunning 3D graphics, multiplayer tournaments, customizable ships, and cross-platform play.",
    fullDescription: "An adrenaline-pumping space racing game that combines stunning visuals with competitive multiplayer gameplay across multiple platforms.",
    image: STOCK_IMAGES.projects.gaming.mobile,
    tags: ["Unity", "C#", "Multiplayer", "Mobile", "Cross-platform", "3D Graphics"],
    category: "Game Development",
    featured: false,
    client: "Velocity Games",
    duration: "18 months",
    teamSize: "16 developers",
    results: {
      downloads: "5M+",
      rating: "4.8/5 stars",
      revenue: "R270M+ earned" // Revenue in South African Rands (ZAR)
    },
    testimonial: {
      text: "SpaceRunner exceeded our wildest expectations. The technical execution is flawless.",
      author: "Alex Turner",
      role: "CEO, Velocity Games"
    },
    technologies: ["Unity 2022", "C#", "Photon Bolt", "Unity Netcode", "Addressables", "Unity Analytics"],
    challenges: ["Cross-platform optimization", "Network synchronization", "Performance on mobile", "Monetization integration"],
    solutions: ["Adaptive quality settings", "Client-server architecture", "LOD optimization", "In-app purchase system"],
    demoUrl: "#project-demo-spacerunner",
    caseStudyUrl: "#project-case-study-spacerunner",
    codeUrl: "#project-code-spacerunner"
  }
];

export const categoryColors = {
  "Web Development": "bg-green-500/10 text-green-600 border-green-500/20",
  "Cybersecurity": "bg-red-500/10 text-red-600 border-red-500/20",
  "Game Development": "bg-purple-500/10 text-purple-600 border-purple-500/20",
  "Software Development": "bg-blue-500/10 text-blue-600 border-blue-500/20"
};

export const categoryIcons = {
  "Web Development": "🌐",
  "Cybersecurity": "🛡️",
  "Game Development": "🎮",
  "Software Development": "💻"
};