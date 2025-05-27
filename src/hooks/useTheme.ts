import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Theme } from '../types';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

export const useToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'system') {
      const systemTheme: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
      setTheme(systemTheme);
    }
  };
  
  return { toggleTheme };
};