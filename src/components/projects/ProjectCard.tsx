import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Eye, Download, Github, Star, Calendar, Users } from "lucide-react";
import { CardImage } from "../StockImage";
import { motion } from "motion/react";
import { categoryColors, categoryIcons } from "../../constants/projectsData";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: keyof typeof categoryColors;
  featured: boolean;
  client: string;
  duration: string;
  teamSize: string;
  results: Record<string, string>;
  testimonial: {
    text: string;
    author: string;
    role: string;
  };
  demoUrl: string;
  caseStudyUrl: string;
  codeUrl: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={project.featured ? "lg:col-span-2 xl:col-span-2" : ""}
    >
      <Card className="group overflow-hidden border-2 border-border/50 hover:border-primary/30 hover:shadow-2xl transition-all duration-500 h-full">
        <div className={`${project.featured ? 'grid lg:grid-cols-2 gap-0 h-full' : 'flex flex-col h-full'}`}>
          {/* Image Section */}
          <div className="relative overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <CardImage
                src={project.image}
                alt={project.title}
                className={`w-full group-hover:scale-110 transition-transform duration-700 ${project.featured ? 'h-80 lg:h-full' : 'h-56'}`}
                width={800}
                height={project.featured ? 600 : 400}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <Badge className={`${categoryColors[project.category]} border backdrop-blur-sm font-medium`}>
                <span className="mr-1">{categoryIcons[project.category]}</span>
                {project.category}
              </Badge>
            </div>
            
            {/* Featured badge */}
            {project.featured && (
              <div className="absolute top-4 right-4">
                <motion.div
                  className="flex items-center px-3 py-1 bg-gradient-to-r from-primary/90 to-primary/70 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Featured
                </motion.div>
              </div>
            )}

            {/* Quick stats overlay */}
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex justify-between items-end">
                <div className="flex space-x-4 text-white text-xs">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {project.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {project.teamSize}
                  </div>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
                  {project.client}
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <CardContent className={`p-6 flex flex-col justify-between ${project.featured ? 'lg:p-8' : 'flex-1'}`}>
            <div className="flex-1">
              <h3 
                className={`${project.featured ? 'text-2xl lg:text-3xl' : 'text-xl'} font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300`}
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                {project.title}
              </h3>
              
              <p 
                className={`text-muted-foreground mb-4 leading-relaxed font-light ${project.featured ? 'text-base' : 'text-sm'}`}
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                {project.description}
              </p>

              {/* Results Section for featured projects */}
              {project.featured && (
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-accent/10 to-primary/5 border border-border/30">
                  <h4 
                    className="text-sm font-semibold text-foreground mb-3"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    Key Results
                  </h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {Object.entries(project.results).map(([key, value], idx) => (
                      <div key={idx}>
                        <div 
                          className="text-lg font-bold text-primary"
                          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                        >
                          {value}
                        </div>
                        <div 
                          className="text-xs text-muted-foreground capitalize"
                          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                        >
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonial for featured projects */}
              {project.featured && project.testimonial && (
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-muted/30 to-accent/10 border-l-4 border-primary/30">
                  <p 
                    className="text-sm italic text-muted-foreground mb-2 font-light"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    "{project.testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-primary/20 rounded-full mr-2"></div>
                    <div>
                      <div 
                        className="text-xs font-medium text-foreground"
                        style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                      >
                        {project.testimonial.author}
                      </div>
                      <div 
                        className="text-xs text-muted-foreground"
                        style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                      >
                        {project.testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.slice(0, project.featured ? 8 : 4).map((tag, idx) => (
                  <Badge 
                    key={idx} 
                    variant="outline" 
                    className="text-xs px-2 py-1 bg-background/50 hover:bg-accent/50 transition-colors border-border/50"
                  >
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > (project.featured ? 8 : 4) && (
                  <Badge 
                    variant="outline" 
                    className="text-xs px-2 py-1 bg-muted/30 text-muted-foreground"
                  >
                    +{project.tags.length - (project.featured ? 8 : 4)} more
                  </Badge>
                )}
              </div>
            </div>
            
            <div className={`grid ${project.featured ? 'grid-cols-3' : 'grid-cols-2'} gap-2`}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => window.location.hash = project.demoUrl.substring(1)}
                  variant="outline" 
                  size="sm" 
                  className="w-full group/btn border-2 hover:bg-accent/50 hover:border-primary/30 transition-all duration-300"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  <Eye className="w-3 h-3 mr-1 group-hover/btn:scale-110 transition-transform" />
                  Demo
                </Button>
              </motion.div>
              
              {project.featured && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => window.location.hash = project.caseStudyUrl.substring(1)}
                    variant="outline" 
                    size="sm" 
                    className="w-full group/btn border-2 hover:bg-accent/50 hover:border-primary/30 transition-all duration-300"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    <Download className="w-3 h-3 mr-1 group-hover/btn:scale-110 transition-transform" />
                    Case Study
                  </Button>
                </motion.div>
              )}
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => window.location.hash = project.codeUrl.substring(1)}
                  variant="outline" 
                  size="sm" 
                  className="w-full group/btn border-2 hover:bg-accent/50 hover:border-primary/30 transition-all duration-300"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  <Github className="w-3 h-3 mr-1 group-hover/btn:scale-110 transition-transform" />
                  Code
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}