import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Middleware
app.use("*", cors());
app.use("*", logger(console.log));

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Contact form submission endpoint
app.post("/make-server-62ba7f16/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, service, message } = body;

    if (!name || !email || !message) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Generate unique ID for the contact submission
    const contactId = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    // Store contact submission
    await kv.set(`contact:${contactId}`, {
      id: contactId,
      name,
      email,
      service: service || "General Inquiry",
      message,
      timestamp,
      status: "new"
    });

    // Also store in a list for easy retrieval
    const existingContacts = await kv.get("contact_list") || [];
    existingContacts.push(contactId);
    await kv.set("contact_list", existingContacts);

    console.log(`New contact submission from ${email}: ${contactId}`);
    
    return c.json({ 
      success: true, 
      message: "Contact form submitted successfully",
      id: contactId 
    });
  } catch (error) {
    console.log(`Error processing contact form: ${error}`);
    return c.json({ error: "Failed to submit contact form" }, 500);
  }
});

// Get all contact submissions (for admin purposes)
app.get("/make-server-62ba7f16/contacts", async (c) => {
  try {
    const contactList = await kv.get("contact_list") || [];
    const contacts = [];

    for (const contactId of contactList.reverse()) {
      const contact = await kv.get(`contact:${contactId}`);
      if (contact) {
        contacts.push(contact);
      }
    }

    return c.json({ contacts });
  } catch (error) {
    console.log(`Error retrieving contacts: ${error}`);
    return c.json({ error: "Failed to retrieve contacts" }, 500);
  }
});

// Blog posts endpoints
app.post("/make-server-62ba7f16/blog-posts", async (c) => {
  try {
    const body = await c.req.json();
    const { title, content, author, tags } = body;

    if (!title || !content || !author) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    const postId = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const blogPost = {
      id: postId,
      title,
      content,
      author,
      tags: tags || [],
      slug,
      timestamp,
      published: true
    };

    await kv.set(`blog:${postId}`, blogPost);

    // Update blog list
    const existingPosts = await kv.get("blog_list") || [];
    existingPosts.push(postId);
    await kv.set("blog_list", existingPosts);

    console.log(`New blog post created: ${title} by ${author}`);
    
    return c.json({ success: true, post: blogPost });
  } catch (error) {
    console.log(`Error creating blog post: ${error}`);
    return c.json({ error: "Failed to create blog post" }, 500);
  }
});

app.get("/make-server-62ba7f16/blog-posts", async (c) => {
  try {
    const blogList = await kv.get("blog_list") || [];
    const posts = [];

    for (const postId of blogList.reverse()) {
      const post = await kv.get(`blog:${postId}`);
      if (post && post.published) {
        posts.push(post);
      }
    }

    return c.json({ posts });
  } catch (error) {
    console.log(`Error retrieving blog posts: ${error}`);
    return c.json({ error: "Failed to retrieve blog posts" }, 500);
  }
});

app.get("/make-server-62ba7f16/blog-posts/:slug", async (c) => {
  try {
    const slug = c.req.param("slug");
    const blogList = await kv.get("blog_list") || [];
    
    for (const postId of blogList) {
      const post = await kv.get(`blog:${postId}`);
      if (post && post.slug === slug && post.published) {
        return c.json({ post });
      }
    }

    return c.json({ error: "Blog post not found" }, 404);
  } catch (error) {
    console.log(`Error retrieving blog post: ${error}`);
    return c.json({ error: "Failed to retrieve blog post" }, 500);
  }
});

// Newsletter subscription endpoint
app.post("/make-server-62ba7f16/newsletter", async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;

    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    // Check if already subscribed
    const existing = await kv.get(`newsletter:${email}`);
    if (existing) {
      return c.json({ message: "Email already subscribed" });
    }

    const timestamp = new Date().toISOString();
    await kv.set(`newsletter:${email}`, {
      email,
      timestamp,
      status: "active"
    });

    // Update newsletter list
    const existingList = await kv.get("newsletter_list") || [];
    existingList.push(email);
    await kv.set("newsletter_list", existingList);

    console.log(`New newsletter subscription: ${email}`);
    
    return c.json({ success: true, message: "Successfully subscribed to newsletter" });
  } catch (error) {
    console.log(`Error processing newsletter subscription: ${error}`);
    return c.json({ error: "Failed to subscribe to newsletter" }, 500);
  }
});

// Chat endpoints
app.post("/make-server-62ba7f16/chat/start", async (c) => {
  try {
    const body = await c.req.json();
    const { customerName, customerEmail } = body;

    if (!customerName || !customerEmail) {
      return c.json({ error: "Customer name and email are required" }, 400);
    }

    // Generate unique chat session ID
    const chatId = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    // Create chat session
    await kv.set(`chat:${chatId}`, {
      id: chatId,
      customerName,
      customerEmail,
      timestamp,
      status: "active",
      messages: []
    });

    // Add to active chats list
    const activeChats = await kv.get("active_chats") || [];
    activeChats.push(chatId);
    await kv.set("active_chats", activeChats);

    console.log(`New chat session started: ${chatId} for ${customerEmail}`);
    
    return c.json({ 
      success: true, 
      chatId,
      message: "Chat session started successfully"
    });
  } catch (error) {
    console.log(`Error starting chat session: ${error}`);
    return c.json({ error: "Failed to start chat session" }, 500);
  }
});

app.post("/make-server-62ba7f16/chat/:chatId/message", async (c) => {
  try {
    const chatId = c.req.param("chatId");
    const body = await c.req.json();
    const { message, sender, senderName } = body;

    if (!message || !sender) {
      return c.json({ error: "Message and sender are required" }, 400);
    }

    // Get existing chat
    const chat = await kv.get(`chat:${chatId}`);
    if (!chat) {
      return c.json({ error: "Chat session not found" }, 404);
    }

    // Create message object
    const newMessage = {
      id: crypto.randomUUID(),
      message,
      sender, // "customer" or "support"
      senderName: senderName || (sender === "customer" ? chat.customerName : "ZeusLabs Support"),
      timestamp: new Date().toISOString()
    };

    // Add message to chat
    chat.messages.push(newMessage);
    await kv.set(`chat:${chatId}`, chat);

    console.log(`New message in chat ${chatId}: ${message}`);
    
    return c.json({ 
      success: true, 
      message: newMessage
    });
  } catch (error) {
    console.log(`Error sending message: ${error}`);
    return c.json({ error: "Failed to send message" }, 500);
  }
});

app.get("/make-server-62ba7f16/chat/:chatId/messages", async (c) => {
  try {
    const chatId = c.req.param("chatId");

    // Get chat session
    const chat = await kv.get(`chat:${chatId}`);
    if (!chat) {
      return c.json({ error: "Chat session not found" }, 404);
    }

    return c.json({ 
      messages: chat.messages,
      chatInfo: {
        customerName: chat.customerName,
        customerEmail: chat.customerEmail,
        status: chat.status
      }
    });
  } catch (error) {
    console.log(`Error retrieving messages: ${error}`);
    return c.json({ error: "Failed to retrieve messages" }, 500);
  }
});

app.get("/make-server-62ba7f16/chat/active", async (c) => {
  try {
    const activeChats = await kv.get("active_chats") || [];
    const chats = [];

    for (const chatId of activeChats) {
      const chat = await kv.get(`chat:${chatId}`);
      if (chat) {
        chats.push({
          id: chat.id,
          customerName: chat.customerName,
          customerEmail: chat.customerEmail,
          timestamp: chat.timestamp,
          status: chat.status,
          lastMessage: chat.messages[chat.messages.length - 1] || null
        });
      }
    }

    return c.json({ chats });
  } catch (error) {
    console.log(`Error retrieving active chats: ${error}`);
    return c.json({ error: "Failed to retrieve active chats" }, 500);
  }
});

// Service request endpoint
app.post("/make-server-62ba7f16/service-request", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, company, phone, service, projectType, budget, timeline, description } = body;

    if (!name || !email || !service || !description) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Generate unique ID for the service request
    const requestId = crypto.randomUUID();
    const timestamp = new Date().toISOString();

    // Store service request
    await kv.set(`service_request:${requestId}`, {
      id: requestId,
      name,
      email,
      company: company || "",
      phone: phone || "",
      service,
      projectType: projectType || "",
      budget: budget || "",
      timeline: timeline || "",
      description,
      timestamp,
      status: "new"
    });

    // Also store in a list for easy retrieval
    const existingRequests = await kv.get("service_request_list") || [];
    existingRequests.push(requestId);
    await kv.set("service_request_list", existingRequests);

    console.log(`New service request for ${service} from ${email}: ${requestId}`);
    
    return c.json({ 
      success: true, 
      message: "Service request submitted successfully",
      id: requestId 
    });
  } catch (error) {
    console.log(`Error processing service request: ${error}`);
    return c.json({ error: "Failed to submit service request" }, 500);
  }
});

// Get all service requests (for admin purposes)
app.get("/make-server-62ba7f16/service-requests", async (c) => {
  try {
    const requestList = await kv.get("service_request_list") || [];
    const requests = [];

    for (const requestId of requestList.reverse()) {
      const request = await kv.get(`service_request:${requestId}`);
      if (request) {
        requests.push(request);
      }
    }

    return c.json({ requests });
  } catch (error) {
    console.log(`Error retrieving service requests: ${error}`);
    return c.json({ error: "Failed to retrieve service requests" }, 500);
  }
});

// Health check endpoint
app.get("/make-server-62ba7f16/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// DeepSeek (OpenAI-compatible) proxy for production chat — set DEEPSEEK_API_KEY in Supabase Edge secrets
app.post("/make-server-62ba7f16/chat/ai", async (c) => {
  const apiKey = Deno.env.get("DEEPSEEK_API_KEY");
  if (!apiKey) {
    return c.json(
      { error: { message: "DEEPSEEK_API_KEY is not configured on the server" } },
      503,
    );
  }

  try {
    const body = await c.req.json();
    const { messages, model, temperature, max_tokens } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return c.json({ error: { message: "messages array is required" } }, 400);
    }

    const upstream = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: typeof model === "string" && model.length ? model : "deepseek-chat",
        messages,
        temperature: typeof temperature === "number" ? temperature : 0.6,
        max_tokens: typeof max_tokens === "number" ? max_tokens : 1024,
      }),
    });

    const data = await upstream.json();
    return c.json(data, upstream.ok ? 200 : 502);
  } catch (error) {
    console.log(`DeepSeek proxy error: ${error}`);
    return c.json({ error: { message: "AI request failed" } }, 500);
  }
});

Deno.serve(app.fetch);