import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { ExperienceItem } from '../../types';

interface TimelineItemProps {
  item: ExperienceItem;
  index: number;
  isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, index, isLast }) => {
  const isEven = index % 2 === 0;
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };
  
  return (
    <motion.div
      className="flex md:contents"
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={variants}
    >
      {/* Timeline for larger screens */}
      <div className="hidden md:block col-start-1 col-end-2 md:mx-auto relative">
        <div className="h-full w-6 flex items-center justify-center">
          <div className="h-full w-0.5 bg-gray-300 dark:bg-gray-700 pointer-events-none"></div>
        </div>
        <div className="w-6 h-6 absolute top-1/2 -mt-3 bg-primary-500 dark:bg-primary-400 rounded-full"></div>
      </div>
      
      <div className={`col-start-2 col-end-12 p-4 rounded-xl my-4 md:mr-auto ${isEven ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'} w-full md:w-5/6 bg-white dark:bg-gray-800 shadow-md`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
          <h3 className="font-bold text-xl">{item.title}</h3>
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mt-1 md:mt-0">
            <Calendar size={16} className="mr-1" />
            <span>{item.startDate} - {item.endDate}</span>
          </div>
        </div>
        
        <div className="flex items-center mb-3 text-gray-600 dark:text-gray-400">
          <h4 className="font-medium">{item.company}</h4>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            <MapPin size={16} className="mr-1" />
            <span>{item.location}</span>
          </div>
        </div>
        
        <ul className="list-disc pl-5 mb-3 space-y-1 text-gray-700 dark:text-gray-300">
          {item.description.map((desc, i) => (
            <li key={i}>{desc}</li>
          ))}
        </ul>
        
        <div className="flex flex-wrap gap-2">
          {item.technologies.map((tech) => (
            <span 
              key={tech} 
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {/* Mobile timeline dot (only visible on small screens) */}
      {!isLast && (
        <div className="md:hidden h-8 w-6 flex items-center justify-center -mt-4">
          <div className="h-full w-0.5 bg-gray-300 dark:bg-gray-700 pointer-events-none"></div>
        </div>
      )}
    </motion.div>
  );
};

export default TimelineItem;