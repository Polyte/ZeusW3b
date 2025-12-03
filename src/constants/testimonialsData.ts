import { STOCK_IMAGES } from './stockImages';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  projectType: string;
  featured: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 'sarah-mitchell',
    name: 'Sarah Mitchell',
    role: 'Chief Technology Officer',
    company: 'National Bank Corp',
    content: 'ZeusLabs transformed our entire banking infrastructure. The platform they built exceeded all our expectations in terms of performance, security, and user experience. Our customer satisfaction scores have improved by 300% since the launch.',
    rating: 5,
    image: STOCK_IMAGES.testimonials.client2,
    projectType: 'Fintech Platform',
    featured: true
  },
  {
    id: 'michael-chen',
    name: 'Michael Chen',
    role: 'Chief Information Security Officer',
    company: 'Global Tech Inc',
    content: 'SecureShield has become the backbone of our security infrastructure. The AI-powered threat detection has prevented countless security incidents. ZeusLabs\' expertise in cybersecurity is unmatched in the industry.',
    rating: 5,
    image: STOCK_IMAGES.testimonials.client5,
    projectType: 'Cybersecurity Solution',
    featured: true
  },
  {
    id: 'emma-green',
    name: 'Emma Green',
    role: 'Chief Executive Officer',
    company: 'EcoVentures Ltd',
    content: 'The e-commerce platform ZeusLabs built perfectly captures our sustainability mission. The carbon tracking features and user engagement have been phenomenal. Our sales increased by 250% in the first year.',
    rating: 5,
    image: STOCK_IMAGES.testimonials.client4,
    projectType: 'E-commerce Platform',
    featured: true
  },
  {
    id: 'david-storm',
    name: 'David Storm',
    role: 'Creative Director',
    company: 'Mystic Games Studio',
    content: 'ZeusLabs brought our gaming vision to life with incredible technical excellence. The multiplayer architecture they built scales beautifully, and the game\'s performance is outstanding. We couldn\'t be happier with the results.',
    rating: 5,
    image: STOCK_IMAGES.testimonials.client1,
    projectType: 'Game Development',
    featured: true
  },
  {
    id: 'lisa-park',
    name: 'Dr. Lisa Park',
    role: 'Chief Medical Officer',
    company: 'MedCare Networks',
    content: 'HealthTrack has revolutionized our patient care delivery. The AI diagnostics and telemedicine features have improved our efficiency by 40%. ZeusLabs understood our complex healthcare requirements perfectly.',
    rating: 5,
    image: STOCK_IMAGES.testimonials.client6,
    projectType: 'Healthcare Platform',
    featured: false
  },
  {
    id: 'james-rodriguez',
    name: 'James Rodriguez',
    role: 'Security Director',
    company: 'CriticalInfra Corp',
    content: 'CyberWatch has become our first line of defense against cyber threats. The real-time monitoring and automated response capabilities are incredible. We\'ve seen a 95% reduction in security incidents.',
    rating: 5,
    image: STOCK_IMAGES.testimonials.client3,
    projectType: 'Security Monitoring',
    featured: false
  },
  {
    id: 'maria-santos',
    name: 'Maria Santos',
    role: 'Academic Director',
    company: 'EduTech Solutions',
    content: 'LearnSphere has transformed how our students learn. The AI-powered personalization and virtual classrooms have increased student engagement by 80%. The platform is intuitive and powerful.',
    rating: 5,
    image: STOCK_IMAGES.testimonials.client2,
    projectType: 'EdTech Platform',
    featured: false
  },
  {
    id: 'alex-turner',
    name: 'Alex Turner',
    role: 'Chief Executive Officer',
    company: 'Velocity Games',
    content: 'SpaceRunner exceeded our wildest expectations. The technical execution is flawless, and the cross-platform optimization is remarkable. We\'ve achieved over 5 million downloads thanks to ZeusLabs\' expertise.',
    rating: 5,
    image: STOCK_IMAGES.testimonials.client1,
    projectType: 'Mobile Game',
    featured: false
  },
  {
    id: 'rachel-adams',
    name: 'Rachel Adams',
    role: 'Head of Digital Innovation',
    company: 'RetailMax',
    content: 'The e-commerce solution ZeusLabs developed has transformed our online presence. The performance optimizations and user experience improvements led to a 180% increase in conversion rates.',
    rating: 5,
    image: STOCK_IMAGES.testimonials.client4,
    projectType: 'E-commerce Optimization',
    featured: false
  },
  {
    id: 'thomas-wright',
    name: 'Thomas Wright',
    role: 'IT Director',
    company: 'LogiFlow Systems',
    content: 'The logistics management platform built by ZeusLabs has streamlined our entire supply chain. Real-time tracking and AI-powered routing have reduced our operational costs by 30%.',
    rating: 5,
    image: STOCK_IMAGES.testimonials.client5,
    projectType: 'Logistics Platform',
    featured: false
  }
];

export const testimonialCategories = [
  'All',
  'Fintech Platform',
  'Cybersecurity Solution',
  'E-commerce Platform',
  'Game Development',
  'Healthcare Platform',
  'Security Monitoring',
  'EdTech Platform',
  'Mobile Game',
  'E-commerce Optimization',
  'Logistics Platform'
];

export const featuredTestimonials = testimonials.filter(testimonial => testimonial.featured);

export const testimonialStats = {
  totalClients: testimonials.length,
  averageRating: 5.0,
  satisfaction: '98%',
  repeatClients: '85%'
};