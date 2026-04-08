import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { useState, useEffect, useRef } from "react";
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
  Calendar,
  LayoutGrid,
  Upload
} from "lucide-react";
import {
  fetchWorkItems,
  createWorkItem,
  deleteWorkItemRemote,
  uploadWorkGalleryFiles,
  parseGalleryInput,
  emitWorkPortfolioChange,
  resolveWorkMediaUrl,
  type WorkPortfolioItem,
} from "../utils/workApi";

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
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
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
  const [workItems, setWorkItems] = useState<WorkPortfolioItem[]>([]);
  const [workFormData, setWorkFormData] = useState({
    title: "",
    description: "",
    galleryRaw: "",
    video: "",
    url: "",
    clientName: "",
  });
  const [uploadedGalleryUrls, setUploadedGalleryUrls] = useState<string[]>([]);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const PROJECTS_STORAGE_KEY = "zeuslabs-admin-projects-v1";

  const refreshWorkItems = async () => {
    try {
      const items = await fetchWorkItems();
      setWorkItems(items);
    } catch {
      setWorkItems([]);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get("section");
    const allowed = [
      "dashboard",
      "pages",
      "services",
      "projects",
      "work",
      "blog",
      "chat",
      "forms",
      "settings",
    ];
    if (section && allowed.includes(section)) {
      setActiveSection(section);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    fetchChats();
    fetchServiceRequests();
    fetchProjects();
    void refreshWorkItems();
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

  const fetchProjects = () => {
    try {
      const raw = localStorage.getItem(PROJECTS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Project[];
        if (Array.isArray(parsed) && parsed.length) {
          setProjects(parsed);
          return;
        }
      }
    } catch {
      /* fall through */
    }
    const mockProjects: Project[] = [
      {
        id: "1",
        title: "E-commerce Platform",
        description: "Modern React-based e-commerce solution",
        technology: "React, Node.js, MongoDB",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
        demoUrl: "https://demo.example.com",
        status: "completed",
      },
      {
        id: "2",
        title: "Cybersecurity Dashboard",
        description: "Real-time security monitoring system",
        technology: "Vue.js, Python, PostgreSQL",
        category: "Cybersecurity",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
        status: "active",
      },
    ];
    setProjects(mockProjects);
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(mockProjects));
  };

  const persistProjects = (next: Project[]) => {
    setProjects(next);
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(next));
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

  const handleWorkInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setWorkFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGalleryBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    try {
      const urls = await uploadWorkGalleryFiles(files);
      setUploadedGalleryUrls((prev) => [...new Set([...prev, ...urls])]);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Is the API running? (npm run dev)");
    }
    e.target.value = "";
  };

  const handleWorkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workFormData.title.trim()) return;
    const fromText = parseGalleryInput(workFormData.galleryRaw);
    const gallery = [...new Set([...uploadedGalleryUrls, ...fromText])];
    try {
      await createWorkItem({
        title: workFormData.title.trim(),
        description: workFormData.description.trim(),
        gallery,
        video: workFormData.video.trim(),
        url: workFormData.url.trim(),
        clientName: workFormData.clientName.trim(),
      });
      setWorkFormData({
        title: "",
        description: "",
        galleryRaw: "",
        video: "",
        url: "",
        clientName: "",
      });
      setUploadedGalleryUrls([]);
      await refreshWorkItems();
      emitWorkPortfolioChange();
    } catch (err) {
      console.error(err);
      alert("Could not save. Start SQLite API: npm run dev");
    }
  };

  const sidebarMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'pages', label: 'Page Management', icon: <FileText className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Wrench className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'work', label: 'Our Work', icon: <LayoutGrid className="w-4 h-4" /> },
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <Card
          className="cursor-pointer transition-colors hover:bg-muted/40"
          role="button"
          tabIndex={0}
          onClick={() => setActiveSection("blog")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActiveSection("blog");
            }
          }}
        >
          <CardContent className="p-4 text-center">
            <Globe className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{posts.length}</div>
            <div className="text-sm text-muted-foreground">Blog Posts</div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-colors hover:bg-muted/40"
          role="button"
          tabIndex={0}
          onClick={() => setActiveSection("projects")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActiveSection("projects");
            }
          }}
        >
          <CardContent className="p-4 text-center">
            <Briefcase className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{projects.length}</div>
            <div className="text-sm text-muted-foreground">Projects</div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-colors hover:bg-muted/40"
          role="button"
          tabIndex={0}
          onClick={() => setActiveSection("work")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActiveSection("work");
            }
          }}
        >
          <CardContent className="p-4 text-center">
            <LayoutGrid className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{workItems.length}</div>
            <div className="text-sm text-muted-foreground">Our Work</div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-colors hover:bg-muted/40"
          role="button"
          tabIndex={0}
          onClick={() => setActiveSection("chat")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActiveSection("chat");
            }
          }}
        >
          <CardContent className="p-4 text-center">
            <MessageCircle className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{chats.length}</div>
            <div className="text-sm text-muted-foreground">Active Chats</div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-colors hover:bg-muted/40"
          role="button"
          tabIndex={0}
          onClick={() => setActiveSection("forms")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActiveSection("forms");
            }
          }}
        >
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
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => setActiveSection("blog")}
                      title="Edit in Blog Posts"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => window.open(`${window.location.origin}/#blog`, "_blank", "noopener,noreferrer")}
                      title="View site"
                    >
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
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {request.status}
                    </Badge>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => setActiveSection("forms")}
                    >
                      Open
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

  const openSitePage = (route: string) => {
    const url = `${window.location.origin}/#${route}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const renderPageManagement = () => {
    const sitePages = [
      { name: "Home Page", icon: <Home className="w-6 h-6" />, status: "published" as const, route: "home", editSection: "dashboard" },
      { name: "Services Page", icon: <Wrench className="w-6 h-6" />, status: "published" as const, route: "services", editSection: "services" },
      { name: "Projects Page", icon: <Briefcase className="w-6 h-6" />, status: "published" as const, route: "projects", editSection: "projects" },
      { name: "About Page", icon: <Users className="w-6 h-6" />, status: "published" as const, route: "about", editSection: "blog" },
      { name: "Blog Page", icon: <Globe className="w-6 h-6" />, status: "published" as const, route: "blog", editSection: "blog" },
      { name: "Contact Page", icon: <Phone className="w-6 h-6" />, status: "published" as const, route: "contact", editSection: "forms" },
    ];
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Page Management</h2>
          <p className="text-muted-foreground">Jump to a dashboard section or preview the live page.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sitePages.map((page) => (
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
                  <Button
                    size="sm"
                    variant="outline"
                    type="button"
                    onClick={() => setActiveSection(page.editSection)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    type="button"
                    onClick={() => openSitePage(page.route)}
                  >
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
  };

  const renderProjectManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Project Management</h2>
          <p className="text-muted-foreground">Manage portfolio projects and case studies</p>
        </div>
        <Button
          type="button"
          onClick={() =>
            document.getElementById("admin-add-project")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card id="admin-add-project">
          <CardHeader>
            <CardTitle>Add New Project</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (!projectFormData.title.trim()) return;
                const payload: Project = {
                  id: editingProjectId ?? crypto.randomUUID(),
                  title: projectFormData.title.trim(),
                  description: projectFormData.description.trim(),
                  technology: projectFormData.technology.trim(),
                  category: projectFormData.category.trim(),
                  image:
                    projectFormData.image.trim() ||
                    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
                  demoUrl: projectFormData.demoUrl.trim() || undefined,
                  status: projectFormData.status || "active",
                };
                if (editingProjectId) {
                  persistProjects(
                    projects.map((p) => (p.id === editingProjectId ? payload : p)),
                  );
                  setEditingProjectId(null);
                } else {
                  persistProjects([payload, ...projects]);
                }
                setProjectFormData({
                  title: "",
                  description: "",
                  technology: "",
                  category: "",
                  image: "",
                  demoUrl: "",
                  status: "active",
                });
              }}
            >
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
                {editingProjectId ? "Save project" : "Create project"}
              </Button>
              {editingProjectId && (
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setEditingProjectId(null);
                    setProjectFormData({
                      title: "",
                      description: "",
                      technology: "",
                      category: "",
                      image: "",
                      demoUrl: "",
                      status: "active",
                    });
                  }}
                >
                  Cancel edit
                </Button>
              )}
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
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      type="button"
                      onClick={() => {
                        setEditingProjectId(project.id);
                        setProjectFormData({
                          title: project.title,
                          description: project.description,
                          technology: project.technology,
                          category: project.category,
                          image: project.image,
                          demoUrl: project.demoUrl ?? "",
                          status: project.status,
                        });
                        document.getElementById("admin-add-project")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      type="button"
                      onClick={() => {
                        if (project.demoUrl) window.open(project.demoUrl, "_blank", "noopener,noreferrer");
                        else openSitePage("projects");
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      type="button"
                      onClick={() => {
                        if (editingProjectId === project.id) {
                          setEditingProjectId(null);
                          setProjectFormData({
                            title: "",
                            description: "",
                            technology: "",
                            category: "",
                            image: "",
                            demoUrl: "",
                            status: "active",
                          });
                        }
                        persistProjects(projects.filter((p) => p.id !== project.id));
                      }}
                    >
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

  const renderWorkPortfolioManagement = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Our Work</h2>
        <p className="text-muted-foreground">
          Stored in <strong className="text-foreground">SQLite</strong> (<code className="text-xs bg-muted px-1 rounded">data/zeuslabs.db</code>).
          Bulk-upload images to the server; you can still paste extra image URLs below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add work
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleWorkSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-foreground mb-1">Title</label>
                <Input
                  name="title"
                  value={workFormData.title}
                  onChange={handleWorkInputChange}
                  placeholder="Project or campaign name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-1">Client name</label>
                <Input
                  name="clientName"
                  value={workFormData.clientName}
                  onChange={handleWorkInputChange}
                  placeholder="Client or brand"
                />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-1">Description</label>
                <Textarea
                  name="description"
                  value={workFormData.description}
                  onChange={handleWorkInputChange}
                  placeholder="Short story, scope, results…"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-1">Gallery</label>
                <input
                  ref={galleryFileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  aria-hidden
                  onChange={handleGalleryBulkUpload}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mb-3"
                  onClick={() => galleryFileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload images (bulk)
                </Button>
                {uploadedGalleryUrls.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {uploadedGalleryUrls.map((u) => (
                      <div
                        key={u}
                        className="relative w-16 h-16 rounded-md border border-border overflow-hidden group"
                      >
                        <img src={resolveWorkMediaUrl(u)} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          className="absolute inset-0 bg-black/50 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() =>
                            setUploadedGalleryUrls((prev) => prev.filter((x) => x !== u))
                          }
                          aria-label="Remove image"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground mb-1">Optional extra URLs (one per line)</p>
                <Textarea
                  name="galleryRaw"
                  value={workFormData.galleryRaw}
                  onChange={handleWorkInputChange}
                  placeholder={"https://…/1.jpg\nhttps://…/2.jpg"}
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-1">Video</label>
                <Input
                  name="video"
                  value={workFormData.video}
                  onChange={handleWorkInputChange}
                  placeholder="MP4 URL, YouTube, or Vimeo link"
                />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-1">Project URL</label>
                <Input
                  name="url"
                  value={workFormData.url}
                  onChange={handleWorkInputChange}
                  placeholder="https://live-site.com"
                />
              </div>
              <Button type="submit" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Publish to Our Work
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Entries ({workItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[560px] overflow-y-auto pr-1">
              {workItems.length === 0 ? (
                <p className="text-sm text-muted-foreground">No items yet.</p>
              ) : (
                workItems.map((item) => (
                  <div
                    key={item.id}
                    className="border border-border/50 rounded-lg p-4 space-y-2"
                  >
                    <div className="flex justify-between gap-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {item.clientName || "—"} · {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="shrink-0"
                        onClick={async () => {
                          try {
                            await deleteWorkItemRemote(item.id);
                            await refreshWorkItems();
                            emitWorkPortfolioChange();
                          } catch {
                            alert("Delete failed. Is the API running?");
                          }
                        }}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {item.gallery.length > 0 && (
                        <Badge variant="outline">{item.gallery.length} images</Badge>
                      )}
                      {item.video && <Badge variant="outline">Video</Badge>}
                      {item.url && <Badge variant="outline">Link</Badge>}
                    </div>
                  </div>
                ))
              )}
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
          { name: "Software Development", icon: "💻", pricing: "From R280,000", requests: 15, route: "service-software-development" },
          { name: "Web Development", icon: "🌐", pricing: "From R150,000", requests: 22, route: "service-web-development" },
          { name: "Cybersecurity", icon: "🔒", pricing: "From R220,000", requests: 8, route: "service-cybersecurity" },
          { name: "Game Development", icon: "🎮", pricing: "From R450,000", requests: 5, route: "service-game-development" },
          { name: "Cloud Solutions", icon: "☁️", pricing: "From R180,000", requests: 12, route: "service-cloud-solutions" },
          { name: "Mobile Apps", icon: "📱", pricing: "From R280,000", requests: 18, route: "service-mobile-apps" },
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
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => openSitePage("services")}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Services hub
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => openSitePage(service.route)}
                >
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
              <Input defaultValue="info@zeuslabs.co.za" placeholder="Contact email" />
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
      case 'work':
        return renderWorkPortfolioManagement();
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
              type="button"
              onClick={() => {
                window.location.href = `${window.location.origin}/#/home`;
              }}
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