import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Filter, Award, Clock, Building } from 'lucide-react';
import Section from '../ui/Section';
import TimelineItem from '../ui/TimelineItem';
import { experience } from '../../data/education';

type ExperienceItem = {
  id: string;
  type: 'work' | 'education';
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string[];
  skills?: string[];
};

const Experience: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Get unique years from experience data
  const allYears = [...new Set(experience.map(item => {
    const startYear = new Date(item.startDate).getFullYear().toString();
    const endYear = item.endDate ? new Date(item.endDate).getFullYear().toString() : 'Present';
    return [startYear, endYear];
  }).flat())].sort((a, b) => {
    if (a === 'Present') return -1;
    if (b === 'Present') return 1;
    return parseInt(b) - parseInt(a);
  });
  
  // Filter experience items based on active type and selected years
  const filteredExperience = experience
    .filter(item => item.type === 'education')
    .filter(item => {
      if (selectedYears.length === 0) return true;
      
      const startYear = new Date(item.startDate).getFullYear().toString();
      const endYear = item.endDate ? new Date(item.endDate).getFullYear().toString() : 'Present';
      
      return selectedYears.some(year => {
        if (year === 'Present' && endYear === 'Present') return true;
        if (year === startYear || year === endYear) return true;
        if (parseInt(year) > parseInt(startYear) && (endYear === 'Present' || parseInt(year) < parseInt(endYear))) return true;
        return false;
      });
    });
  
  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };
  
  const toggleYearFilter = (year: string) => {
    setSelectedYears(prev => 
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
  };
  
  // Reset filters when type changes
  useEffect(() => {
    setSelectedYears([]);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };
  
  // Additional interactive features
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressValue = useMotionValue(0);
  const timelineProgress = useTransform(progressValue, [0, 1], ["0%", "100%"]);
  
  // Calculate experience stats
  const stats = useMemo(() => {
    const educationExperience = experience;
    const locations = new Set(experience.map(item => item.location));
    
    return {
      education: educationExperience.length,
      locations: locations.size,
      yearsRange: `${allYears[allYears.length-1]} - ${allYears[0]}`,
      skills: new Set(experience.flatMap(item => item.technologies || [])).size
    };
  }, [experience, allYears]);
  
  // Track scroll progress for timeline animation
  useEffect(() => {
    const updateTimelineProgress = () => {
      if (!timelineRef.current) return;
      
      const { top, height } = timelineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how much of the timeline is visible
      const visibleStart = Math.max(0, top < 0 ? -top : 0);
      const visibleEnd = Math.min(height, viewportHeight - top);
      const visibleHeight = visibleEnd - visibleStart;
      
      // Calculate progress (0 to 1)
      const progress = Math.min(1, Math.max(0, visibleHeight / height));
      progressValue.set(progress);
    };
    
    window.addEventListener('scroll', updateTimelineProgress);
    updateTimelineProgress(); // Initial calculation
    
    return () => window.removeEventListener('scroll', updateTimelineProgress);
  }, [progressValue]);
  
  // Pre-expand the first item when the section comes into view
  useEffect(() => {
    if (isInView && filteredExperience.length > 0 && expandedItems.length === 0) {
      setExpandedItems([filteredExperience[0].id]);
    }
  }, [isInView, filteredExperience, expandedItems]);
  
  // Handle hover over timeline items
  const handleItemHover = (index: number | null) => {
    setActiveIndex(index);
  };
  
  // Enhanced animation variants
  const statCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: 0.1 * i,
        ease: [0.43, 0.13, 0.23, 0.96] // Custom easing
      }
    })
  };
  
  // Generate timeline markers for important years
  const timelineMarkers = useMemo(() => {
    if (allYears.length <= 2) return [];
    
    // Create markers for significant years (first, last, and some in between)
    const markers = [];
    const totalYears = allYears.filter(y => y !== 'Present').length;
    
    // Add first and last year
    markers.push(allYears[allYears.length - 1]);
    
    // Add some years in between for longer timelines
    if (totalYears > 3) {
      const middleIndex = Math.floor(allYears.length / 2);
      markers.push(allYears[middleIndex]);
    }
    
    // Add current year/present
    if (allYears[0] === 'Present') {
      markers.push('Present');
    } else {
      markers.push(allYears[0]);
    }
    
    return markers;
  }, [allYears]);

  return (
    <Section
      id="education"
      title="Education"
      subtitle="My academic journey and achievements"
      className="relative overflow-hidden"
    >
      {/* Enhanced background elements */}
      <motion.div 
        className="absolute top-0 -right-20 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl z-0"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary-500/5 rounded-full blur-3xl z-0"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      {/* Animated particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-primary-500/20 dark:bg-primary-400/20 z-0"
          style={{
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * -100 - 50],
            x: [0, Math.random() * 40 - 20],
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0.5]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}
      
      <div className="relative z-10" ref={sectionRef}>
        {/* Enhanced Stats Cards */}
        <div className="mb-10">
          <motion.h3
            className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Award className="w-5 h-5 mr-2 text-primary-500" />
            Education Overview
            <motion.div 
              className="ml-3 h-px flex-grow bg-gradient-to-r from-primary-500/50 to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { 
                icon: <GraduationCap className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />, 
                label: "Education", 
                value: stats.education, 
                color: "bg-secondary-100 dark:bg-secondary-900/30",
                detail: "Degrees & Certifications"
              },
              { 
                icon: <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />, 
                label: "Companies", 
                value: stats.education, 
                color: "bg-blue-100 dark:bg-blue-900/30",
                detail: `${stats.skills} skills acquired`
              },
              { 
                icon: <MapPin className="w-6 h-6 text-amber-600 dark:text-amber-400" />, 
                label: "Locations", 
                value: stats.locations, 
                color: "bg-amber-100 dark:bg-amber-900/30",
                detail: stats.yearsRange
              }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={statCardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                  transition: { duration: 0.2 }
                }}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col relative overflow-hidden group"
              >
                <div className={`p-3 ${stat.color} rounded-lg self-start mb-2 relative overflow-hidden`}>
                  {stat.icon}
                  <motion.div 
                    className="absolute inset-0 bg-white/30 dark:bg-white/10"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                
                <p className="text-gray-500 dark:text-gray-400 text-xs">{stat.label}</p>
                <div className="flex items-end justify-between mt-1">
                  <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{stat.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.detail}</p>
                </div>
                
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Enhanced filters with interactive animations */}
        <motion.div 
          className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Enhanced Year filter with tooltips */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-1 text-secondary-500" />
                Filter by Year
              </p>
              <div className="flex flex-wrap gap-2">
                {allYears.map(year => (
                  <motion.button
                    key={year}
                    className={`px-3 py-1 text-sm rounded-full relative transition-all duration-200 ${
                      selectedYears.includes(year)
                        ? 'bg-secondary-500 text-white shadow-md shadow-secondary-500/20'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                    }`}
                    onClick={() => toggleYearFilter(year)}
                    onHoverStart={() => setHoveredYear(year)}
                    onHoverEnd={() => setHoveredYear(null)}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {year}
                    {selectedYears.includes(year) && (
                      <motion.span
                        className="absolute top-0 right-0 -mt-1 -mr-1 w-2 h-2 bg-red-500 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      />
                    )}
                    <AnimatePresence>
                      {hoveredYear === year && (
                        <motion.div
                          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap z-20"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {filteredExperience.filter(item => {
                            const startYear = new Date(item.startDate).getFullYear().toString();
                            const endYear = item.endDate ? new Date(item.endDate).getFullYear().toString() : 'Present';
                            return year === startYear || year === endYear || 
                              (parseInt(year) > parseInt(startYear) && 
                               (endYear === 'Present' || parseInt(year) < parseInt(endYear)));
                          }).length} items from {year}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
                
                {selectedYears.length > 0 && (
                  <motion.button
                    className="px-3 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/50 flex items-center"
                    onClick={() => setSelectedYears([])}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <span>Clear ({selectedYears.length})</span>
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Results summary with enhanced animation */}
        <AnimatePresence>
          {(selectedYears.length > 0) && (
            <motion.div 
              className="mb-6 py-2 px-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 flex items-center"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="p-1 bg-primary-100 dark:bg-primary-900/30 rounded-full mr-2 text-primary-500"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                <Filter size={14} />
              </motion.div>
              <span>
                Found <strong>{filteredExperience.length}</strong> item{filteredExperience.length !== 1 ? 's' : ''}
                {selectedYears.length > 0 && <> from <span className="font-medium text-secondary-600 dark:text-secondary-400">{selectedYears.join(', ')}</span></>}
              </span>
              
              <motion.button 
                className="ml-auto text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 flex items-center"
                onClick={() => {
                  setSelectedYears([]);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      
        {/* Enhanced Interactive Timeline */}
        <motion.div 
          className="mt-6 md:mt-12 relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          ref={timelineRef}
        >
          {/* Animated progress Timeline center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 z-0" />
          <motion.div 
            className="hidden md:block absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500 z-0 origin-top"
            style={{ height: timelineProgress }}
          />
          
          {/* Year markers on timeline */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 z-0">
            {timelineMarkers.map((year, index) => {
              // Calculate position ratio (0 to 1) based on index
              const position = index / (timelineMarkers.length - 1);
              
              return (
                <motion.div 
                  key={year}
                  className="absolute left-0 transform -translate-x-full -translate-y-1/2 flex items-center gap-2"
                  style={{ top: `${position * 100}%` }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                    {year}
                  </span>
                  <div className="w-2 h-2 bg-primary-500 rounded-full" />
                </motion.div>
              );
            })}
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedYears.join('-')}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-8"
            >
              {filteredExperience.length > 0 ? (
                filteredExperience.map((item, index) => (
                  <TimelineItem 
                    key={item.id} 
                    item={item} 
                    index={index}
                    isLast={index === filteredExperience.length - 1}
                    isExpanded={expandedItems.includes(item.id)}
                    isActive={activeIndex === index}
                    onHover={() => handleItemHover(index)}
                    onLeave={() => handleItemHover(null)}
                    toggleExpand={() => toggleExpand(item.id)}
                  />
                ))
              ) : (
                // Enhanced empty state
                <motion.div 
                  className="col-span-full text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 relative overflow-hidden"
                  variants={itemVariants}
                >
                  <div className="absolute inset-0 bg-pattern-grid opacity-5" />
                  
                  <motion.div 
                    className="inline-flex p-4 mb-4 bg-gray-100 dark:bg-gray-700 rounded-full relative"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.2 }}
                  >
                    <GraduationCap className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                    
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-600 opacity-0"
                      animate={{ 
                        opacity: [0, 0.5, 0],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    No items found
                  </motion.h3>
                  
                  <motion.p 
                    className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    No education items found with the current filters.
                    Try adjusting your search criteria.
                  </motion.p>
                  
                  <motion.button
                    className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg shadow-lg relative overflow-hidden group"
                    onClick={() => {
                      setSelectedYears([]);
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span className="relative z-10 flex items-center">
                      <Filter size={16} className="mr-2" />
                      Reset Filters
                    </span>
                    
                    {/* Shimmer effect */}
                    <motion.div 
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out"
                    />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </Section>
  );
};

export default Experience;