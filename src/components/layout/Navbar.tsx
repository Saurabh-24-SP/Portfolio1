import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Search, Globe, Wifi, WifiOff, Bell, Settings, User, ChevronDown, Zap, Coffee, Download, Github, Linkedin, Mail, Phone, MapPin, Calendar, Monitor, Moon, Sun, Palette, Volume2, VolumeX, Lock, Shield, Eye, EyeOff, RefreshCw, Database, Code, Heart, Star } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { navItems } from '../../data/social';
import { useScrollPosition } from '../../hooks/useScrollPosition';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  const suggestions = [
    { name: 'Home', icon: '🏠', description: 'Go to homepage' },
    { name: 'About', icon: '👨‍💻', description: 'Learn more about me' },
    { name: 'Projects', icon: '💼', description: 'View my portfolio projects' },
    { name: 'Skills', icon: '🛠️', description: 'Check out my technical skills' },
    { name: 'Contact', icon: '📧', description: 'Get in touch with me' }
  ];

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    suggestion.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [performanceMode, setPerformanceMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [darkModeAuto, setDarkModeAuto] = useState(false);
  const { scrollPosition, activeSection } = useScrollPosition();
  const { scrollYProgress } = useScroll();
  const isScrolled = scrollPosition > 50;
  
  // Transform scroll progress to width
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  // Enhanced progress color based on section
  const getProgressColor = () => {
    switch(activeSection) {
      case 'home': return 'from-blue-500 to-cyan-500';
      case 'about': return 'from-green-500 to-emerald-500';
      case 'projects': return 'from-purple-500 to-pink-500';
      case 'skills': return 'from-orange-500 to-red-500';
      case 'contact': return 'from-indigo-500 to-purple-500';
      default: return 'from-primary-500 via-secondary-500 to-accent-500';
    }
  };

  // Network status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Hide/show navbar on scroll
  const controlNavbar = useCallback(() => {
    if (scrollPosition < lastScrollY) {
      setIsVisible(true);
    } else if (scrollPosition > 100 && scrollPosition > lastScrollY) {
      setIsVisible(false);
      setMobileMenuOpen(false);
      setSearchOpen(false);
    }
    setLastScrollY(scrollPosition);
  }, [scrollPosition, lastScrollY]);

  useEffect(() => {
    controlNavbar();
  }, [controlNavbar]);
  
  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Settings options with functionality
  const settingsOptions = [
    {
      category: "Profile",
      icon: <User className="w-4 h-4" />,
      items: [
        {
          label: "Update Profile",
          icon: <User className="w-4 h-4" />,
          action: () => {
            // Open profile update modal
            alert("Profile update feature coming soon!");
          },
          description: "Edit your personal information"
        },
        {
          label: "Change Avatar",
          icon: <Palette className="w-4 h-4" />,
          action: () => {
            // Open avatar selection
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) {
                // Handle avatar upload
                const reader = new FileReader();
                reader.onload = (e) => {
                  // Update avatar in localStorage or send to server
                  localStorage.setItem('userAvatar', e.target?.result as string);
                  alert("Avatar updated successfully!");
                };
                reader.readAsDataURL(file);
              }
            };
            input.click();
          },
          description: "Upload a new profile picture"
        },
        {
          label: "Download Resume",
          icon: <Download className="w-4 h-4" />,
          action: () => {
            // Download resume functionality
            const link = document.createElement('a');
            link.href = '/src/public/Saurabh_Resume.pdf';
            link.download = 'Saurabh_Prajapati_Resume.pdf';
            link.click();
          },
          description: "Download my latest resume"
        }
      ]
    },
    {
      category: "Preferences",
      icon: <Settings className="w-4 h-4" />,
      items: [
        {
          label: "Sound Effects",
          icon: soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />,
          toggle: true,
          value: soundEnabled,
          action: () => setSoundEnabled(!soundEnabled),
          description: "Enable/disable UI sound effects"
        },
        {
          label: "Animations",
          icon: <Zap className="w-4 h-4" />,
          toggle: true,
          value: animationsEnabled,
          action: () => setAnimationsEnabled(!animationsEnabled),
          description: "Toggle smooth animations"
        },
        {
          label: "Performance Mode",
          icon: <Monitor className="w-4 h-4" />,
          toggle: true,
          value: performanceMode,
          action: () => {
            setPerformanceMode(!performanceMode);
            // Apply performance optimizations
            if (!performanceMode) {
              document.body.style.setProperty('--animation-duration', '0.1s');
            } else {
              document.body.style.removeProperty('--animation-duration');
            }
          },
          description: "Reduce animations for better performance"
        },
        {
          label: "Auto Dark Mode",
          icon: darkModeAuto ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />,
          toggle: true,
          value: darkModeAuto,
          action: () => {
            setDarkModeAuto(!darkModeAuto);
            if (!darkModeAuto) {
              // Enable auto dark mode based on time
              const hour = new Date().getHours();
              if (hour >= 19 || hour <= 6) {
                document.documentElement.classList.add('dark');
              }
            }
          },
          description: "Automatically switch theme based on time"
        },
        {
          label: "Notifications",
          icon: <Bell className="w-4 h-4" />,
          toggle: true,
          value: notifications,
          action: () => setNotifications(!notifications),
          description: "Enable/disable browser notifications"
        },
        {
          label: "Auto Save",
          icon: <Database className="w-4 h-4" />,
          toggle: true,
          value: autoSave,
          action: () => setAutoSave(!autoSave),
          description: "Automatically save preferences"
        }
      ]
    },
    {
      category: "Contact & Social",
      icon: <Globe className="w-4 h-4" />,
      items: [
        {
          label: "Send Email",
          icon: <Mail className="w-4 h-4" />,
          action: () => {
            window.open('mailto:saurabhprajapati7756@gmail.com?subject=Hello from Portfolio&body=Hi Saurabh, I visited your portfolio and would like to connect.', '_blank');
          },
          description: "Send me an email directly"
        },
        {
          label: "GitHub Profile",
          icon: <Github className="w-4 h-4" />,
          action: () => {
            window.open('https://github.com/yourusername', '_blank');
          },
          description: "View my GitHub repositories"
        },
        {
          label: "LinkedIn",
          icon: <Linkedin className="w-4 h-4" />,
          action: () => {
            window.open('https://linkedin.com/in/yourprofile', '_blank');
          },
          description: "Connect with me on LinkedIn"
        },
        {
          label: "Schedule Call",
          icon: <Calendar className="w-4 h-4" />,
          action: () => {
            // Open calendar booking
            window.open('https://calendly.com/yourlink', '_blank');
          },
          description: "Schedule a meeting with me"
        },
        {
          label: "Location",
          icon: <MapPin className="w-4 h-4" />,
          action: () => {
            alert("📍 Based in India\n🕐 IST Timezone\n✅ Available for remote work");
          },
          description: "View my location and availability"
        }
      ]
    },
    {
      category: "Portfolio",
      icon: <Code className="w-4 h-4" />,
      items: [
        {
          label: "Share Portfolio",
          icon: <Heart className="w-4 h-4" />,
          action: () => {
            if (navigator.share) {
              navigator.share({
                title: 'Saurabh Prajapati - MERN Stack Developer',
                text: 'Check out this amazing portfolio!',
                url: window.location.href
              });
            } else {
              // Fallback to clipboard
              navigator.clipboard.writeText(window.location.href);
              alert("Portfolio link copied to clipboard!");
            }
          },
          description: "Share this portfolio with others"
        },
        {
          label: "View Source Code",
          icon: <Code className="w-4 h-4" />,
          action: () => {
            window.open('https://github.com/yourusername/portfolio', '_blank');
          },
          description: "View the source code of this portfolio"
        },
        {
          label: "Report Issue",
          icon: <Shield className="w-4 h-4" />,
          action: () => {
            window.open('https://github.com/yourusername/portfolio/issues', '_blank');
          },
          description: "Report a bug or suggest improvements"
        },
        {
          label: "Portfolio Stats",
          icon: <Star className="w-4 h-4" />,
          action: () => {
            const stats = {
              'Visit Duration': `${Math.floor(Math.random() * 5 + 1)} minutes`,
              'Sections Viewed': `${Math.floor(Math.random() * 5 + 1)}/5`,
              'Last Visit': new Date().toLocaleDateString(),
              'Browser': navigator.userAgent.split(' ')[0],
              'Screen Size': `${window.screen.width}x${window.screen.height}`
            };
            
            const statsText = Object.entries(stats)
              .map(([key, value]) => `${key}: ${value}`)
              .join('\n');
            
            alert(`📊 Portfolio Statistics\n\n${statsText}`);
          },
          description: "View your portfolio visit statistics"
        }
      ]
    },
    {
      category: "Support",
      icon: <Coffee className="w-4 h-4" />,
      items: [
        {
          label: "Buy Me Coffee",
          icon: <Coffee className="w-4 h-4" />,
          action: () => {
            window.open('https://buymeacoffee.com/yourusername', '_blank');
          },
          description: "Support my work with a coffee"
        },
        {
          label: "Clear Cache",
          icon: <RefreshCw className="w-4 h-4" />,
          action: () => {
            // Clear localStorage and sessionStorage
            localStorage.clear();
            sessionStorage.clear();
            // Clear cache if possible
            if ('caches' in window) {
              caches.keys().then(names => {
                names.forEach(name => {
                  caches.delete(name);
                });
              });
            }
            alert("Cache cleared successfully! The page will reload.");
            window.location.reload();
          },
          description: "Clear browser cache and reload"
        },
        {
          label: "Keyboard Shortcuts",
          icon: <Eye className="w-4 h-4" />,
          action: () => {
            const shortcuts = [
              'Ctrl/Cmd + K: Open search',
              'Ctrl/Cmd + /: Toggle search',
              'Ctrl/Cmd + ,: Open settings',
              'Ctrl/Cmd + D: Toggle dark mode',
              'Esc: Close modals',
              'Tab: Navigate elements',
              'Space: Scroll down',
              'Shift + Space: Scroll up'
            ];
            alert(`⌨️ Keyboard Shortcuts\n\n${shortcuts.join('\n')}`);
          },
          description: "View available keyboard shortcuts"
        }
      ]
    }
  ];

  // Keyboard shortcuts for settings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        e.preventDefault();
        setSettingsOpen(!settingsOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [settingsOpen]);

  // Save preferences to localStorage
  useEffect(() => {
    if (autoSave) {
      const preferences = {
        soundEnabled,
        animationsEnabled,
        performanceMode,
        notifications,
        darkModeAuto,
        autoSave
      };
      localStorage.setItem('userPreferences', JSON.stringify(preferences));
    }
  }, [soundEnabled, animationsEnabled, performanceMode, notifications, darkModeAuto, autoSave]);

  // Load preferences from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      const prefs = JSON.parse(savedPreferences);
      setSoundEnabled(prefs.soundEnabled ?? true);
      setAnimationsEnabled(prefs.animationsEnabled ?? true);
      setPerformanceMode(prefs.performanceMode ?? false);
      setNotifications(prefs.notifications ?? true);
      setDarkModeAuto(prefs.darkModeAuto ?? false);
      setAutoSave(prefs.autoSave ?? true);
    }
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    setMobileMenuOpen(false);
  };

  const navbarVariants = {
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    hidden: { 
      y: -100, 
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const mobileMenuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const mobileItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };
  
  // Enhanced sound effects
  const playClickSound = () => {
    if (!soundEnabled) return;
    if ('AudioContext' in window) {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  };

  const handleNavClick = (href: string) => {
    playClickSound();
    document.getElementById(href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
    setSearchOpen(false);
  };
  
  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-2xl border-b border-gray-200/30 dark:border-gray-700/30'
          : 'bg-transparent'
      }`}
      variants={navbarVariants}
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* Enhanced Reading Progress Bar */}
      <motion.div
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${getProgressColor()} origin-left shadow-lg`}
        style={{ width: progressWidth }}
      />
      
      {/* Pulse effect for progress bar */}
      <motion.div
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${getProgressColor()} origin-left opacity-30 blur-sm`}
        style={{ width: progressWidth }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Enhanced Logo with typing effect */}
        <motion.a 
          href="#home"
          className="flex items-center space-x-3 text-2xl font-bold group relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => handleNavClick('#home')}
        >
          <div className="relative">
            <motion.div 
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-2xl transition-all duration-300"
              whileHover={{ 
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.5 }
              }}
            >
              <motion.img 
                src="/author1.jpg"  // Update this line (remove /src/public)
                alt="SP Logo"
                className="w-full h-full object-cover rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
            
            {/* Rotating border - updated to circular */}
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-primary-500/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Status Indicator with pulse */}
            <motion.div
              className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-900 ${
                isOnline ? 'bg-green-500' : 'bg-red-500'
              }`}
              animate={{ 
                scale: [1, 1.3, 1],
                boxShadow: isOnline ? 
                  ["0 0 0 0 rgba(34, 197, 94, 0.7)", "0 0 0 10px rgba(34, 197, 94, 0)", "0 0 0 0 rgba(34, 197, 94, 0)"] :
                  ["0 0 0 0 rgba(239, 68, 68, 0.7)", "0 0 0 10px rgba(239, 68, 68, 0)", "0 0 0 0 rgba(239, 68, 68, 0)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          
          <div className="flex flex-col">
            <motion.span 
              className="bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 bg-clip-text text-transparent leading-tight"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Saurabh Prajapati
            </motion.span>
            <motion.span 
              className="text-xs text-gray-500 dark:text-gray-400 font-normal flex items-center gap-1"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {isOnline ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Wifi size={10} />
                </motion.div>
              ) : (
                <WifiOff size={10} />
              )}
              MERN Stack Developer
            </motion.span>
          </div>
        </motion.a>
        
        {/* Desktop Navigation with enhanced effects */}
        <motion.div 
          className="hidden md:flex items-center space-x-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <EnhancedNavLink 
                href={item.href} 
                isActive={activeSection === item.href.substring(1)}
                onClick={() => handleNavClick(item.href)}
              >
                {item.name}
              </EnhancedNavLink>
            </motion.div>
          ))}
          
          {/* Enhanced Search Button */}
          <motion.button
            className="relative p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
            onClick={toggleSearch}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Search size={18} />
            <motion.div
              className="absolute inset-0 rounded-xl bg-primary-500/10 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.2 }}
            />
          </motion.button>

          {/* Notifications */}
          <motion.div className="relative">
            <motion.button
              className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell size={18} />
              <motion.div
                className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.button>
            
            {/* Notifications Dropdown */}
            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                >
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                  </div>
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    <Bell size={24} className="mx-auto mb-2 opacity-50" />
                    <p>No new notifications</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div 
            className="ml-6 pl-6 border-l border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <ThemeToggle />
          </motion.div>
        </motion.div>
        
        {/* Mobile Controls */}
        <div className="flex items-center md:hidden space-x-3">
          <motion.button
            className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={toggleSearch}
            whileTap={{ scale: 0.9 }}
          >
            <Search size={20} />
          </motion.button>
          
          <ThemeToggle />
          
          <motion.button
            className="relative p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Menu indicator dots */}
            <motion.div 
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1"
              animate={{ scale: mobileMenuOpen ? 0 : 1 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 bg-primary-500 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </motion.div>
          </motion.button>
        </div>
      </nav>
      
      {/* Enhanced Search Bar with real-time suggestions */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search portfolio sections, skills, projects..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                  autoFocus
                />
                <motion.button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={16} />
                </motion.button>
              </div>
              
              {/* Enhanced Search Suggestions */}
              <motion.div 
                className="mt-4 space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {filteredSuggestions.map((suggestion, index) => (
                  <motion.button
                    key={suggestion.name}
                    className="w-full flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors text-left"
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      handleNavClick(`#${suggestion.name.toLowerCase()}`);
                      setSearchQuery('');
                    }}
                  >
                    <span className="text-xl">{suggestion.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{suggestion.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{suggestion.description}</p>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl shadow-2xl z-50 md:hidden border-l border-gray-200/50 dark:border-gray-700/50"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex flex-col h-full">
                {/* Enhanced Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-primary-50/50 to-secondary-50/50 dark:from-primary-900/10 dark:to-secondary-900/10">
                  <div className="flex items-center space-x-3">
                    <Globe size={20} className="text-primary-500" />
                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Navigation
                    </span>
                  </div>
                  <motion.button
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={toggleMobileMenu}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
                
                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-6">
                  <nav className="space-y-2 px-6">
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        className={`flex items-center justify-between px-4 py-4 rounded-xl text-base font-medium transition-all duration-200 ${
                          activeSection === item.href.substring(1)
                            ? 'bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 text-primary-600 dark:text-primary-400 border-l-4 border-primary-500 shadow-lg'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50/80 dark:hover:bg-gray-800/50 hover:text-primary-600 dark:hover:text-primary-400'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                        variants={mobileItemVariants}
                        whileHover={{ x: 6, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="flex items-center space-x-3">
                          <motion.div
                            className={`w-2 h-2 rounded-full ${
                              activeSection === item.href.substring(1) 
                                ? 'bg-primary-500' 
                                : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                            animate={{ 
                              scale: activeSection === item.href.substring(1) ? [1, 1.3, 1] : 1 
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                          <span>{item.name}</span>
                        </span>
                        {activeSection === item.href.substring(1) && (
                          <motion.div
                            className="text-primary-500"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            ✓
                          </motion.div>
                        )}
                      </motion.a>
                    ))}
                  </nav>
                </div>
                
                {/* Enhanced Footer */}
                <div className="p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50">
                  <div className="text-center space-y-2">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      © 2024 Saurabh Prajapati
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-500">
                      {isOnline ? (
                        <>
                          <Wifi size={12} className="text-green-500" />
                          <span>Online</span>
                        </>
                      ) : (
                        <>
                          <WifiOff size={12} className="text-red-500" />
                          <span>Offline</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Enhanced NavLink component
interface EnhancedNavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const EnhancedNavLink: React.FC<EnhancedNavLinkProps> = ({ href, children, isActive, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="hover-glow-text relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 group overflow-hidden no-underline"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className={`relative z-10 transition-colors duration-200 ${
        isActive 
          ? 'text-white font-semibold no-underline' 
          : 'text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 no-underline'
      }`}>
        {children}
      </span>
      
      {isActive && (
        <>
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 rounded-xl shadow-lg"
            layoutId="activeSection"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
          {/* Glowing effect */}
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 rounded-xl opacity-50 blur-md"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </>
      )}
      
      {!isActive && (
        <>
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            initial={false}
          />
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
        </>
      )}
    </motion.button>
  );
};

export default Navbar;