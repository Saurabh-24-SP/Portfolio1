import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ 
  id, 
  title, 
  subtitle, 
  children, 
  className = '' 
}) => {
  return (
    <section
      id={id}
      className={`py-20 md:py-28 ${className}`}
    >
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeading title={title} subtitle={subtitle} />
        {children}
      </motion.div>
    </section>
  );
};

export default Section;