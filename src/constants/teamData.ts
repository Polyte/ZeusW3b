import { STOCK_IMAGES } from './stockImages';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  expertise: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  featured: boolean;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'sarah-chen',
    name: 'Dr. Sarah Chen',
    role: 'Chief Technology Officer',
    bio: 'Leading our technical vision with 15+ years of experience in AI and machine learning. PhD in Computer Science from MIT, former lead engineer at Google.',
    image: STOCK_IMAGES.testimonials.client2,
    expertise: ['AI/ML', 'System Architecture', 'Leadership', 'Research'],
    social: {
      linkedin: 'https://linkedin.com/in/sarahchen',
      twitter: 'https://twitter.com/sarahchen_tech',
      github: 'https://github.com/sarahchen'
    },
    featured: true
  },
  {
    id: 'michael-rodriguez',
    name: 'Michael Rodriguez',
    role: 'Head of Cybersecurity',
    bio: 'Cybersecurity expert with 12+ years protecting enterprise systems. CISSP certified, specializes in threat detection and incident response.',
    image: STOCK_IMAGES.testimonials.client5,
    expertise: ['Cybersecurity', 'Threat Analysis', 'Compliance', 'Risk Management'],
    social: {
      linkedin: 'https://linkedin.com/in/michaelrodriguez',
      twitter: 'https://twitter.com/mike_security'
    },
    featured: true
  },
  {
    id: 'alex-thompson',
    name: 'Alex Thompson',
    role: 'Lead Cloud Architect',
    bio: 'Cloud solutions architect with expertise in AWS, Azure, and GCP. Passionate about scalable infrastructure and DevOps practices.',
    image: STOCK_IMAGES.testimonials.client1,
    expertise: ['Cloud Architecture', 'DevOps', 'Microservices', 'Infrastructure'],
    social: {
      linkedin: 'https://linkedin.com/in/alexthompson',
      github: 'https://github.com/alexthompson'
    },
    featured: true
  },
  {
    id: 'emma-wilson',
    name: 'Emma Wilson',
    role: 'Mobile Development Lead',
    bio: 'Mobile development specialist with 10+ years creating iOS and Android applications. Expert in React Native and Flutter frameworks.',
    image: STOCK_IMAGES.testimonials.client4,
    expertise: ['Mobile Development', 'React Native', 'Flutter', 'UI/UX'],
    social: {
      linkedin: 'https://linkedin.com/in/emmawilson',
      github: 'https://github.com/emmawilson'
    },
    featured: true
  },
  {
    id: 'david-kim',
    name: 'David Kim',
    role: 'Senior Full-Stack Developer',
    bio: 'Full-stack developer with expertise in modern web technologies. Specializes in React, Node.js, and database optimization.',
    image: STOCK_IMAGES.testimonials.client3,
    expertise: ['Full-Stack Development', 'React', 'Node.js', 'Database Design'],
    social: {
      linkedin: 'https://linkedin.com/in/davidkim',
      github: 'https://github.com/davidkim'
    },
    featured: false
  },
  {
    id: 'lisa-park',
    name: 'Dr. Lisa Park',
    role: 'Head of Innovation',
    bio: 'Innovation strategist with PhD in Computer Engineering. Focuses on emerging technologies and research partnerships with leading universities.',
    image: STOCK_IMAGES.testimonials.client6,
    expertise: ['Innovation Strategy', 'Research', 'Emerging Tech', 'Partnerships'],
    social: {
      linkedin: 'https://linkedin.com/in/lisapark',
      twitter: 'https://twitter.com/lisapark_tech'
    },
    featured: false
  }
];

export const companyStats = [
  { label: 'Years of Experience', value: '11+' },
  { label: 'Projects Completed', value: '200+' },
  { label: 'Team Members', value: '50+' },
  { label: 'Countries Served', value: '25+' },
  { label: 'Client Satisfaction', value: '98%' },
  { label: 'Awards Won', value: '15+' }
];

export const companyValues = [
  {
    title: 'Innovation First',
    description: 'We embrace cutting-edge technologies and methodologies to deliver solutions that are ahead of the curve.',
    icon: '🚀'
  },
  {
    title: 'Quality Excellence',
    description: 'Every line of code, every design decision, and every user interaction is crafted with meticulous attention to detail.',
    icon: '✨'
  },
  {
    title: 'Client Partnership',
    description: 'We build long-term relationships with our clients, understanding their business goals and growing together.',
    icon: '🤝'
  },
  {
    title: 'Continuous Learning',
    description: 'Our team continuously evolves, learning new technologies and methodologies to stay at the forefront of the industry.',
    icon: '📚'
  },
  {
    title: 'Ethical Practice',
    description: 'We maintain the highest standards of integrity, transparency, and ethical business practices in everything we do.',
    icon: '⚖️'
  },
  {
    title: 'Global Impact',
    description: 'We strive to create solutions that make a positive impact on businesses and communities worldwide.',
    icon: '🌍'
  }
];

export const milestones = [
  {
    year: '2013',
    title: 'Company Founded',
    description: 'ZeusLabs was established in Johannesburg with a vision to transform businesses through technology.'
  },
  {
    year: '2015',
    title: 'First Major Enterprise Client',
    description: 'Secured our first Fortune 500 client, marking our entry into enterprise-level solutions.'
  },
  {
    year: '2017',
    title: 'International Expansion',
    description: 'Expanded operations across Africa and established partnerships in Europe and North America.'
  },
  {
    year: '2019',
    title: 'AI & ML Division',
    description: 'Launched our dedicated AI and Machine Learning division, pioneering innovative solutions.'
  },
  {
    year: '2021',
    title: 'Cybersecurity Excellence',
    description: 'Achieved SOC 2 Type II certification and became a leading cybersecurity solutions provider.'
  },
  {
    year: '2023',
    title: 'Innovation Awards',
    description: 'Received multiple industry awards for innovation in software development and cybersecurity.'
  },
  {
    year: '2024',
    title: 'Next-Gen Solutions',
    description: 'Launched our next-generation platform services and expanded into emerging technologies.'
  }
];

export const featuredMembers = teamMembers.filter(member => member.featured);