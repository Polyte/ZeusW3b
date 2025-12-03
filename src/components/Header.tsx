import { Button } from "./ui/button";
import { Menu, X, Sun, Moon, Code, Globe, Shield, Gamepad2, Cloud, Smartphone, Search, Calendar, Command } from "lucide-react";
import { useState, useEffect } from "react";
import AnimatedLogo from "./AnimatedLogo";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  currentPage?: string;
  onOpenSearch?: () => void;
  onOpenBooking?: () => void;
  onOpenCommandPalette?: () => void;
}

export default function Header({ 
  currentPage = 'home',
  onOpenSearch,
  onOpenBooking,
  onOpenCommandPalette
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: "Home", href: "#home", route: "home" },
    { name: "Services", href: "#services", route: "services" },
    { name: "Projects", href: "#projects", route: "projects" },
    { name: "About", href: "#about", route: "about" },
    { name: "Blog", href: "#blog", route: "blog" },
    { name: "Contact", href: "#contact", route: "contact" },
  ];

  const serviceItems = [
    { 
      name: "Software Development", 
      route: "service-software-development",
      icon: <Code className="w-4 h-4" />,
      description: "Custom software solutions"
    },
    { 
      name: "Web Development", 
      route: "service-web-development",
      icon: <Globe className="w-4 h-4" />,
      description: "Modern web applications"
    },
    { 
      name: "Cybersecurity", 
      route: "service-cybersecurity",
      icon: <Shield className="w-4 h-4" />,
      description: "Security solutions & audits"
    },
    { 
      name: "Game Development", 
      route: "service-game-development",
      icon: <Gamepad2 className="w-4 h-4" />,
      description: "Interactive gaming experiences"
    },
    { 
      name: "Cloud Solutions", 
      route: "service-cloud-solutions",
      icon: <Cloud className="w-4 h-4" />,
      description: "Scalable cloud infrastructure"
    },
    { 
      name: "Mobile Apps", 
      route: "service-mobile-apps",
      icon: <Smartphone className="w-4 h-4" />,
      description: "iOS & Android applications"
    }
  ];

  const handleNavClick = (route: string) => {
    window.location.hash = route;
    setIsMenuOpen(false);
  };

  // Determine if we should use white text (homepage + not scrolled)
  const isHomepageTransparent = currentPage === 'home' && !isScrolled;

  // Get text colors based on page and scroll state
  const getTextColor = (isActive: boolean) => {
    if (isHomepageTransparent) {
      // Homepage with transparent header - use white text
      return isActive 
        ? 'text-white bg-white/20 backdrop-blur-sm' 
        : 'text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm';
    } else {
      // Other pages or scrolled homepage - use standard colors
      return isActive
        ? 'text-primary bg-accent/50'
        : 'text-foreground/80 hover:text-foreground hover:bg-accent/50';
    }
  };

  const getIconColor = () => {
    return isHomepageTransparent ? 'text-white/90 hover:text-white' : '';
  };

  const getSeparatorColor = () => {
    return isHomepageTransparent ? 'bg-white/30' : 'bg-border';
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled || currentPage !== 'home'
        ? 'bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <AnimatedLogo 
            onClick={() => handleNavClick('home')}
            size="md"
          />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.route)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 tracking-wide ${
                  getTextColor(currentPage === item.route || (item.route === 'services' && currentPage.startsWith('service-')))
                }`}
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                {item.name}
              </button>
            ))}
            
            <div className={`mx-2 h-4 w-px ${getSeparatorColor()}`}></div>
            <ThemeToggle
              className={`rounded-lg hover:scale-110 transition-transform duration-200 ${getIconColor()}`}
            />
            <Button
              onClick={() => handleNavClick('contact')}
              className={`${
                isHomepageTransparent
                  ? 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30'
                  : 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70'
              } shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium tracking-wide`}
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle
              className={`rounded-lg ${getIconColor()}`}
            />
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-lg ${getIconColor()}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className={`md:hidden pb-6 mt-4 pt-6 ${
            isHomepageTransparent 
              ? 'bg-black/20 backdrop-blur-md rounded-lg border-t border-white/20' 
              : 'border-t border-border/50'
          }`}>
            <div className="flex flex-col space-y-2 px-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.route)}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 tracking-wide text-left ${
                    getTextColor(currentPage === item.route || (item.route === 'services' && currentPage.startsWith('service-')))
                  }`}
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {item.name}
                </button>
              ))}
              
              {/* Mobile Services Section - Show individual services as submenu when on services page */}
              {(currentPage === 'services' || currentPage.startsWith('service-')) && (
                <div className="pl-4 space-y-1">
                  {serviceItems.map((service) => (
                    <button
                      key={service.route}
                      onClick={() => handleNavClick(service.route)}
                      className={`flex items-center w-full px-3 py-2 text-xs rounded-lg transition-all duration-200 tracking-wide text-left ${
                        currentPage === service.route
                          ? isHomepageTransparent
                            ? 'text-white bg-white/20'
                            : 'text-primary bg-accent/50'
                          : isHomepageTransparent
                            ? 'text-white/70 hover:text-white hover:bg-white/10'
                            : 'text-foreground/70 hover:text-foreground hover:bg-accent/30'
                      }`}
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      <div className={`mr-2 ${isHomepageTransparent ? 'text-white' : 'text-primary'}`}>
                        {service.icon}
                      </div>
                      {service.name}
                    </button>
                  ))}
                </div>
              )}
              
              <Button 
                onClick={() => handleNavClick('contact')}
                className={`mt-4 font-medium tracking-wide ${
                  isHomepageTransparent
                    ? 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30'
                    : 'bg-gradient-to-r from-primary to-primary/80'
                }`}
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                Get Started
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}