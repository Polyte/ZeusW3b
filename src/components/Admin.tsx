import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { useState, useEffect } from "react";
import { 
  BlogService, 
  ChatService, 
  ServiceRequestService, 
  ContactService,
  NewsletterService
} from "../utils/database/services";
import { 
  Plus, 
  Send, 
  Trash, 
  MessageCircle, 
  Users, 
  Clock, 
  Settings, 
  FileText, 
  Briefcase, 
  Globe, 
  Home,
  Edit,
  Eye,
  BarChart3,
  Mail,
  Wrench,
  Image,
  Monitor,
  Phone,
  Calendar
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  slug: string;
  timestamp: string;
}

interface ChatSession {
  id: string;
  customerName: string;
  customerEmail: string;
  timestamp: string;
  status: string;
  lastMessage?: {
    message: string;
    sender: string;
    timestamp: string;
  } | null;
}

interface ServiceRequest {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  timestamp: string;
  status: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technology: string;
  category: string;
  image: string;
  demoUrl?: string;
  status: string;
}

export default function Admin() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    tags: ""
  });
  const [projectFormData, setProjectFormData] = useState({
    title: "",
    description: "",
    technology: "",
    category: "",
    image: "",
    demoUrl: "",
    status: "active"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPosts();
    fetchChats();
    fetchServiceRequests();
    fetchProjects();
    initializeSamplePosts();
    
    const dataInterval = setInterval(() => {
      fetchChats();
      fetchServiceRequests();
    }, 30000);
    return () => clearInterval(dataInterval);
  }, []);

  const fetchPosts = async () => {
    try {
      const dbPosts = await BlogService.getAll();
      const transformedPosts: BlogPost[] = dbPosts.map(post => ({
        id: post.id?.toString() || '',
        title: post.title,
        content: post.content,
        author: post.author,
        tags: post.category ? [post.category] : [],
        slug: post.title.toLowerCase().replace(/\s+/g, '-'),
        timestamp: post.published_date
      }));
      setPosts(transformedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchChats = async () => {
    try {
      const dbChats = await ChatService.getActiveSessions();
      const transformedChats: ChatSession[] = await Promise.all(dbChats.map(async chat => {
        const messages = await ChatService.getMessages(chat.id!);
        const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
        
        return {
          id: chat.id?.toString() || '',
          customerName: chat.customer_name || 'Anonymous',
          customerEmail: chat.customer_email || '',
          timestamp: chat.created_at || '',
          status: chat.status || 'active',
          lastMessage: lastMessage ? {
            message: lastMessage.message,
            sender: lastMessage.sender,
            timestamp: lastMessage.created_at || ''
          } : null
        };
      }));
      setChats(transformedChats);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const fetchServiceRequests = async () => {
    try {
      const dbRequests = await ServiceRequestService.getAll();
      const transformedRequests: ServiceRequest[] = dbRequests.map(req => ({
        id: req.id?.toString() || '',
        name: req.name,
        email: req.email,
        company: req.company || '',
        phone: req.phone || '',
        service: req.service_type.split(' - ')[0] || '',
        projectType: req.service_type.split(' - ')[1] || '',
        budget: req.budget || '',
        timeline: req.timeline || '',
        description: req.description,
        timestamp: req.created_at || '',
        status: req.status || 'pending'
      }));
      setServiceRequests(transformedRequests);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };

  const fetchProjects = async () => {
    // Mock projects data - in real implementation this would fetch from backend
    const mockProjects = [
      {
        id: "1",
        title: "E-commerce Platform",
        description: "Modern React-based e-commerce solution",
        technology: "React, Node.js, MongoDB",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
        demoUrl: "https://demo.example.com",
        status: "completed"
      },
      {
        id: "2",
        title: "Cybersecurity Dashboard",
        description: "Real-time security monitoring system",
        technology: "Vue.js, Python, PostgreSQL",
        category: "Cybersecurity",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
        status: "active"
      }
    ];
    setProjects(mockProjects);
  };

  const initializeSamplePosts = async () => {
    const samplePosts = [
      {
        title: "Building Scalable Web Applications in 2024",
        content: "As we move into 2024, the landscape of web development continues to evolve rapidly. At ZeusLabs, we've been observing key trends that are shaping how we build scalable, maintainable web applications.",
        author: "Alex Chen",
        tags: ["Web Development", "React", "Performance", "2024 Trends"]
      }
    ];

    try {
      const existingPosts = BlogService.getAll();
      if (existingPosts.length === 0) {
        for (const post of samplePosts) {
          BlogService.create({
            title: post.title,
            content: post.content,
            author: post.author,
            category: post.tags[0] || 'General',
            published_date: new Date().toISOString(),
            read_time: 5
          });
        }
        fetchPosts();
      }
    } catch (error) {
      console.error("Error initializing sample posts:", error);
    }
  };

  const createPost = async (postData = formData, shouldRefresh = true) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-62ba7f16/blog-posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          ...postData,
          tags: typeof postData.tags === 'string' ? postData.tags.split(',').map(t => t.trim()) : postData.tags
        })
      });

      if (response.ok && shouldRefresh) {
        setFormData({ title: "", content: "", author: "", tags: "" });
        fetchPosts();
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPost();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProjectInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectFormData(prev => ({ ...prev, [name]: value }));
  };

  const sidebarMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'pages', label: 'Page Management', icon: <FileText className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Wrench className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'blog', label: 'Blog Posts', icon: <Globe className="w-4 h-4" /> },
    { id: 'chat', label: 'Live Chat', icon: <MessageCircle className="w-4 h-4" /> },
    { id: 'forms', label: 'Form Submissions', icon: <Mail className="w-4 h-4" /> },
    { id: 'settings', label: 'Site Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">Manage all aspects of your ZeusLabs website</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Globe className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{posts.length}</div>
            <div className="text-sm text-muted-foreground">Blog Posts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Briefcase className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{projects.length}</div>
            <div className="text-sm text-muted-foreground">Projects</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageCircle className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{chats.length}</div>
            <div className="text-sm text-muted-foreground">Active Chats</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{serviceRequests.length}</div>
            <div className="text-sm text-muted-foreground">Service Requests</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {posts.slice(0, 5).map((post) => (
                <div key={post.id} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground text-sm">{post.title}</p>
                    <p className="text-xs text-muted-foreground">by {post.author}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Service Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {serviceRequests.slice(0, 5).map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground text-sm">{request.name}</p>
                    <p className="text-xs text-muted-foreground">{request.service}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {request.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPageManagement = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Page Management</h2>
        <p className="text-muted-foreground">Manage website pages and content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'Home Page', icon: <Home className="w-6 h-6" />, status: 'published' },
          { name: 'Services Page', icon: <Wrench className="w-6 h-6" />, status: 'published' },
          { name: 'Projects Page', icon: <Briefcase className="w-6 h-6" />, status: 'published' },
          { name: 'About Page', icon: <Users className="w-6 h-6" />, status: 'published' },
          { name: 'Blog Page', icon: <Globe className="w-6 h-6" />, status: 'published' },
          { name: 'Contact Page', icon: <Phone className="w-6 h-6" />, status: 'published' },
        ].map((page) => (
          <Card key={page.name}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-blue-500">{page.icon}</div>
                <Badge variant="outline" className="text-xs">
                  {page.status}
                </Badge>
              </div>
              <h3 className="font-semibold text-foreground mb-2">{page.name}</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProjectManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Project Management</h2>
          <p className="text-muted-foreground">Manage portfolio projects and case studies</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Project</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-foreground mb-1">Project Title</label>
                <Input
                  name="title"
                  value={projectFormData.title}
                  onChange={handleProjectInputChange}
                  placeholder="Enter project title"
                />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-1">Description</label>
                <Textarea
                  name="description"
                  value={projectFormData.description}
                  onChange={handleProjectInputChange}
                  placeholder="Project description"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-1">Technology Stack</label>
                <Input
                  name="technology"
                  value={projectFormData.technology}
                  onChange={handleProjectInputChange}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-1">Category</label>
                <Input
                  name="category"
                  value={projectFormData.category}
                  onChange={handleProjectInputChange}
                  placeholder="Web Development, Mobile App, etc."
                />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-1">Image URL</label>
                <Input
                  name="image"
                  value={projectFormData.image}
                  onChange={handleProjectInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <Button type="submit" className="w-full">
                Create Project
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Existing Projects ({projects.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {projects.map((project) => (
                <div key={project.id} className="border border-border/50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-foreground">{project.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                  <p className="text-xs text-muted-foreground mb-3">{project.technology}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderBlogManagement = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Blog Management</h2>
        <p className="text-muted-foreground">Create and manage blog posts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create New Post
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-foreground mb-1">Title</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Post title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-1">Author</label>
                <Input
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Author name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-1">Tags</label>
                <Input
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="tag1, tag2, tag3"
                />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-1">Content</label>
                <Textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Write your blog post content..."
                  rows={6}
                  required
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Creating..." : "Create Post"}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Published Posts ({posts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {posts.map((post) => (
                <div key={post.id} className="border border-border/50 rounded-lg p-4">
                  <h4 className="text-foreground mb-2 line-clamp-1">{post.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">by {post.author}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {new Date(post.timestamp).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderServiceManagement = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Service Management</h2>
        <p className="text-muted-foreground">Manage service offerings and pricing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'Software Development', icon: '💻', pricing: 'From R280,000', requests: 15 },
          { name: 'Web Development', icon: '🌐', pricing: 'From R150,000', requests: 22 },
          { name: 'Cybersecurity', icon: '🔒', pricing: 'From R220,000', requests: 8 },
          { name: 'Game Development', icon: '🎮', pricing: 'From R450,000', requests: 5 },
          { name: 'Cloud Solutions', icon: '☁️', pricing: 'From R180,000', requests: 12 },
          { name: 'Mobile Apps', icon: '📱', pricing: 'From R280,000', requests: 18 },
        ].map((service) => (
          <Card key={service.name}>
            <CardContent className="p-4">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">{service.icon}</div>
                <h3 className="font-semibold text-foreground">{service.name}</h3>
                <p className="text-sm text-muted-foreground">{service.pricing}</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-muted-foreground">Requests:</span>
                <Badge variant="outline">{service.requests}</Badge>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderFormSubmissions = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Form Submissions</h2>
        <p className="text-muted-foreground">Manage contact forms and service requests</p>
      </div>

      <Tabs defaultValue="service-requests" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="service-requests">Service Requests ({serviceRequests.length})</TabsTrigger>
          <TabsTrigger value="contact-forms">Contact Forms</TabsTrigger>
        </TabsList>

        <TabsContent value="service-requests" className="space-y-4">
          {serviceRequests.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No service requests yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {serviceRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-semibold text-foreground text-lg">{request.name}</div>
                        <div className="text-sm text-muted-foreground">{request.email}</div>
                        {request.company && (
                          <div className="text-sm text-muted-foreground">{request.company}</div>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs mb-2">
                          {request.status}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {new Date(request.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-sm font-medium text-foreground">Service</div>
                        <div className="text-sm text-muted-foreground">{request.service}</div>
                      </div>
                      {request.budget && (
                        <div>
                          <div className="text-sm font-medium text-foreground">Budget</div>
                          <div className="text-sm text-muted-foreground">{request.budget}</div>
                        </div>
                      )}
                      {request.timeline && (
                        <div>
                          <div className="text-sm font-medium text-foreground">Timeline</div>
                          <div className="text-sm text-muted-foreground">{request.timeline}</div>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-muted/20 rounded p-4 mb-4">
                      <div className="text-sm font-medium text-foreground mb-2">Description</div>
                      <p className="text-sm text-muted-foreground">{request.description}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Mail className="w-4 h-4 mr-2" />
                        Reply
                      </Button>
                      <Button size="sm" variant="outline">
                        Mark Reviewed
                      </Button>
                      {request.phone && (
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="contact-forms">
          <Card>
            <CardContent className="text-center py-8">
              <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">Contact form submissions will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderChatManagement = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Live Chat Management</h2>
        <p className="text-muted-foreground">Monitor and respond to customer chats</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{chats.length}</div>
            <div className="text-sm text-muted-foreground">Active Chats</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {chats.filter(chat => chat.lastMessage).length}
            </div>
            <div className="text-sm text-muted-foreground">With Messages</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {chats.filter(chat => 
                chat.lastMessage && 
                new Date(chat.lastMessage.timestamp) > new Date(Date.now() - 30 * 60 * 1000)
              ).length}
            </div>
            <div className="text-sm text-muted-foreground">Recent (30m)</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Chat Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {chats.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No active chats at the moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              {chats.map((chat) => (
                <div key={chat.id} className="border border-border/50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-semibold text-foreground">{chat.customerName}</div>
                      <div className="text-sm text-muted-foreground">{chat.customerEmail}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">{chat.status}</Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(chat.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  {chat.lastMessage && (
                    <div className="bg-muted/20 rounded p-3 text-sm mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">
                          {chat.lastMessage.sender === 'customer' ? 'Customer' : 'Support'}:
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(chat.lastMessage.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        {chat.lastMessage.message.length > 100 
                          ? chat.lastMessage.message.substring(0, 100) + "..." 
                          : chat.lastMessage.message}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      View Chat
                    </Button>
                    <Button size="sm" variant="outline">
                      Reply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Site Settings</h2>
        <p className="text-muted-foreground">Configure website settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm text-foreground mb-1">Site Title</label>
              <Input defaultValue="ZeusLabs" placeholder="Site title" />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-1">Tagline</label>
              <Input defaultValue="Innovative Software Solutions" placeholder="Site tagline" />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-1">Contact Email</label>
              <Input defaultValue="hello@zeuslabs.site" placeholder="Contact email" />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-1">Phone Number</label>
              <Input defaultValue="+27 726911 887" placeholder="Phone number" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground">Enable Live Chat</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground">Enable Blog Comments</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground">Enable Newsletter</label>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground">Maintenance Mode</label>
              <input type="checkbox" className="rounded" />
            </div>
            <Button>Update Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'pages':
        return renderPageManagement();
      case 'services':
        return renderServiceManagement();
      case 'projects':
        return renderProjectManagement();
      case 'blog':
        return renderBlogManagement();
      case 'chat':
        return renderChatManagement();
      case 'forms':
        return renderFormSubmissions();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
        <Sidebar className="border-r border-border/50">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                Z
              </div>
              <div>
                <h2 className="font-semibold text-foreground">ZeusLabs</h2>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {sidebarMenuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full justify-start gap-3 ${
                      activeSection === item.id ? 'bg-accent text-accent-foreground' : ''
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-4">
            <Button
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="w-full"
            >
              <Monitor className="w-4 h-4 mr-2" />
              View Site
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="border-b border-border/50 p-4">
            <div className="flex items-center justify-between">
              <SidebarTrigger className="md:hidden" />
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Last updated: {new Date().toLocaleString()}
                </span>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}