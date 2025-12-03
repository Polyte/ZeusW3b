/**
 * Database Services
 * API-like layer for database operations using IndexedDB
 */

import { 
  query, 
  queryByIndex, 
  getById, 
  insert, 
  update, 
  deleteRecord, 
  initDatabase,
  STORES 
} from './sqlite';

// Ensure database is initialized
initDatabase().catch(console.error);

// Types
export interface BlogPost {
  id?: number;
  title: string;
  excerpt?: string;
  content: string;
  author: string;
  category?: string;
  image_url?: string;
  published_date: string;
  read_time?: number;
  created_at?: string;
}

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at?: string;
  status?: string;
}

export interface NewsletterSubscription {
  id?: number;
  email: string;
  subscribed_at?: string;
  status?: string;
}

export interface ServiceRequest {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_type: string;
  budget?: string;
  timeline?: string;
  description: string;
  created_at?: string;
  status?: string;
}

export interface ChatSession {
  id?: number;
  customer_name?: string;
  customer_email?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ChatMessage {
  id?: number;
  chat_id: number;
  sender: string;
  message: string;
  created_at?: string;
}

export interface Project {
  id?: number;
  title: string;
  description?: string;
  category?: string;
  client?: string;
  year?: number;
  image_url?: string;
  technologies?: string;
  case_study?: string;
  demo_url?: string;
  code_url?: string;
  budget?: string;
  duration?: string;
  created_at?: string;
}

// Blog Posts Services
export const BlogService = {
  getAll: async (): Promise<BlogPost[]> => {
    const posts = await query<BlogPost>(STORES.BLOG_POSTS);
    return posts.sort((a, b) => 
      new Date(b.published_date).getTime() - new Date(a.published_date).getTime()
    );
  },

  getById: async (id: number): Promise<BlogPost | null> => {
    return await getById<BlogPost>(STORES.BLOG_POSTS, id);
  },

  create: async (post: BlogPost): Promise<number> => {
    const data = {
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content,
      author: post.author,
      category: post.category || 'General',
      image_url: post.image_url || '',
      published_date: post.published_date,
      read_time: post.read_time || 5,
    };
    return await insert<BlogPost>(STORES.BLOG_POSTS, data);
  },

  update: async (id: number, post: Partial<BlogPost>): Promise<void> => {
    await update<BlogPost>(STORES.BLOG_POSTS, id, post);
  },

  delete: async (id: number): Promise<void> => {
    await deleteRecord(STORES.BLOG_POSTS, id);
  }
};

// Contact Messages Services
export const ContactService = {
  getAll: async (): Promise<ContactMessage[]> => {
    const messages = await query<ContactMessage>(STORES.CONTACT_MESSAGES);
    return messages.sort((a, b) => 
      new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    );
  },

  create: async (message: ContactMessage): Promise<number> => {
    const data = {
      name: message.name,
      email: message.email,
      subject: message.subject || '',
      message: message.message,
      status: message.status || 'new',
    };
    return await insert<ContactMessage>(STORES.CONTACT_MESSAGES, data);
  },

  updateStatus: async (id: number, status: string): Promise<void> => {
    await update<ContactMessage>(STORES.CONTACT_MESSAGES, id, { status });
  }
};

// Newsletter Services
export const NewsletterService = {
  getAll: async (): Promise<NewsletterSubscription[]> => {
    const subscriptions = await query<NewsletterSubscription>(STORES.NEWSLETTER_SUBSCRIPTIONS);
    return subscriptions.sort((a, b) => 
      new Date(b.subscribed_at || 0).getTime() - new Date(a.subscribed_at || 0).getTime()
    );
  },

  subscribe: async (email: string): Promise<number | null> => {
    try {
      const data = {
        email,
        status: 'active',
        subscribed_at: new Date().toISOString(),
      };
      return await insert<NewsletterSubscription>(STORES.NEWSLETTER_SUBSCRIPTIONS, data);
    } catch (error) {
      // Email already exists (unique constraint)
      console.error('Newsletter subscription error:', error);
      return null;
    }
  },

  unsubscribe: async (email: string): Promise<void> => {
    const subscriptions = await query<NewsletterSubscription>(STORES.NEWSLETTER_SUBSCRIPTIONS);
    const subscription = subscriptions.find(s => s.email === email);
    if (subscription && subscription.id) {
      await update<NewsletterSubscription>(STORES.NEWSLETTER_SUBSCRIPTIONS, subscription.id, { 
        status: 'unsubscribed' 
      });
    }
  }
};

// Service Requests Services
export const ServiceRequestService = {
  getAll: async (): Promise<ServiceRequest[]> => {
    const requests = await query<ServiceRequest>(STORES.SERVICE_REQUESTS);
    return requests.sort((a, b) => 
      new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    );
  },

  create: async (request: ServiceRequest): Promise<number> => {
    const data = {
      name: request.name,
      email: request.email,
      phone: request.phone || '',
      company: request.company || '',
      service_type: request.service_type,
      budget: request.budget || '',
      timeline: request.timeline || '',
      description: request.description,
      status: request.status || 'pending',
    };
    return await insert<ServiceRequest>(STORES.SERVICE_REQUESTS, data);
  },

  updateStatus: async (id: number, status: string): Promise<void> => {
    await update<ServiceRequest>(STORES.SERVICE_REQUESTS, id, { status });
  }
};

// Chat Services
export const ChatService = {
  createSession: async (customerName?: string, customerEmail?: string): Promise<number> => {
    const data = {
      customer_name: customerName || '',
      customer_email: customerEmail || '',
      status: 'active',
      updated_at: new Date().toISOString(),
    };
    return await insert<ChatSession>(STORES.CHAT_SESSIONS, data);
  },

  getSession: async (id: number): Promise<ChatSession | null> => {
    return await getById<ChatSession>(STORES.CHAT_SESSIONS, id);
  },

  getActiveSessions: async (): Promise<ChatSession[]> => {
    const sessions = await queryByIndex<ChatSession>(STORES.CHAT_SESSIONS, 'status', 'active');
    return sessions.sort((a, b) => 
      new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime()
    );
  },

  updateSession: async (id: number, updates: Partial<ChatSession>): Promise<void> => {
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString(),
    };
    await update<ChatSession>(STORES.CHAT_SESSIONS, id, updateData);
  },

  getMessages: async (chatId: number): Promise<ChatMessage[]> => {
    const messages = await queryByIndex<ChatMessage>(STORES.CHAT_MESSAGES, 'chat_id', chatId);
    return messages.sort((a, b) => 
      new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
    );
  },

  addMessage: async (chatId: number, sender: string, message: string): Promise<number> => {
    const data = {
      chat_id: chatId,
      sender,
      message,
    };
    const messageId = await insert<ChatMessage>(STORES.CHAT_MESSAGES, data);

    // Update session timestamp
    await update<ChatSession>(STORES.CHAT_SESSIONS, chatId, {
      updated_at: new Date().toISOString(),
    });

    return messageId;
  }
};

// Projects Services
export const ProjectService = {
  getAll: async (): Promise<Project[]> => {
    const projects = await query<Project>(STORES.PROJECTS);
    return projects.sort((a, b) => (b.year || 0) - (a.year || 0));
  },

  getById: async (id: number): Promise<Project | null> => {
    return await getById<Project>(STORES.PROJECTS, id);
  },

  create: async (project: Project): Promise<number> => {
    const data = {
      title: project.title,
      description: project.description || '',
      category: project.category || '',
      client: project.client || '',
      year: project.year || new Date().getFullYear(),
      image_url: project.image_url || '',
      technologies: project.technologies || '',
      case_study: project.case_study || '',
      demo_url: project.demo_url || '',
      code_url: project.code_url || '',
      budget: project.budget || '',
      duration: project.duration || '',
    };
    return await insert<Project>(STORES.PROJECTS, data);
  }
};
