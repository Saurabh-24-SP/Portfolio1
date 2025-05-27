import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../ui/Section';
import ProjectCard from '../ui/ProjectCard';
import { projects } from '../../data/projects';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  
  // Extract unique technologies from all projects
  const allTechnologies = Array.from(
    new Set(projects.flatMap(project => project.technologies))
  );
  
  // Filter projects based on selected technology
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.technologies.includes(filter));
  
  return (
    <Section
      id="projects"
      title="My Projects"
      subtitle="Check out some of my recent work"
    >
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <FilterButton 
          active={filter === 'all'} 
          onClick={() => setFilter('all')}
        >
          All Projects
        </FilterButton>
        
        {allTechnologies.slice(0, 5).map(tech => (
          <FilterButton 
            key={tech}
            active={filter === tech} 
            onClick={() => setFilter(tech)}
          >
            {tech}
          </FilterButton>
        ))}
      </div>
      
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
        
        {filteredProjects.length === 0 && (
          <motion.div 
            className="col-span-full text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No projects found with the selected filter.
            </p>
          </motion.div>
        )}
      </div>
    </Section>
  );
};

interface FilterButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ children, active, onClick }) => {
  return (
    <motion.button
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
        active 
          ? 'bg-primary-500 text-white'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default Projects;