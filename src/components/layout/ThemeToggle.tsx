import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor, Palette } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { Theme } from '../../types';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const themes = [
    { id: 'light' as Theme, icon: Sun, label: 'Light', color: 'text-yellow-500' },
    { id: 'system' as Theme, icon: Monitor, label: 'System', color: 'text-blue-500' },
    { id: 'dark' as Theme, icon: Moon, label: 'Dark', color: 'text-purple-500' }
  ];
  
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsExpanded(false);
  };

  const currentTheme = themes.find(t => t.id === theme);
  
  return (
    <div className="relative">
      {/* Compact Mode */}
      <motion.div 
        className="relative"
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        <motion.button
          className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 shadow-lg hover:shadow-xl transition-all duration-200"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <motion.div
            className={`${currentTheme?.color} transition-colors duration-200`}
            animate={{ rotate: theme === 'dark' ? 180 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {currentTheme && <currentTheme.icon size={20} />}
          </motion.div>
          
          <motion.div
            className="w-1 h-1 bg-current rounded-full opacity-50"
            animate={{ scale: isExpanded ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.button>

        {/* Expanded Theme Options */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute top-full mt-2 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-2 min-w-[160px]"
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="space-y-1">
                {themes.map((themeOption, index) => (
                  <motion.button
                    key={themeOption.id}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                      theme === themeOption.id
                        ? 'bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 text-primary-700 dark:text-primary-300 font-medium'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => handleThemeChange(themeOption.id)}
                    onMouseEnter={() => setShowTooltip(themeOption.id)}
                    onMouseLeave={() => setShowTooltip(null)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className={`${themeOption.color} transition-colors duration-200`}
                      animate={{ 
                        rotate: themeOption.id === 'dark' && theme === themeOption.id ? 180 : 0,
                        scale: theme === themeOption.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <themeOption.icon size={18} />
                    </motion.div>
                    
                    <span className="text-sm font-medium">
                      {themeOption.label}
                    </span>
                    
                    {theme === themeOption.id && (
                      <motion.div
                        className="ml-auto w-2 h-2 bg-primary-500 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
              
              {/* Separator */}
              <div className="my-2 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
              
              {/* Theme Info */}
              <div className="px-3 py-2">
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <Palette size={14} />
                  <span>Appearance</span>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Choose your preferred theme
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced Tooltip */}
      <AnimatePresence>
        {showTooltip && !isExpanded && (
          <motion.div
            className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded-md whitespace-nowrap shadow-lg"
            initial={{ opacity: 0, y: 5, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {themes.find(t => t.id === showTooltip)?.label} theme
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;