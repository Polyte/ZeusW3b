import { motion } from "motion/react";
import { Zap, Facebook, Twitter, Instagram, Linkedin, Github, Youtube, ArrowRight, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import LogoIcon from "./LogoIcon";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    services: [
      { name: "Software Development", href: "#services" },
      { name: "Web Development", href: "#services" },
      { name: "Cybersecurity", href: "#services" },
      { name: "Game Development", href: "#services" },
      { name: "Cloud Solutions", href: "#services" },
      { name: "Mobile Apps", href: "#services" }
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Our Team", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Press", href: "#press" },
      { name: "Partnerships", href: "#partnerships" },
      { name: "Contact", href: "#contact" }
    ],
    resources: [
      { name: "Blog", href: "#blog" },
      { name: "Case Studies", href: "#projects" },
      { name: "Documentation", href: "#docs" },
      { name: "API Reference", href: "#api" },
      { name: "Support Center", href: "#support" },
      { name: "Community", href: "#community" }
    ]
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/zeuslabs", color: "hover:text-blue-500" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/zeuslabs", color: "hover:text-sky-500" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/zeuslabs", color: "hover:text-pink-500" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/zeuslabs", color: "hover:text-blue-600" },
    { name: "GitHub", icon: Github, href: "https://github.com/zeuslabs", color: "hover:text-gray-500" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/zeuslabs", color: "hover:text-red-500" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-geometric opacity-10"></div>
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter Section */}
        <motion.div
          className="py-12 border-b border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center max-w-2xl mx-auto">
            <motion.h3
              className="text-2xl md:text-3xl font-bold mb-4 tracking-tight"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              animate={{ textShadow: ["0 0 0px rgba(59,130,246,0)", "0 0 10px rgba(59,130,246,0.3)", "0 0 0px rgba(59,130,246,0)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Stay Updated with ZeusLabs
            </motion.h3>
            <p className="text-lg text-white/80 mb-6 font-light" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
              Get the latest insights, updates, and exclusive content delivered straight to your inbox.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm focus:bg-white/20 transition-all duration-300"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                />
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  disabled={isSubscribed}
                  className="h-12 px-8 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium tracking-wide transition-all duration-300"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {isSubscribed ? "Subscribed! ✓" : "Subscribe"}
                  {!isSubscribed && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <LogoIcon size="lg" animated={true} />
                <div>
                  <span className="text-2xl font-bold text-white tracking-wide" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                    ZeusLabs
                  </span>
                  <div className="text-sm text-white/60 font-light tracking-wider" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                    Innovation & Technology
                  </div>
                </div>
              </div>
              
              <p className="text-white/80 mb-6 leading-relaxed font-light" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                Empowering businesses through cutting-edge technology solutions since 2013. 
                We transform ideas into digital realities with expertise in software development, 
                cybersecurity, and innovative design.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 ${social.color} rounded-lg transition-all duration-300`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.1,
                        y: -3,
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              >
                <h4 className="text-lg font-semibold mb-4 text-white capitalize tracking-wide" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                  {category}
                </h4>
                <ul className="space-y-2">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: linkIndex * 0.05 }}
                    >
                      <motion.a
                        href={link.href}
                        className="text-white/70 hover:text-white transition-colors duration-300 font-light inline-block text-sm"
                        style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                        whileHover={{ x: 5 }}
                      >
                        {link.name}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-2 text-white/60 mb-4 md:mb-0">
            <span className="text-sm font-light" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
              © 2013-2024 ZeusLabs. All rights reserved.
            </span>
            <span className="text-sm">•</span>
            <span className="text-sm font-light" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
              Made with
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.div>
            <span className="text-sm font-light" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
              for innovation
            </span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-white/60">
            <motion.a
              href="#sitemap"
              className="hover:text-white transition-colors font-light"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              whileHover={{ scale: 1.05 }}
            >
              Sitemap
            </motion.a>
            <motion.a
              href="#status"
              className="hover:text-white transition-colors font-light"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              whileHover={{ scale: 1.05 }}
            >
              Status
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 10,
              opacity: 0
            }}
            animate={{
              y: -10,
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </footer>
  );
}