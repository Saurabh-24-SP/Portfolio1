import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Saurabh', 'Prajapati'];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentWord < words.length - 1) {
        setCurrentWord(currentWord + 1);
      } else {
        setTimeout(onComplete, 1000);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [currentWord, onComplete]);
  
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8,
      rotateX: -90
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }),
    exit: {
      opacity: 0,
      y: -50,
      scale: 1.2,
      transition: {
        duration: 0.5
      }
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-secondary-100 to-accent-100 dark:from-secondary-900/20 dark:to-accent-900/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Logo/Image */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1.2,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
        >
          <motion.img
            src="/src/public/author1.jpg"
            alt="Saurabh Prajapati"
            className="w-24 h-24 rounded-full mx-auto border-4 border-primary-500 shadow-xl"
            animate={{
              boxShadow: [
                "0 0 20px rgba(239, 104, 21, 0.3)",
                "0 0 40px rgba(13, 182, 239, 0.5)",
                "0 0 20px rgba(59, 130, 246, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        {/* Animated Name */}
        <div className="relative h-32 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWord}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex"
            >
              {words[currentWord].split('').map((letter, i) => (
                <motion.span
                  key={`${currentWord}-${i}`}
                  variants={letterVariants}
                  custom={i}
                  className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 bg-clip-text text-transparent inline-block"
                  style={{
                    textShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mt-4 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          Full Stack Developer
        </motion.p>
        
        {/* Loading Animation */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-primary-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Progress Bar */}
        <motion.div
          className="mt-6 w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto overflow-hidden"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              delay: 3.2, 
              duration: 2, 
              ease: "easeInOut" 
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
