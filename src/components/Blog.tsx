import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { BlogService, type BlogPost as DBBlogPost } from "../utils/database/services";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  slug: string;
  timestamp: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const dbPosts = await BlogService.getAll();
      
      // Transform database posts to component format
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
      console.error("Error fetching blog posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + "...";
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-64 mx-auto"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null; // Don't show blog section if no posts
  }

  return (
    <section className="py-16 bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4 text-foreground">
            Latest from ZeusLabs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our latest insights, project showcases, and industry thoughts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.slice(0, 6).map((post) => (
            <Card key={post.id} className="group border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(post.timestamp)}</span>
                  <span>•</span>
                  <Clock className="w-3 h-3" />
                  <span>{getReadingTime(post.content)} min read</span>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {truncateContent(post.content)}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-muted-foreground">
                    by {post.author}
                  </span>
                  <Button variant="ghost" size="sm" className="group-hover:text-primary">
                    Read More
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  );
}