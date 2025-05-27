import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Search, Filter, X, ChevronDown, Star, Code2, Palette, Database, Terminal, Globe, Zap, Eye, Target, TrendingUp, Award, Layers, Monitor, Server, Wrench } from 'lucide-react';
import Section from '../ui/Section';
import SkillBar from '../ui/SkillBar';
import { skills } from '../../data/skills';

// Fix type definition - remove duplicate type
import type { Skill } from '../../types';

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [favoriteSkills, setFavoriteSkills] = useState<string[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string | null>(null);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Enhanced categories with proper icons and styling
  const categories = [
    { 
      id: 'all', 
      name: 'All Skills', 
      icon: <Globe className="w-5 h-5" />, 
      color: 'from-blue-500 to-purple-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/10',
      count: skills.length
    },
    { 
      id: 'frontend', 
      name: 'Frontend', 
      icon: <Monitor className="w-5 h-5" />, 
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50 dark:bg-pink-900/10',
      count: skills.filter(skill => skill.category === 'frontend').length
    },
    { 
      id: 'backend', 
      name: 'Backend', 
      icon: <Server className="w-5 h-5" />, 
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/10',
      count: skills.filter(skill => skill.category === 'backend').length
    },
    { 
      id: 'tools', 
      name: 'Tools & DevOps', 
      icon: <Wrench className="w-5 h-5" />, 
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/10',
      count: skills.filter(skill => skill.category === 'tools').length
    },
    { 
      id: 'design', 
      name: 'Design', 
      icon: <Palette className="w-5 h-5" />, 
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/10',
      count: skills.filter(skill => skill.category === 'design').length
    },
  ];

  // Categorized skills data
  const categorizedSkills = {
    frontend: skills.filter(skill => skill.category === 'frontend'),
    backend: skills.filter(skill => skill.category === 'backend'),
    tools: skills.filter(skill => skill.category === 'tools'),
    design: skills.filter(skill => skill.category === 'design'),
  };
  
  // Filtered skills based on category and search term
  const filteredSkills = skills
    .filter(skill => activeCategory === 'all' || skill.category === activeCategory)
    .filter(skill => 
      searchTerm === '' || 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (skill.keywords && skill.keywords.some((keyword: string) => 
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );
  
  // Featured skills to highlight
  const featuredSkills = skills.filter(skill => skill.proficiency >= 90).slice(0, 4);
  
  // Toggle favorite skill
  const toggleFavorite = (skillName: string) => {
    setFavoriteSkills(prev => 
      prev.includes(skillName) 
        ? prev.filter(name => name !== skillName)
        : [...prev, skillName]
    );
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      }
    }
  };
  
  // Mouse tracking for enhanced effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Section
      id="skills"
      title="Technical Expertise"
      subtitle="Crafting digital solutions with modern technologies"
      className="bg-black/[0.02] dark:bg-white/[0.02] relative overflow-hidden"
    >
      {/* Sophisticated background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      {/* Dynamic gradient blob */}
      <motion.div 
        className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3) 0%, transparent 70%)`
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10" ref={sectionRef}>
        {/* Featured Skills Section */}
        <motion.div 
          className="mb-14 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 flex items-center">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Featured Skills</h3>
            <div className="ml-4 h-px flex-grow bg-gradient-to-r from-primary-500/50 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredSkills.map((skill: Skill, index: number) => (
              <motion.div 
                key={skill.name}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700 relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 12px 20px -5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <motion.div 
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                />
                
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-3">
                    {skill.icon ? (
                      <img 
                        src={`/icons/${skill.icon}`} 
                        alt={skill.name} 
                        className="w-6 h-6 object-contain"
                        onError={(e) => {
                          // Fallback to emoji if image fails to load
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-lg">💻</span>
                    )}
                  </div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 flex-1 truncate">{skill.name}</h4>
                  <motion.button 
                    className="ml-auto text-gray-400 hover:text-yellow-500 dark:text-gray-500 dark:hover:text-yellow-400 transition-colors flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(skill.name);
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Toggle favorite for ${skill.name}`}
                  >
                    <Star 
                      size={16} 
                      fill={favoriteSkills.includes(skill.name) ? 'currentColor' : 'none'} 
                    />
                  </motion.button>
                </div>
                
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 1, ease: "easeOut" }}
                  />
                </div>
                
                <motion.div
                  className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary-500/10 to-transparent rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    rotate: [0, 10, 0],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Search and Filter Controls */}
        <motion.div 
          className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search skills..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all duration-200"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsSearching(true);
              }}
              onFocus={() => setIsSearching(true)}
              onBlur={() => setTimeout(() => setIsSearching(false), 200)}
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <X size={16} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
              </button>
            )}
            
            {isSearching && (
              <motion.div 
                className="absolute mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-2 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                  Try searching for React, MongoDB, CSS, etc.
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {searchTerm && filteredSkills.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                      No skills found matching "{searchTerm}"
                    </div>
                  ) : (
                    filteredSkills.slice(0, 5).map((skill: Skill) => (
                      <div 
                        key={skill.name} 
                        className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                        onClick={() => {
                          setSearchTerm(skill.name);
                          setIsSearching(false);
                        }}
                      >
                        {skill.icon ? (
                          <img 
                            src={`/icons/${skill.icon}`} 
                            alt={skill.name} 
                            className="w-5 h-5 mr-3 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <span className="w-5 h-5 mr-3 text-sm">💻</span>
                        )}
                        <span className="text-gray-700 dark:text-gray-200 flex-1 truncate">{skill.name}</span>
                        <div className="ml-auto text-xs text-gray-400">{skill.category}</div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="relative md:self-start">
            <div className="md:hidden">
              <motion.button
                className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
                onClick={() => setShowDropdown(!showDropdown)}
                whileTap={{ scale: 0.97 }}
              >
                <Filter size={16} className="mr-2 text-gray-500" />
                <span>{categories.find(c => c.id === activeCategory)?.name || 'All Skills'}</span>
                <ChevronDown size={16} className="ml-2 text-gray-500" />
              </motion.button>
              
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    className="absolute mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {categories.map(category => (
                      <div
                        key={category.id}
                        className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => {
                          setActiveCategory(category.id);
                          setShowDropdown(false);
                        }}
                      >
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="hidden md:flex md:flex-wrap md:justify-center gap-3">
              {categories.map(category => (
                <motion.button
                  id={`category-${category.id}`}
                  key={category.id}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 relative ${
                    activeCategory === category.id 
                      ? 'text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeCategory === category.id && (
                    <motion.span 
                      className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-full`}
                      layoutId="activeCategory"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center">
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Results Summary */}
        {searchTerm && (
          <motion.div 
            className="mb-6 text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Found {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''} matching "{searchTerm}"
            {activeCategory !== 'all' && ` in ${categories.find(c => c.id === activeCategory)?.name}`}
            <button 
              className="ml-2 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              onClick={() => setSearchTerm('')}
            >
              Clear search
            </button>
          </motion.div>
        )}
        
        {/* Skills Display by Category */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {activeCategory === 'all' ? (
              // All Categories View
              <div className="space-y-16">
                {Object.entries(categorizedSkills).map(([categoryKey, categorySkills]) => {
                  const categoryConfig = categories.find(c => c.id === categoryKey);
                  if (!categoryConfig || categorySkills.length === 0) return null;

                  return (
                    <motion.div
                      key={categoryKey}
                      className="relative"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Category Header */}
                      <div className="flex items-center gap-4 mb-8">
                        <motion.div
                          className={`p-4 rounded-2xl bg-gradient-to-br ${categoryConfig.color} text-white shadow-lg`}
                          whileHover={{ scale: 1.1, rotate: 10 }}
                        >
                          {categoryConfig.icon}
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {categoryConfig.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {categorySkills.length} skills
                          </p>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600" />
                      </div>

                      {/* Skills Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categorySkills.map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/20 dark:border-gray-700/20 hover:border-gray-300/40 dark:hover:border-gray-600/40 transition-all duration-500 overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            onHoverStart={() => setHoveredSkill(skill.name)}
                            onHoverEnd={() => setHoveredSkill(null)}
                          >
                            {/* Skill Header */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <motion.div
                                  className={`p-2 rounded-lg ${categoryConfig.bgColor}`}
                                  whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                  {skill.icon ? (
                                    <img 
                                      src={`/icons/${skill.icon}`} 
                                      alt={skill.name} 
                                      className="w-6 h-6 object-contain"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                      }}
                                    />
                                  ) : (
                                    <Code2 className="w-6 h-6 text-gray-500" />
                                  )}
                                </motion.div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                    {skill.name}
                                  </h4>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {skill.category}
                                  </p>
                                </div>
                              </div>
                              
                              <motion.button
                                className="text-gray-400 hover:text-yellow-500 transition-colors"
                                onClick={() => toggleFavorite(skill.name)}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Star 
                                  size={16} 
                                  fill={favoriteSkills.includes(skill.name) ? 'currentColor' : 'none'} 
                                />
                              </motion.button>
                            </div>

                            {/* Proficiency Bar */}
                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600 dark:text-gray-400">Proficiency</span>
                                <span className="font-semibold text-gray-900 dark:text-gray-100">
                                  {skill.proficiency}%
                                </span>
                              </div>
                              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                  className={`h-full bg-gradient-to-r ${categoryConfig.color} rounded-full relative overflow-hidden`}
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.proficiency}%` }}
                                  viewport={{ once: true }}
                                  transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
                                >
                                  <motion.div
                                    className="absolute inset-0 bg-white/30"
                                    animate={{ x: ['0%', '100%', '0%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                  />
                                </motion.div>
                              </div>
                            </div>

                            {/* Keywords/Tags */}
                            {skill.keywords && skill.keywords.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {skill.keywords.slice(0, 3).map((keyword: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, keyIndex: React.Key | null | undefined) => (
                                  <span
                                    key={keyIndex}
                                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md"
                                  >
                                    {keyword}
                                  </span>
                                ))}
                                {skill.keywords.length > 3 && (
                                  <span className="px-2 py-1 text-xs text-gray-500">
                                    +{skill.keywords.length - 3}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Hover Effects */}
                            <motion.div
                              className={`absolute inset-0 bg-gradient-to-br ${categoryConfig.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
                            />
                            
                            {hoveredSkill === skill.name && (
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
                                animate={{ x: ['0%', '100%'] }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                              />
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              // Single Category View
                <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                >
                {filteredSkills.map((skill, index) => (
                  <SkillBar 
                  key={skill.name} 
                  skill={skill} 
                  index={index} 
                  isFavorite={favoriteSkills.includes(skill.name)}
                  onToggleFavorite={() => toggleFavorite(skill.name)}
                  highlight={searchTerm ? skill.name.toLowerCase().includes(searchTerm.toLowerCase()) : undefined}
                  />
                ))}
                </motion.div>
            )}

            {/* Empty State */}
            {filteredSkills.length === 0 && activeCategory !== 'all' && (
              <motion.div 
                className="text-center py-20 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-300/50 dark:border-gray-600/50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="inline-flex p-6 mb-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-3xl"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Search className="w-12 h-12 text-blue-500" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  No skills found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                  Try adjusting your search criteria or browse different categories.
                </p>
                
                <motion.button
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all"
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Show All Skills
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
};

export default Skills;