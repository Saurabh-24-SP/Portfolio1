import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Code, Coffee, Star, Zap, Download } from 'lucide-react';
import Button from '../ui/Button';
import { socialLinks } from '../../data/social';
import SocialIcon from '../ui/SocialIcon';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTyping, setIsTyping] = useState(true);
  const [displayText, setDisplayText] = useState('');
  
  const texts = ['MERN Stack Developer', 'Problem Solver', 'Tech Enthusiast', 'Fresh Graduate'];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typing animation effect
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentText = texts[currentTextIndex];
    
    if (isTyping) {
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        setIsTyping(true);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentTextIndex, texts]);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(59, 130, 246, 0.3)",
        "0 0 40px rgba(139, 92, 246, 0.6)",
        "0 0 20px rgba(59, 130, 246, 0.3)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center relative overflow-hidden pt-20"
    >
      {/* Enhanced Background with Parallax */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 animate-gradient" />
      
      {/* Interactive Background Elements */}
      <motion.div 
        className="absolute top-20 right-10 w-72 h-72 bg-primary-300/20 dark:bg-primary-700/10 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-72 h-72 bg-secondary-300/20 dark:bg-secondary-700/10 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * -15,
          y: mousePosition.y * -15,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      />
      
      {/* Floating Elements */}
      {[
        { Icon: Code, size: 40, position: "top-1/4 left-1/4", delay: 0 },
        { Icon: Sparkles, size: 30, position: "top-1/3 right-1/4", delay: 2 },
        { Icon: Coffee, size: 35, position: "bottom-1/3 left-1/3", delay: 1 },
        { Icon: Zap, size: 25, position: "top-1/2 right-1/3", delay: 3 }
      ].map((item, index) => (
        <motion.div
          key={`floating-${index}`}
          className={`absolute ${item.position} text-primary-400/30 dark:text-primary-600/20`}
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: `${item.delay}s` }}
        >
          <item.Icon size={item.size} />
        </motion.div>
      ))}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <motion.div
            className="max-w-2xl"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Enhanced Status Badge */}
            <motion.div variants={item} className="mb-4">
              <motion.span 
                className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium mb-4 relative overflow-hidden"
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🚀
                </motion.span>
                {" "}Fresh Graduate
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.span>
            </motion.div>
            
            {/* Enhanced Main Heading */}
            <motion.div variants={item}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Hi, I'm{" "}
                <motion.span 
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent relative inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Saurabh Prajapati
                  <motion.span
                    className="absolute -top-2 -right-2"
                    animate={{ 
                      rotate: [0, 14, -8, 14, -4, 10, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    👋
                  </motion.span>
                </motion.span>
              </h1>
            </motion.div>
            
            {/* Typing Animation */}
            <motion.div variants={item} className="mb-8">
              <div className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 min-h-[50px]">
                <span className="text-primary-600 dark:text-primary-400">
                  {displayText}
                </span>
                <motion.span
                  className="inline-block w-0.5 h-8 bg-primary-500 ml-1"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            </motion.div>
            
            {/* Enhanced Description */}
            <motion.div 
              variants={item}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
            >
              I build{" "}
              <motion.span
                className="relative inline-block text-primary-600 dark:text-primary-400 font-semibold"
                whileHover={{ scale: 1.1 }}
              >
                <span className="relative z-10">beautiful</span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-primary-400/40 dark:bg-primary-400/40 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span 
                  className="absolute -inset-1 scale-[0.8] bg-primary-100 dark:bg-primary-900/30 rounded-lg -z-10 opacity-0"
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                />
              </motion.span>
              ,{" "}
              <motion.span
                className="relative inline-block text-secondary-600 dark:text-secondary-400 font-semibold"
                whileHover={{ scale: 1.1 }}
              >
                <span className="relative z-10">interactive</span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-secondary-400/40 dark:bg-secondary-400/40 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span 
                  className="absolute -inset-1 scale-[0.8] bg-secondary-100 dark:bg-secondary-900/30 rounded-lg -z-10 opacity-0"
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                />
              </motion.span>
              , and{" "}
              <motion.span
                className="relative inline-block text-accent-600 dark:text-accent-400 font-semibold"
                whileHover={{ scale: 1.1 }}
              >
                <span className="relative z-10">scalable</span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-accent-400/40 dark:bg-accent-400/40 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span 
                  className="absolute -inset-1 scale-[0.8] bg-accent-100 dark:bg-accent-900/30 rounded-lg -z-10 opacity-0"
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                />
              </motion.span>
              {" "}
              <span className="relative inline-block">
                web applications 
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </span>
              {" "}using the{" "}
              <motion.span
                className="relative px-1.5 py-0.5 font-bold rounded bg-gradient-to-r from-primary-500/10 to-secondary-500/10 dark:from-primary-500/20 dark:to-secondary-500/20 border border-primary-300/30 dark:border-primary-700/30"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(59, 130, 246, 0.2)" 
                }}
              >
                MERN
                <motion.span
                  className="absolute -top-2 -right-2 w-4 h-4 text-xs flex items-center justify-center bg-secondary-500 text-white rounded-full"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  ✨
                </motion.span>
              </motion.span>
              {" "}stack and modern best practices.
            </motion.div>
            
            {/* Enhanced Action Buttons with Improved UI */}
            <motion.div
              variants={item}
              className="flex flex-wrap gap-6 mb-8"
            >
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-500 group relative overflow-hidden hover:-translate-y-2 active:translate-y-0 rounded-xl border-2 border-primary-500/70 backdrop-blur-sm"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-600/90 via-secondary-500/90 to-primary-600/90 opacity-90"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: '300% 300%' }}
                />
                <motion.div 
                  className="absolute inset-0 opacity-30"
                  animate={{ 
                    boxShadow: [
                      'inset 0 0 20px rgba(59, 130, 246, 0.7)',
                      'inset 0 0 50px rgba(139, 92, 246, 0.7)',
                      'inset 0 0 20px rgba(59, 130, 246, 0.7)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <span className="relative z-10 flex items-center py-1">
                  <motion.div
                    className="mr-3 flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-white overflow-hidden"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <motion.span
                      className="text-xl"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    >
                      💬
                    </motion.span>
                  </motion.div>
                  <span className="text-white font-semibold text-lg tracking-wide">Get in Touch</span>
                </span>
                <motion.div 
                  className="absolute top-0 right-0 -mt-1 -mr-1 w-3 h-3 rounded-full bg-white/90"
                  animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-purple-500 to-secondary-600 opacity-0 group-hover:opacity-60 blur-2xl rounded-xl"
                  animate={{
                    opacity: [0, 0.4, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                {/* Shimmer effect */}
                <motion.div 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out"
                />
              </Button>

              <Button 
                variant="ghost" 
                size="lg"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/src/public/Saurabh_Resume.pdf';
                  link.download = 'Saurabh_Prajapati_Resume.pdf';
                  link.click();
                }}
                className="group relative hover:bg-transparent transition-all duration-500 hover:-translate-y-2 active:translate-y-0 rounded-xl border-2 border-secondary-500/70 shadow-lg hover:shadow-xl hover:shadow-secondary-500/30 backdrop-blur-sm"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-secondary-500/10 via-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 rounded-xl"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-50"
                  animate={{ 
                    boxShadow: [
                      'inset 0 0 15px rgba(139, 92, 246, 0.6)',
                      'inset 0 0 30px rgba(59, 130, 246, 0.6)',
                      'inset 0 0 15px rgba(139, 92, 246, 0.6)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative z-10 flex items-center py-1">
                  <motion.div
                    className="mr-3 flex items-center justify-center w-8 h-8 rounded-full bg-secondary-500/20 text-secondary-500 group-hover:bg-secondary-500/30 overflow-hidden"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -3, 0],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      <Download size={18} className="text-secondary-500 group-hover:text-secondary-600" />
                    </motion.div>
                  </motion.div>
                  <span className="text-secondary-500 group-hover:text-secondary-600 font-medium text-lg tracking-wide">Resume</span>
                </div>
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-secondary-500 via-purple-500 to-primary-500 opacity-0 group-hover:opacity-40 blur-2xl rounded-xl"
                  animate={{
                    opacity: [0, 0.2, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                {/* Shimmer effect */}
                <motion.div 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-secondary-300/20 to-transparent transition-transform duration-1000 ease-in-out"
                />
                
                <motion.div 
                  className="absolute -top-3 -right-3 px-2 py-1 bg-secondary-500 text-white text-xs font-bold rounded-md opacity-0 group-hover:opacity-100 transform -rotate-3 shadow-lg"
                  initial={{ scale: 0.5 }}
                  whileHover={{ scale: 1.1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  PDF
                </motion.div>
              </Button>
            </motion.div>
            
            {/* Enhanced Social Icons with neon effect */}
            <motion.div
              variants={item}
              className="flex gap-4"
            >
              {/* Social Icons with brand-colored glow effects */}
              {[...socialLinks.slice(0, 2).map(social => 
                social.name.toLowerCase() === 'linkedin' 
                  ? {...social, url: 'https://www.linkedin.com/in/saurabh-prajapati-73a6912b8/'} 
                  : social
              ), { 
                name: 'Instagram', 
                url: 'https://www.instagram.com/saurabh_24_dnd/?igsh=MTU2NGQwdGlwcjBpMQ%3D%3D#', 
                icon: 'instagram' 
              }, ...socialLinks.slice(2, 3)].map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 5,
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 shadow-md transition-all duration-200 relative group overflow-hidden"
                  aria-label={social.name}
                  title={social.name}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Use appropriate icon based on social platform with enhanced glow effects */}
                  {social.name.toLowerCase() === 'twitter' ? (
                    <div 
                      className="w-6 h-6 flex items-center justify-center relative cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); // Stop event propagation
                        e.preventDefault(); // Prevent default link behavior
                        window.location.href = "mailto:saurabhprajapati7756@gmail.com";
                      }}
                    >
                      <Mail className="w-5 h-5 z-10 text-white group-hover:animate-pulse" />
                      <div className="absolute inset-0 group-hover:bg-[#EA4335] group-hover:blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    </div>
                  ) : social.name.toLowerCase() === 'instagram' ? (
                    <div className="w-6 h-6 flex items-center justify-center relative">
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="z-10 group-hover:animate-pulse">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      <div className="absolute inset-0 group-hover:bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] group-hover:blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    </div>
                  ) : social.name.toLowerCase() === 'github' ? (
                    <div 
                      className="w-6 h-6 flex items-center justify-center relative cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        window.open("https://github.com/Saurabh-24-SP", "_blank");
                      }}
                    >
                      <Github className="w-5 h-5 z-10 text-white group-hover:animate-pulse" />
                      <div className="absolute inset-0 group-hover:bg-[#181717] group-hover:blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    </div>
                  ) : social.name.toLowerCase() === 'linkedin' ? (
                    <div className="w-6 h-6 flex items-center justify-center relative">
                      <Linkedin className="w-5 h-5 z-10 text-white group-hover:animate-pulse" />
                      <div className="absolute inset-0 group-hover:bg-[#0A66C2] group-hover:blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <motion.div 
                          className="w-full h-full bg-[#0A66C2]"
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                    </div>
                  ) : (
                    <SocialIcon icon={social.icon} className="w-5 h-5 relative z-10 text-white" />
                  )}
                  
                  {/* Brand-colored gradient backgrounds with enhanced opacity transitions */}
                  {social.name.toLowerCase() === 'github' && (
                    <motion.div
                      className="absolute inset-0 bg-[#181717] opacity-0 group-hover:opacity-90 transition-opacity duration-300"
                    />
                  )}
                  {social.name.toLowerCase() === 'linkedin' && (
                    <motion.div
                      className="absolute inset-0 bg-[#0A66C2] opacity-0 group-hover:opacity-90 transition-opacity duration-300"
                      animate={{ 
                        boxShadow: ['inset 0 0 5px #0A66C2', 'inset 0 0 15px #0A66C2', 'inset 0 0 5px #0A66C2']
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  {social.name.toLowerCase() === 'twitter' && (
                    <motion.div
                      className="absolute inset-0 bg-[#EA4335] opacity-0 group-hover:opacity-90 transition-opacity duration-300"
                    />
                  )}
                  {social.name.toLowerCase() === 'instagram' && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] opacity-0 group-hover:opacity-90 transition-opacity duration-300"
                    />
                  )}
                  
                  {/* Enhanced outer glow effect with stronger LinkedIn glow */}
                  <motion.div
                    className={`absolute -inset-3 opacity-0 group-hover:opacity-100 rounded-lg blur-xl transition-opacity duration-300 ${
                      social.name.toLowerCase() === 'github' 
                        ? 'bg-[#181717]' 
                        : social.name.toLowerCase() === 'linkedin'
                        ? 'bg-[#0A66C2]'
                        : social.name.toLowerCase() === 'twitter'
                        ? 'bg-[#EA4335]'
                        : 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]'
                    }`}
                    animate={{ 
                      opacity: social.name.toLowerCase() === 'linkedin' ? [0, 0.8, 0] : [0, 0.6, 0],
                      scale: social.name.toLowerCase() === 'linkedin' ? [0.8, 1.3, 0.8] : [0.8, 1.2, 0.8]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Enhanced Profile Image */}
          <motion.div
            className="relative hidden md:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="relative w-80 h-80 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 p-1 shadow-xl"
              whileHover={{ 
                scale: 1.08,  // Increased zoom effect
                boxShadow: "0 0 80px rgba(59, 130, 246, 0.8), 0 0 120px rgba(139, 92, 246, 0.6), 0 30px 50px rgba(0, 0, 0, 0.3)"  // Enhanced glow with shadow
              }}
              transition={{ type: "spring", stiffness: 300 }}
              variants={glowVariants}
              animate="animate"
            >
              {/* Add neon glow effect */}
              <motion.div
                className="absolute -inset-6 bg-gradient-to-r from-primary-500 via-purple-500 to-secondary-500 opacity-30 blur-2xl rounded-full"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  rotate: [0, 360],
                  scale: [0.95, 1.05, 0.95]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                whileHover={{
                  opacity: 0.9,  // Increased opacity for stronger glow
                  scale: 1.3,    // Increased scale for stronger glow
                  filter: "blur(25px)"  // Increased blur for stronger glow
                }}
              />

              <motion.img 
                src="/src/public/author1.jpg" 
                alt="Saurabh Prajapati"
                className="w-full h-full object-cover rounded-full relative z-10"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Additional hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 opacity-0 z-0"
                initial={{ opacity: 0 }}
                whileHover={{ 
                  opacity: 0.8,
                  filter: "blur(20px)",
                  scale: 1.3
                }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Pulsing Dot Badge - Simplified version without text */}
              <motion.div 
                className="absolute -bottom-2 -right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.1 }}
                animate={{ 
                  boxShadow: [
                    "0 5px 15px rgba(0,0,0,0.1)",
                    "0 8px 25px rgba(0,0,0,0.2)",
                    "0 5px 15px rgba(0,0,0,0.1)"
                  ]
                }}
                transition={{ 
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
              >
                <motion.span 
                  className="inline-block w-4 h-4 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
              
              {/* Skill Icons around the image */}
              {[
                { emoji: "⚛️", position: "-top-2 -left-2", animation: { rotate: 360 }, duration: 20 },
                { emoji: "🔥", position: "top-10 -right-3", animation: { y: [-5, 5, -5] }, duration: 3 },
                { emoji: "💻", position: "-bottom-2 left-10", animation: { rotate: [-10, 10, -10] }, duration: 4 }
              ].map((item, index) => (
                <motion.div
                  key={`skill-${index}`}
                  className={`absolute ${item.position} bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg`}
                  animate={item.animation}
                  transition={{ duration: item.duration, repeat: Infinity, ease: "linear" }}
                >
                  {item.emoji}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.a
          href="#about"
          className="group p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-all duration-300"
          whileHover={{ 
            scale: 1.1, 
            backgroundColor: "rgba(59, 130, 246, 0.1)" 
          }}
          animate={{ 
            y: [0, 8, 0],
          }}
          transition={{ 
            y: { duration: 1.5, repeat: Infinity },
          }}
          aria-label="Scroll down"
        >
          <ArrowDown size={20} className="group-hover:animate-bounce" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;