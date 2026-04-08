import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingChat from "./components/FloatingChat";
import Admin from "./components/Admin";
import HomePage from "./components/pages/HomePage";
import ServicesPage from "./components/pages/ServicesPage";
import ProjectsPage from "./components/pages/ProjectsPage";
import AboutPage from "./components/pages/AboutPage";
import BlogPage from "./components/pages/BlogPage";
import ContactPage from "./components/pages/ContactPage";
import ProjectDemo from "./components/projects/ProjectDemo";
import ProjectCaseStudy from "./components/projects/ProjectCaseStudy";
import ProjectCode from "./components/projects/ProjectCode";
import Preloader from "./components/Preloader";
import AdvancedSearch from "./components/AdvancedSearch";
import NotificationSystem, { type Notification } from "./components/NotificationSystem";
import BookingSystem from "./components/BookingSystem";
import CommandPalette from "./components/CommandPalette";
import PerformanceMonitor from "./components/PerformanceMonitor";
import { useEffect, useState } from "react";
import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion() === true;
  
  // Advanced features state
  const [showSearch, setShowSearch] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Welcome to ZeusLabs!',
      message: 'Explore our services and projects',
      timestamp: new Date(),
      read: false
    }
  ]);

  useEffect(() => {
    // Check if admin mode is enabled via URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    setShowAdmin(urlParams.get('admin') === 'true');

    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle routing based on hash
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentPage(hash);
      if (!isLoading) {
        window.scrollTo(0, 0);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    // Scroll reveal animation setup
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Observe elements after loading
    setTimeout(() => {
      const scrollElements = document.querySelectorAll('.scroll-reveal');
      scrollElements.forEach(el => observer.observe(el));
    }, 1000);
    
    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.removeEventListener('hashchange', handleHashChange);
      observer.disconnect();
    };
  }, [currentPage, isLoading]);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  const handleNavigate = (path: string) => {
    window.location.hash = path.replace('/', '');
  };

  // Notification handlers
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  if (showAdmin) {
    return <Admin />;
  }

  if (isLoading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  const renderPage = () => {
    // Handle project-specific routes
    if (currentPage.startsWith('project-demo-')) {
      const projectId = currentPage.replace('project-demo-', '');
      return <ProjectDemo projectId={projectId} />;
    }
    
    if (currentPage.startsWith('project-case-study-')) {
      const projectId = currentPage.replace('project-case-study-', '');
      return <ProjectCaseStudy projectId={projectId} />;
    }
    
    if (currentPage.startsWith('project-code-')) {
      const projectId = currentPage.replace('project-code-', '');
      return <ProjectCode projectId={projectId} />;
    }

    // Handle service-specific routes
    if (currentPage.startsWith('service-')) {
      const serviceType = currentPage.replace('service-', '');
      // We'll import these components dynamically
      const ServiceDetailPage = React.lazy(() => 
        import(`./components/services/ServiceDetailPage`).then(module => ({
          default: (props) => <module.default serviceType={serviceType} {...props} />
        }))
      );
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <ServiceDetailPage />
        </React.Suspense>
      );
    }

    // Handle main pages
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'services':
        return <ServicesPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'work':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'blog':
        return <BlogPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <>
      {/* Header stays outside overflow-x-hidden so backdrop-filter / glass blur works */}
      <Header
        currentPage={currentPage}
        onOpenSearch={() => setShowSearch(true)}
        onOpenBooking={() => setShowBooking(true)}
      />

    <div className="min-h-screen bg-background overflow-x-hidden relative">
      {/* Background Animation Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"
          animate={{
            x: [-32, 50, -32],
            y: [-32, -100, -32],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Notification System - Positioned in top-right */}
      <div className="fixed top-4 right-4 z-50">
        <NotificationSystem
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
          onDelete={handleDeleteNotification}
          onClearAll={handleClearAllNotifications}
        />
      </div>

      <main
        className="relative z-10"
        style={prefersReducedMotion ? undefined : { perspective: "1400px" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            className="transform-gpu will-change-transform"
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    rotateY: 24,
                    z: -200,
                    scale: 0.94,
                  }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    rotateY: 0,
                    z: 0,
                    scale: 1,
                  }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    rotateY: -20,
                    z: -160,
                    scale: 0.96,
                  }
            }
            transition={{
              duration: prefersReducedMotion ? 0.2 : 0.52,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={
              prefersReducedMotion
                ? undefined
                : { transformStyle: "preserve-3d", transformOrigin: "50% 50%" }
            }
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer />

      {/* Floating Chat Component */}
      <FloatingChat />

      {/* Floating Scroll to Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-2xl z-30 flex items-center justify-center"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)"
        }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </motion.svg>
      </motion.button>

      {/* Advanced Features */}
      <AdvancedSearch isOpen={showSearch} onClose={() => setShowSearch(false)} />
      <BookingSystem isOpen={showBooking} onClose={() => setShowBooking(false)} />
      <CommandPalette
        onNavigate={handleNavigate}
        onOpenSearch={() => setShowSearch(true)}
        onOpenBooking={() => setShowBooking(true)}
      />
      <PerformanceMonitor />
    </div>
    </>
  );
}