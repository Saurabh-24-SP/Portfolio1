import React, { createContext, useState, useEffect, ReactNode, useCallback, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Theme, ThemePreset, ColorScheme } from '../types';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  currentColors: ColorScheme;
  setCustomColors: (colors: Partial<ColorScheme>) => void;
  applyPreset: (preset: ThemePreset) => void;
  togglePerformanceMode: () => void;
  isPerformanceMode: boolean;
}

const defaultColors: ColorScheme = {
  primary: {
    50: '#f0f9ff',  // Lighter shades
    500: '#3b82f6', // Main color
    900: '#1e3a8a', // Darker shades
  },
  // ...add more default colors
};

const themePresets: Record<ThemePreset, ColorScheme> = {
  default: defaultColors,
  ocean: {
    primary: {
      50: '#e0f7ff',
      500: '#06b6d4',
      900: '#164e63',
    },
  },
  forest: {
    primary: {
      50: '#ecfdf5',
      500: '#059669',
      900: '#064e3b',
    },
  },
  // ...add more presets
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => {},
  isDark: false,
  currentColors: defaultColors,
  setCustomColors: () => {},
  applyPreset: () => {},
  togglePerformanceMode: () => {},
  isPerformanceMode: false,
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('system');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [customColors, setCustomColors] = useState<ColorScheme>(defaultColors);
  const [isPerformanceMode, setIsPerformanceMode] = useState(false);
  const [themeTransitioning, setThemeTransitioning] = useState(false);
  const [themeStats, setThemeStats] = useState<Record<Theme, number>>({
    light: 0,
    dark: 0,
    system: 0,
  });

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Save theme to localStorage
    if (theme !== 'system') {
      localStorage.setItem('theme', theme);
    }

    // Apply theme to HTML element
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    let resolvedTheme: 'light' | 'dark';
    
    if (theme === 'system') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      resolvedTheme = theme;
    }
    
    root.classList.add(resolvedTheme);
    setIsDark(resolvedTheme === 'dark');
    
    // Listen for system theme changes if using system preference
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        const newTheme = mediaQuery.matches ? 'dark' : 'light';
        root.classList.remove('light', 'dark');
        root.classList.add(newTheme);
        setIsDark(newTheme === 'dark');
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Enhanced theme handling with transitions
  const handleThemeChange = useCallback((newTheme: Theme) => {
    setThemeTransitioning(true);
    
    // Track theme usage
    setThemeStats(prev => ({
      ...prev,
      [newTheme]: (prev[newTheme] || 0) + 1
    }));

    // Apply theme with transition
    setTimeout(() => {
      setTheme(newTheme);
      setThemeTransitioning(false);
    }, 300);
  }, []);

  // Auto theme switching based on time
  useEffect(() => {
    if (theme !== 'system') return;

    const checkTime = () => {
      const hour = new Date().getHours();
      const shouldBeDark = hour >= 18 || hour < 6;
      setIsDark(shouldBeDark);
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [theme]);

  // Performance mode handling
  const togglePerformanceMode = useCallback(() => {
    setIsPerformanceMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('performance-mode');
        // Disable animations and transitions
        document.documentElement.style.setProperty('--transition-duration', '0s');
      } else {
        document.documentElement.classList.remove('performance-mode');
        document.documentElement.style.removeProperty('--transition-duration');
      }
      return newMode;
    });
  }, []);

  // Apply custom colors
  useEffect(() => {
    Object.entries(customColors).forEach(([key, value]) => {
      Object.entries(value).forEach(([shade, color]) => {
        document.documentElement.style.setProperty(
          `--color-${key}-${shade}`,
          String(color)
        );
      });
    });
  }, [customColors]);

  // Theme transition overlay
  const TransitionOverlay = () => (
    <AnimatePresence>
      {themeTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-50"
          transition={{ duration: 0.3 }}
        />
      )}
    </AnimatePresence>
  );

  const value = {
    theme,
    setTheme: handleThemeChange,
    isDark,
    currentColors: customColors,
    setCustomColors: (colors: Partial<ColorScheme>) => 
      setCustomColors(prev => ({ ...prev, ...colors })),
    applyPreset: (preset: ThemePreset) => 
      setCustomColors(themePresets[preset]),
    togglePerformanceMode,
    isPerformanceMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      <TransitionOverlay />
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
  return useContext(ThemeContext);
};