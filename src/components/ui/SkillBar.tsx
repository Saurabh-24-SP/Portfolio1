import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../types';

interface SkillBarProps {
  skill: Skill;
  index: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  highlight?: boolean;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, index, isFavorite, onToggleFavorite, highlight }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className={`mb-6 group cursor-pointer hover-glow-box ${highlight ? 'bg-yellow-50 dark:bg-yellow-900' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex justify-between mb-3">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center relative overflow-hidden"
            whileHover={{ 
              scale: 1.2, 
              rotate: 10,
              backgroundColor: "rgba(59, 130, 246, 0.2)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/20 to-primary-500/0"
              animate={{ 
                x: ['-100%', '100%']
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
            />
            <motion.div 
              className="absolute inset-0 rounded-lg opacity-0"
              animate={{ 
                boxShadow: ["0 0 0 rgba(59, 130, 246, 0)", "0 0 15px rgba(59, 130, 246, 0.5)", "0 0 0 rgba(59, 130, 246, 0)"],
                opacity: [0, 0.5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.span 
              className="text-lg relative z-10"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {getSkillIcon(skill.name)}
            </motion.span>
          </motion.div>
          
          <motion.span 
            className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-200"
            whileHover={{ x: 5 }}
          >
            {skill.name}
          </motion.span>
        </div>
        
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.1 }}
        >
          <motion.span 
            className="text-gray-600 dark:text-gray-400 font-medium"
            animate={{ 
              color: isHovered ? "#3b82f6" : undefined
            }}
          >
            {skill.level}%
          </motion.span>
          
          <motion.div
            className="w-2 h-2 rounded-full bg-primary-500 relative"
            animate={{
              scale: isHovered ? [1, 1.5, 1] : 1,
              opacity: isHovered ? [1, 0.5, 1] : 1
            }}
            transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0 }}
          >
            <motion.div 
              className="absolute inset-0 rounded-full bg-primary-500 blur-sm"
              animate={{ 
                scale: [1, 1.8, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Enhanced Progress Bar */}
      <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" />
        </div>
        
        {/* Main Progress Bar */}
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{
            background: `linear-gradient(90deg, 
              rgb(59, 130, 246) 0%, 
              rgb(139, 92, 246) 50%,
              rgb(20, 184, 166) 100%)`
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ 
            duration: 1.5, 
            delay: 0.2 + index * 0.1, 
            ease: "easeOut" 
          }}
          whileHover={{
            boxShadow: [
              "0 0 20px rgba(59, 130, 246, 0.5)",
              "0 0 30px rgba(139, 92, 246, 0.7)",
              "0 0 20px rgba(59, 130, 246, 0.5)"
            ]
          }}
        >
          {/* Animated Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: isHovered ? ['-100%', '100%'] : '-100%'
            }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 0.5
            }}
          />
          
          {/* Floating Particles */}
          {isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 w-1 h-1 bg-white rounded-full"
                  initial={{ 
                    x: `${Math.random() * 100}%`, 
                    y: '-50%',
                    opacity: 0 
                  }}
                  animate={{
                    y: ['-50%', '-200%', '-50%'],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </>
          )}
        </motion.div>
        
        {/* Skill Level Indicator */}
        <motion.div
          className="absolute top-0 h-full w-0.5 bg-white/80 rounded-full"
          initial={{ left: 0 }}
          animate={{ left: `${skill.level}%` }}
          transition={{ 
            duration: 1.5, 
            delay: 0.2 + index * 0.1,
            ease: "easeOut" 
          }}
        >
          <motion.div
            className="absolute -top-1 -left-1 w-3 h-3 bg-white rounded-full shadow-lg"
            animate={{
              scale: isHovered ? [1, 1.3, 1] : 1,
              boxShadow: isHovered 
                ? ["0 0 0 0 rgba(59, 130, 246, 0.7)", "0 0 0 10px rgba(59, 130, 246, 0)"]
                : "0 2px 4px rgba(0,0,0,0.2)"
            }}
            transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
          />
        </motion.div>
      </div>
      
      {/* Skill Description on Hover */}
      <motion.div
        className="mt-2 text-xs text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          height: isHovered ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {getSkillDescription(skill.name, skill.level)}
      </motion.div>
    </motion.div>
  );
};

// Helper functions
const getSkillIcon = (skillName: string): string => {
  const icons: { [key: string]: string } = {
    'React': '⚛️',
    'TypeScript': '🔷',
    'JavaScript': '🟨',
    'HTML5': '🧱',
    'CSS3': '🎨',
    'Tailwind CSS': '💨',
    'Next.js': '▲',
    'Node.js': '🟢',
    'Express': '🚂',
    'MongoDB': '🍃',
    'PostgreSQL': '🐘',
    'Firebase': '🔥',
    'Figma': '🎯',
    'Adobe XD': '🎨',
    'Git': '📦',
    'Docker': '🐳',
    'AWS': '☁️',
  };
  return icons[skillName] || '💻';
};

const getSkillDescription = (skillName: string, level: number): string => {
  if (level >= 90) return `Expert level - Leading projects with ${skillName}`;
  if (level >= 80) return `Advanced - Highly proficient in ${skillName}`;
  if (level >= 70) return `Intermediate - Solid understanding of ${skillName}`;
  return `Learning - Growing skills in ${skillName}`;
};

export default SkillBar;