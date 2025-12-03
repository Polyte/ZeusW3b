import { Card, CardContent } from "./ui/card";
import { Users, Award, Target, Zap, Heart, Linkedin, Twitter, Github } from "lucide-react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useState } from "react";
import { ProfileImage } from "./StockImage";
import { featuredMembers } from "../constants/teamData";

// Animated Counter Component
function AnimatedCounter({ from, to, duration = 2, delay = 0, suffix = "" }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => {
    return Math.round(latest) + suffix;
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      const controls = animate(count, to, {
        duration,
        delay,
        ease: "easeOut"
      });
      setHasAnimated(true);
      return controls.stop;
    }
  }, [count, to, duration, delay, hasAnimated]);

  return <motion.span>{rounded}</motion.span>;
}

export default function About() {
  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Mission-Driven",
      description: "We're committed to delivering solutions that exceed expectations and drive real business value.",
      color: "from-blue-500/20 to-blue-600/10",
      iconColor: "text-blue-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Innovation First",
      description: "We stay ahead of technology trends to provide cutting-edge solutions for our clients.",
      color: "from-yellow-500/20 to-yellow-600/10",
      iconColor: "text-yellow-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaborative",
      description: "We work closely with our clients as partners, ensuring transparent communication throughout.",
      color: "from-green-500/20 to-green-600/10",
      iconColor: "text-green-500"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Excellence",
      description: "We maintain the highest standards of quality in every project we undertake.",
      color: "from-purple-500/20 to-purple-600/10",
      iconColor: "text-purple-500"
    }
  ];

  const stats = [
    { value: 2013, suffix: "", label: "Founded", sublabel: "Years of Innovation", isYear: true },
    { value: 15, suffix: "+", label: "Team Members", sublabel: "Expert Professionals" },
    { value: 4, suffix: "", label: "Core Services", sublabel: "Technology Domains" },
    { value: "Global", label: "Reach", sublabel: "Worldwide Impact", isText: true }
  ];

  return (
    <section id="about" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full mb-6">
            <Heart className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Our Story</span>
          </div>
          <h2 className="text-4xl md:text-6xl mb-6 text-foreground">
            About ZeusLabs
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Founded with a vision to democratize access to high-quality technology solutions, 
            ZeusLabs has grown into a trusted partner for businesses of all sizes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 mb-20">
          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Decorative element */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full"></div>
              
              <div className="relative z-10 bg-gradient-to-br from-card/80 to-accent/10 backdrop-blur-sm p-8 rounded-3xl border border-border/50">
                <h3 className="text-3xl mb-6 text-foreground">Our Story</h3>
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 2013, ZeusLabs was born from the idea that every business deserves access to 
                    world-class technology solutions. Our team of experts combines deep technical 
                    knowledge with a passion for solving complex problems.
                  </p>
                  <p>
                    Over more than a decade, we've helped startups scale, enterprises modernize, and 
                    innovators bring their ideas to life across software development, web development, 
                    cybersecurity, and game development.
                  </p>
                  <p>
                    Today, we continue to push the boundaries of what's possible, delivering 
                    solutions that not only meet current needs but anticipate future challenges.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Card className="h-full border-2 border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-500 group">
                    <CardContent className="p-6 text-center relative overflow-hidden">
                      {/* Background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      
                      <div className="relative z-10">
                        <div className={`${value.iconColor} mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-background to-accent/20 rounded-xl border border-border/50">
                            {value.icon}
                          </div>
                        </div>
                        <h4 className="text-lg font-semibold text-foreground mb-3">{value.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-16">
            <h3 
              className="text-3xl md:text-4xl mb-4 text-foreground font-bold"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Meet Our Leadership Team
            </h3>
            <p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto font-light"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Experienced professionals leading innovation and delivering exceptional results for our clients worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group border-2 border-border/50 hover:border-primary/20 hover:shadow-xl transition-all duration-500 overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-6">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProfileImage
                          src={member.image}
                          alt={member.name}
                          className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg"
                          width={96}
                          height={96}
                        />
                      </motion.div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-background"></div>
                    </div>
                    
                    <h4 
                      className="text-lg font-bold text-foreground mb-1"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {member.name}
                    </h4>
                    <p 
                      className="text-sm text-primary mb-3 font-medium"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {member.role}
                    </p>
                    <p 
                      className="text-xs text-muted-foreground mb-4 leading-relaxed font-light"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {member.bio.substring(0, 120)}...
                    </p>
                    
                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {member.expertise.slice(0, 2).map((skill, idx) => (
                        <span 
                          key={idx}
                          className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex justify-center space-x-3">
                      {member.social.linkedin && (
                        <motion.a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-accent/50 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Linkedin className="w-4 h-4 text-primary" />
                        </motion.a>
                      )}
                      {member.social.twitter && (
                        <motion.a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-accent/50 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Twitter className="w-4 h-4 text-primary" />
                        </motion.a>
                      )}
                      {member.social.github && (
                        <motion.a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-accent/50 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="w-4 h-4 text-primary" />
                        </motion.a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-8 lg:gap-16 p-8 lg:p-12 bg-gradient-to-r from-card/80 via-accent/5 to-card/80 backdrop-blur-sm rounded-3xl border border-border/50">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <motion.div 
                  className="text-3xl lg:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                >
                  {stat.isText ? (
                    stat.value
                  ) : (
                    <AnimatedCounter 
                      from={0} 
                      to={stat.value} 
                      duration={2.5}
                      delay={index * 0.2 + 0.7}
                      suffix={stat.suffix}
                    />
                  )}
                </motion.div>
                <div 
                  className="text-sm font-semibold text-foreground mb-1"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {stat.label}
                </div>
                <div 
                  className="text-xs text-muted-foreground"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  {stat.sublabel}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}