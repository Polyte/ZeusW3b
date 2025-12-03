import Blog from "../Blog";
import { motion } from "motion/react";

export default function BlogPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl mb-8 text-foreground font-bold tracking-tight leading-none"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Our Blog
            </h1>
            <p 
              className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed font-light"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Stay updated with the latest insights, tutorials, and industry news from our team of experts.
              Discover trends and best practices in technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Blog Section */}
      <Blog />
    </>
  );
}