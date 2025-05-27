import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Heart, MapPin, Mail, Phone, Code2, ArrowUp, ExternalLink, Github, Linkedin, Eye } from 'lucide-react';
import { socialLinks } from '../../data/social';
import SocialIcon from '../ui/SocialIcon';

const Footer: React.FC = () => {
  // Add scroll progress tracking
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };
  
  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 5px rgba(59, 130, 246, 0.3)",
        "0 0 20px rgba(139, 92, 246, 0.6)",
        "0 0 5px rgba(59, 130, 246, 0.3)"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='7' r='1'/%3E%3Ccircle cx='7' cy='53' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px']
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </div>

      {/* Interactive Decorative Elements */}
      <motion.div 
        className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-3xl" 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-secondary-500/20 to-transparent rounded-full blur-3xl" 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.25, 0.1],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Additional Decorative Elements */}
      <motion.div 
        className="absolute left-1/4 top-20 w-40 h-40 bg-gradient-to-tr from-accent-500/10 to-transparent rounded-full blur-3xl" 
        animate={{
          opacity: [0.05, 0.15, 0.05],
          scale: [0.8, 1, 0.8]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
        >
          {/* About Section - Enhanced */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <motion.div 
              className="flex items-center justify-center md:justify-start mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="relative"
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <motion.div 
                  className="absolute -inset-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-lg"
                  animate={{ 
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <Code2 className="w-10 h-10 text-primary-400 mr-3 relative z-10" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                  Saurabh Prajapati
                </h3>
                <p className="text-xs text-gray-400 tracking-wider mt-1">MERN STACK DEVELOPER</p>
              </div>
            </motion.div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Full Stack Developer passionate about creating innovative solutions 
              and bringing ideas to life through clean, efficient code.
            </p>
            
            <motion.div 
              className="space-y-3 text-sm text-gray-400"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              <motion.div 
                className="flex items-center justify-center md:justify-start group"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="p-2 bg-gray-800/50 rounded-full mr-3 group-hover:bg-primary-900/50 transition-colors duration-300">
                  <MapPin className="w-4 h-4 text-primary-400 group-hover:text-primary-300" />
                </div>
                <span className="group-hover:text-primary-300 transition-colors duration-300">Jaunpur, Uttarpradesh, India</span>
              </motion.div>
              
              <motion.a 
                href="mailto:saurabhprajapati7756@gmail.com"
                className="flex items-center justify-center md:justify-start group"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="p-2 bg-gray-800/50 rounded-full mr-3 group-hover:bg-primary-900/50 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-primary-400 group-hover:text-primary-300" />
                </div>
                <span className="group-hover:text-primary-300 transition-colors duration-300">saurabhprajapati7756@gmail.com</span>
                <motion.div 
                  className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ rotate: 45 }}
                >
                  <ExternalLink size={12} className="text-primary-400" />
                </motion.div>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Quick Links - Enhanced */}
          <motion.div variants={itemVariants} className="text-center">
            <h4 className="text-lg font-semibold mb-6 text-gray-100 relative inline-block">
              Quick Links
              <motion.div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent w-16"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "120%", opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </h4>
            <motion.div 
              className="space-y-3"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link, index) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-gray-300 hover:text-primary-400 transition-colors duration-200 relative group"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  custom={index}
                >
                  <span className="relative z-10 group-hover:font-medium">{link}</span>
                  <motion.span 
                    className="absolute left-1/2 -bottom-0.5 h-0.5 bg-primary-500 rounded-full w-0 group-hover:w-full group-hover:left-0 transition-all duration-300"
                    style={{ translateX: "-50%" }}
                  />
                </motion.a>
              ))}
            </motion.div>
            
            <motion.div 
              className="mt-10 p-5 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700/50 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ 
                boxShadow: "0 10px 30px -5px rgba(59, 130, 246, 0.2)",
                scale: 1.02
              }}
            >
              <p className="text-sm text-gray-400 mb-4">Ready to start a project?</p>
              <motion.a
                href="#contact"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full text-white text-sm font-medium transition-all duration-200 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Connect
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Social & Contact - Enhanced */}
          <motion.div variants={itemVariants} className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-6 text-gray-100 relative inline-block">
              Connect With Me
              <motion.div 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-secondary-500 to-transparent w-16"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "120%", opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </h4>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-4 mb-8">
              {socialLinks
                .filter(social => social.name.toLowerCase() !== 'twitter') // Filter out Twitter
                .map((social, index) => {
                  // Define icon based on social network
                  let icon;
                  let color;
                  
                  switch(social.name.toLowerCase()) {
                    case 'github':
                      icon = <Github className="w-5 h-5" />;
                      color = '#181717';
                      break;
                    case 'linkedin':
                      icon = <Linkedin className="w-5 h-5" />;
                      color = '#0A66C2';
                      break;
                    case 'email':
                      icon = <Mail className="w-5 h-5" />;
                      color = '#EA4335';
                      break;
                    default:
                      icon = <SocialIcon icon={social.icon} className="w-5 h-5" />;
                      color = '#6366F1';
                  }
                  
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden"
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ 
                        scale: 1.15,
                        rotate: 5,
                        transition: { type: "spring", stiffness: 400, damping: 10 }
                      }}
                      whileTap={{ scale: 0.9 }}
                      title={social.name}
                    >
                      <motion.div 
                        className="absolute -inset-2 opacity-0 group-hover:opacity-100 rounded-full blur-md transition-opacity duration-300"
                        style={{ backgroundColor: `${color}30` }}
                        animate={{ 
                          scale: [0.8, 1.2, 0.8], 
                          opacity: [0, 0.5, 0],
                          boxShadow: [`0 0 5px ${color}00`, `0 0 15px ${color}80`, `0 0 5px ${color}00`]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <div className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 transition-all duration-300 relative z-10 overflow-hidden">
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                          {icon}
                        </span>
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                        />
                      </div>
                    </motion.a>
                  );
                })}
            </div>
            
            <motion.div
              className="p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700/50 text-left shadow-lg relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ 
                boxShadow: "0 10px 30px -5px rgba(59, 130, 246, 0.2)",
                scale: 1.02
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-secondary-500/0"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: '200% 200%' }}
              />
              <div className="flex items-center mb-4">
                <motion.div 
                  className="w-3 h-3 bg-green-500 rounded-full mr-2 relative"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-green-500 rounded-full blur-sm"
                    animate={{ 
                      scale: [1, 1.8, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <h4 className="text-sm font-semibold text-gray-200">Currently Available for Work</h4>
              </div>
              <p className="text-xs text-gray-400 mb-3">Looking for new opportunities and exciting projects to work on.</p>
              <motion.button
                onClick={scrollToTop}
                className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full text-white text-sm font-medium transition-all duration-200 shadow-md hover:shadow-xl"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Back to Top
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="relative">
          {/* Floating Tech Logos */}
          {['react', 'typescript', 'tailwind', 'node'].map((tech, index) => (
            <motion.img
              key={tech}
              src={`/icons/${tech}.svg`}
              alt={tech}
              className="absolute w-8 h-8 opacity-20 dark:opacity-10"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + index * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Enhanced Thanks Message */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 -top-5 px-6 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full text-sm font-medium text-white shadow-xl group cursor-pointer"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Thanks for visiting!</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                👋
              </motion.div>
            </span>
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)'
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Newsletter Subscription */}
          <motion.div
            className="max-w-md mx-auto mb-12 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
              <h4 className="text-lg font-semibold text-gray-100 mb-2">Stay Updated</h4>
              <p className="text-sm text-gray-400 mb-4">Subscribe for latest projects and updates.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                />
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg text-white font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="border-t border-gray-800 pt-8 mt-8 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Visitor Counter */}
            <motion.div
              className="absolute right-0 top-0 transform -translate-y-1/2 bg-gray-800 px-4 py-2 rounded-full text-xs font-medium text-gray-400"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>Visitors: </span>
                <motion.span
                  className="text-primary-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {Math.floor(Math.random() * 1000) + 500}
                </motion.span>
              </span>
            </motion.div>

            {/* Enhanced Copyright Section */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <motion.div 
                className="flex items-center text-gray-400 text-sm perspective-1000"
                variants={itemVariants}
              >
                <motion.div
                  className="group relative"
                  whileHover={{ rotateX: 360 }}
                  transition={{ duration: 1 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    © {new Date().getFullYear()} Saurabh Prajapati
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                    </motion.div>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-lg -z-10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              </motion.div>

              {/* Tech Stack Pills */}
              <motion.div 
                className="flex gap-2 flex-wrap justify-center"
                variants={itemVariants}
              >
                {['React', 'TypeScript', 'Tailwind', 'Framer'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full bg-gray-800/50 text-gray-400 border border-gray-700/50 backdrop-blur-sm"
                    whileHover={{ scale: 1.1, y: -2 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll to Top Button with Progress */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative">
            <ArrowUp className="w-6 h-6" />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-white/20"
              style={{ 
                background: `conic-gradient(from 0deg, white ${scrollProgress ? Math.round(scrollProgress.get() * 100) : 0}%, transparent ${scrollProgress ? Math.round(scrollProgress.get() * 100) : 0}%)`
              }}
            />
          </div>
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;