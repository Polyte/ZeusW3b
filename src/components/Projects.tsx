import { Button } from "./ui/button";
import { Eye, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { projects } from "../constants/projectsData";
import ProjectCard from "./projects/ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-background to-accent/5 pt-[10px] pr-[0px] pb-[0px] pl-[0px] rounded-tl-[40px] rounded-tr-[0px] rounded-bl-[0px] rounded-br-[0px] bg-[rgba(134,139,139,0.19.05.66.6.0 bg-[rgba(134,139,139,0.06)]3)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full mb-6"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.2)"
            }}
          >
            <Eye className="w-4 h-4 text-primary mr-2 animate-pulse" />
            <span 
              className="text-sm font-medium text-primary tracking-wider"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Our Portfolio
            </span>
          </motion.div>
          <h2 
            className="text-4xl md:text-6xl mb-6 text-foreground font-bold tracking-tight"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            Featured Projects
          </h2>
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            Explore our portfolio of successful projects across different industries and technologies, 
            showcasing our expertise and commitment to delivering exceptional results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg" 
              className="btn-gradient-purple transition-all duration-300 h-14 px-12 text-lg font-medium tracking-wide"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              View All Projects
              <TrendingUp className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}