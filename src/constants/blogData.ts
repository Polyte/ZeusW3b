import { STOCK_IMAGES } from './stockImages';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'future-of-ai-development',
    title: 'The Future of AI in Software Development',
    excerpt: 'Exploring how artificial intelligence is revolutionizing the way we build software, from automated code generation to intelligent debugging and testing.',
    content: `
      <p>Artificial Intelligence is transforming software development at an unprecedented pace. From automated code generation to intelligent debugging, AI is becoming an indispensable tool for developers worldwide.</p>
      
      <h2>AI-Powered Code Generation</h2>
      <p>Tools like GitHub Copilot and ChatGPT are enabling developers to write code faster and more efficiently. These AI assistants can generate entire functions, suggest optimizations, and even help with complex algorithms.</p>
      
      <h2>Intelligent Testing and Debugging</h2>
      <p>AI is revolutionizing how we test and debug applications. Machine learning models can predict potential bugs, generate test cases automatically, and identify performance bottlenecks before they become critical issues.</p>
      
      <h2>The Developer Experience</h2>
      <p>As AI tools become more sophisticated, the developer experience is becoming more intuitive and productive. However, this doesn't replace the need for skilled developers - it enhances their capabilities.</p>
    `,
    image: STOCK_IMAGES.blog.ai,
    author: {
      name: 'Dr. Sarah Chen',
      role: 'Lead AI Engineer',
      avatar: STOCK_IMAGES.testimonials.client2
    },
    publishedAt: '2024-01-15T10:00:00Z',
    readTime: '8 min',
    category: 'Technology',
    tags: ['AI', 'Machine Learning', 'Software Development', 'Automation'],
    featured: true
  },
  {
    id: 'cybersecurity-best-practices-2024',
    title: 'Cybersecurity Best Practices for 2024',
    excerpt: 'Essential security measures every organization should implement to protect against evolving cyber threats in the digital age.',
    content: `
      <p>As cyber threats become more sophisticated, organizations must stay ahead with robust security practices. Here are the essential measures for 2024.</p>
      
      <h2>Zero Trust Architecture</h2>
      <p>Implementing a zero-trust security model is crucial. Never trust, always verify - this principle should guide every security decision in your organization.</p>
      
      <h2>Multi-Factor Authentication</h2>
      <p>MFA is no longer optional. Implement strong authentication mechanisms across all systems and educate users on the importance of secure access practices.</p>
      
      <h2>Regular Security Audits</h2>
      <p>Conduct comprehensive security assessments regularly. Penetration testing and vulnerability assessments help identify weaknesses before attackers do.</p>
    `,
    image: STOCK_IMAGES.blog.security,
    author: {
      name: 'Michael Rodriguez',
      role: 'Cybersecurity Specialist',
      avatar: STOCK_IMAGES.testimonials.client5
    },
    publishedAt: '2024-01-12T14:30:00Z',
    readTime: '6 min',
    category: 'Security',
    tags: ['Cybersecurity', 'Zero Trust', 'MFA', 'Security Audits'],
    featured: true
  },
  {
    id: 'cloud-native-development-trends',
    title: 'Cloud-Native Development: Trends and Technologies',
    excerpt: 'Discover the latest trends in cloud-native development, including serverless computing, microservices, and container orchestration.',
    content: `
      <p>Cloud-native development has become the standard for modern applications. Understanding current trends and technologies is essential for staying competitive.</p>
      
      <h2>Serverless Computing</h2>
      <p>Serverless architectures allow developers to focus on code without managing infrastructure. AWS Lambda, Azure Functions, and Google Cloud Functions are leading this revolution.</p>
      
      <h2>Microservices Architecture</h2>
      <p>Breaking applications into smaller, manageable services improves scalability and maintainability. Learn how to design effective microservices architectures.</p>
      
      <h2>Container Orchestration</h2>
      <p>Kubernetes has become the de facto standard for container orchestration. Understanding its concepts and best practices is crucial for cloud-native success.</p>
    `,
    image: STOCK_IMAGES.blog.cloud,
    author: {
      name: 'Alex Thompson',
      role: 'Cloud Solutions Architect',
      avatar: STOCK_IMAGES.testimonials.client1
    },
    publishedAt: '2024-01-10T09:15:00Z',
    readTime: '7 min',
    category: 'Cloud',
    tags: ['Cloud Native', 'Serverless', 'Microservices', 'Kubernetes'],
    featured: false
  },
  {
    id: 'mobile-app-development-guide',
    title: 'Mobile App Development: Native vs Cross-Platform',
    excerpt: 'A comprehensive comparison of native and cross-platform mobile development approaches, helping you choose the right strategy for your project.',
    content: `
      <p>Choosing between native and cross-platform development is one of the most important decisions in mobile app development. Each approach has its advantages and trade-offs.</p>
      
      <h2>Native Development</h2>
      <p>Native apps offer the best performance and user experience but require separate codebases for iOS and Android. Tools like Swift/Objective-C for iOS and Kotlin/Java for Android provide deep platform integration.</p>
      
      <h2>Cross-Platform Solutions</h2>
      <p>Frameworks like React Native, Flutter, and Xamarin allow code sharing across platforms. While performance may be slightly lower, development efficiency is significantly higher.</p>
      
      <h2>Making the Right Choice</h2>
      <p>Consider factors like budget, timeline, team expertise, and app complexity when making your decision. Sometimes a hybrid approach works best.</p>
    `,
    image: STOCK_IMAGES.blog.mobile,
    author: {
      name: 'Emma Wilson',
      role: 'Mobile Development Lead',
      avatar: STOCK_IMAGES.testimonials.client4
    },
    publishedAt: '2024-01-08T16:45:00Z',
    readTime: '5 min',
    category: 'Mobile',
    tags: ['Mobile Development', 'React Native', 'Flutter', 'iOS', 'Android'],
    featured: false
  },
  {
    id: 'web-development-performance-optimization',
    title: 'Web Performance Optimization: Beyond the Basics',
    excerpt: 'Advanced techniques for optimizing web application performance, including code splitting, lazy loading, and efficient caching strategies.',
    content: `
      <p>Web performance directly impacts user experience and business metrics. Beyond basic optimizations, advanced techniques can significantly improve your application's speed.</p>
      
      <h2>Code Splitting and Lazy Loading</h2>
      <p>Implement dynamic imports and route-based code splitting to reduce initial bundle sizes. Load components and resources only when needed to improve perceived performance.</p>
      
      <h2>Advanced Caching Strategies</h2>
      <p>Leverage service workers, HTTP caching headers, and CDN configurations effectively. Implement cache invalidation strategies that balance performance with content freshness.</p>
      
      <h2>Resource Optimization</h2>
      <p>Optimize images with modern formats like WebP and AVIF. Use resource hints like preload and prefetch to improve critical resource loading.</p>
    `,
    image: STOCK_IMAGES.blog.development,
    author: {
      name: 'David Kim',
      role: 'Senior Full-Stack Developer',
      avatar: STOCK_IMAGES.testimonials.client3
    },
    publishedAt: '2024-01-05T11:20:00Z',
    readTime: '9 min',
    category: 'Web Development',
    tags: ['Performance', 'Code Splitting', 'Caching', 'Web Optimization'],
    featured: false
  },
  {
    id: 'future-of-technology-2024',
    title: 'Tech Predictions: What to Expect in 2024',
    excerpt: 'Our expert predictions for the most significant technology trends that will shape the industry in 2024 and beyond.',
    content: `
      <p>As we navigate through 2024, several technology trends are emerging that will significantly impact how we build and deploy software solutions.</p>
      
      <h2>AI Integration Everywhere</h2>
      <p>AI will become deeply integrated into every aspect of software development, from design to deployment. Expect to see more AI-powered development tools and intelligent automation.</p>
      
      <h2>Edge Computing Growth</h2>
      <p>Edge computing will continue to grow as IoT devices proliferate and latency requirements become more stringent. This will change how we architect distributed systems.</p>
      
      <h2>Sustainable Technology</h2>
      <p>Green computing and sustainable technology practices will become increasingly important. Organizations will focus on reducing their carbon footprint through efficient coding and infrastructure choices.</p>
    `,
    image: STOCK_IMAGES.blog.future,
    author: {
      name: 'Dr. Lisa Park',
      role: 'Technology Strategist',
      avatar: STOCK_IMAGES.testimonials.client6
    },
    publishedAt: '2024-01-03T13:10:00Z',
    readTime: '6 min',
    category: 'Innovation',
    tags: ['Tech Trends', 'AI', 'Edge Computing', 'Sustainability'],
    featured: true
  }
];

export const blogCategories = [
  { name: 'All', count: blogPosts.length },
  { name: 'Technology', count: blogPosts.filter(post => post.category === 'Technology').length },
  { name: 'Security', count: blogPosts.filter(post => post.category === 'Security').length },
  { name: 'Cloud', count: blogPosts.filter(post => post.category === 'Cloud').length },
  { name: 'Mobile', count: blogPosts.filter(post => post.category === 'Mobile').length },
  { name: 'Web Development', count: blogPosts.filter(post => post.category === 'Web Development').length },
  { name: 'Innovation', count: blogPosts.filter(post => post.category === 'Innovation').length }
];

export const featuredPosts = blogPosts.filter(post => post.featured);