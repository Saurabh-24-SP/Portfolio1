export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
  featured: boolean;
}

export interface Skill {
  keywords: any;
  proficiency: any;
  name: string;
  icon: string;
  level: number;
  category: 'frontend' | 'backend' | 'design' | 'other';
}

export interface ExperienceItem {
  skills: any;
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string[];
  technologies: string[];
  type: 'work' | 'education';
  grade?: string;  // Optional grade/percentage for education items
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface NavItem {
  name: string;
  href: string;
}

export type Theme = 'light' | 'dark' | 'system';
export type ThemePreset = 'default' | 'ocean' | 'forest';

export interface ColorShades {
  50: string;
  500: string;
  900: string;
}

export interface ColorScheme {
  primary: ColorShades;
  // Add more color categories as needed
}