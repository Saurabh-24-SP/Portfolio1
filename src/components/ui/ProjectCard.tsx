import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ArrowRight } from 'lucide-react';
import { Project } from '../../types';
import Button from './Button';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <>
      <motion.div
        className="project-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg group cursor-pointer"
        whileHover={{ 
          y: -12,
          boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
          scale: 1.02
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={openModal}
      >
        <div className="relative h-52 overflow-hidden">
          <motion.img 
            src={project.image} 
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'blur-0' : 'blur-sm'
            }`}
            onLoad={() => setImageLoaded(true)}
            whileHover={{ scale: 1.15 }}
          />
          
          {/* Animated Overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Featured Badge */}
          {project.featured && (
            <motion.div 
              className="absolute top-3 right-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md"
              whileHover={{ scale: 1.1, rotate: 5 }}
              animate={{ 
                boxShadow: [
                  "0 4px 14px rgba(59, 130, 246, 0.3)",
                  "0 6px 20px rgba(139, 92, 246, 0.4)",
                  "0 4px 14px rgba(59, 130, 246, 0.3)"
                ],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                boxShadow: { duration: 2, repeat: Infinity },
                scale: { duration: 3, repeat: Infinity }
              }}
            >
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ⭐
              </motion.span>
              <span className="ml-1">Featured</span>
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 blur-md"
                animate={{ 
                  opacity: [0, 0.3, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          )}
          
          {/* Interactive Overlay Content */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white px-6 py-3 rounded-full font-medium shadow-lg transition-all duration-200 flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                openModal();
              }}
            >
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                View Details
              </motion.span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
          
          {/* Tech Icons Floating */}
          <motion.div 
            className="absolute bottom-3 left-3 flex gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {project.technologies.slice(0, 3).map((tech, index) => (
              <motion.span
                key={tech}
                className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0
                }}
                transition={{ 
                  duration: 0.3, 
                  delay: isHovered ? index * 0.1 : 0 
                }}
                whileHover={{ scale: 1.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
        
        <div className="p-6">
          <motion.h3 
            className="text-xl font-bold mb-2 group-hover:text-primary-500 transition-colors duration-200"
            whileHover={{ x: 5 }}
          >
            {project.title}
          </motion.h3>
          
          <motion.p 
            className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2"
            whileHover={{ color: "#6b7280" }}
          >
            {project.description}
          </motion.p>
          
          <div className="flex flex-wrap gap-2 mb-5">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <motion.span 
                key={tech} 
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  color: "#3b82f6"
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 3 && (
              <motion.span 
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium"
                whileHover={{ scale: 1.05 }}
              >
                +{project.technologies.length - 3}
              </motion.span>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            {project.liveUrl && (
              <motion.a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm flex items-center gap-1 transition-all duration-200"
                whileHover={{ scale: 1.05, x: 5 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.span
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  🚀
                </motion.span>
                Live Demo
                <ExternalLink size={14} />
              </motion.a>
            )}
            
            {project.sourceUrl && (
              <motion.a 
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 font-medium text-sm flex items-center gap-1 transition-all duration-200"
                whileHover={{ scale: 1.05, x: -5 }}
                onClick={(e) => e.stopPropagation()}
              >
                Source
                <Github size={14} />
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Improved Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="h-72 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </div>
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span 
                        key={tech} 
                        className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>
                </div>
                
                <button
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  onClick={closeModal}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8">
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                  {project.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  {project.liveUrl && (
                    <Button 
                      variant="primary"
                      icon={<ExternalLink size={18} />}
                      onClick={() => window.open(project.liveUrl, '_blank')}
                      className="shadow-lg shadow-primary-500/20"
                    >
                      Live Demo
                    </Button>
                  )}
                  
                  {project.sourceUrl && (
                    <Button 
                      variant="outline"
                      icon={<Github size={18} />}
                      onClick={() => window.open(project.sourceUrl, '_blank')}
                    >
                      Source Code
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;