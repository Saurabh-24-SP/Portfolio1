import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

import { HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'neon';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  loading?: boolean;
  success?: boolean;
  danger?: boolean;
  pulse?: boolean;
  glow?: boolean;
  magnetic?: boolean;
  soundEffect?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  success = false,
  danger = false,
  pulse = false,
  glow = true,
  magnetic = false,
  soundEffect = false,
  className = '',
  disabled,
  ...props
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Motion values for advanced animations
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  const springX = useSpring(x, { stiffness: 400, damping: 30 });
  const springY = useSpring(y, { stiffness: 400, damping: 30 });
  
  // Handle magnetic effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    setMousePosition({ x: deltaX, y: deltaY });
    
    if (magnetic) {
      x.set(deltaX * 0.1);
      y.set(deltaY * 0.1);
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (magnetic) {
      x.set(0);
      y.set(0);
    }
  };
  
  // Sound effect
  const playSound = () => {
    if (!soundEffect) return;
    
    // Create a simple click sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  };
  
  // Enhanced base classes with more variants
  const baseClasses = 'relative inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 overflow-hidden group transform-gpu';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white focus:ring-primary-500 shadow-lg shadow-primary-500/25 border-0',
    secondary: 'bg-gradient-to-r from-secondary-600 to-secondary-500 hover:from-secondary-700 hover:to-secondary-600 text-white focus:ring-secondary-500 shadow-lg shadow-secondary-500/25 border-0',
    outline: 'border-2 border-gray-300 dark:border-gray-700 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-gray-500 hover:border-primary-500 dark:hover:border-primary-400',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-gray-500 border-0',
    gradient: 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white focus:ring-purple-500 shadow-lg shadow-purple-500/25 border-0',
    neon: 'bg-black border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black focus:ring-cyan-400 shadow-lg shadow-cyan-400/50'
  };
  
  const sizeClasses = {
    xs: 'text-xs py-1 px-2 rounded-md',
    sm: 'text-sm py-1.5 px-3 rounded-md',
    md: 'text-base py-2 px-5 rounded-lg',
    lg: 'text-lg py-2.5 px-6 rounded-lg',
    xl: 'text-xl py-3 px-8 rounded-xl',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const isDisabled = disabled || loading;
  const disabledClass = isDisabled ? 'opacity-50 cursor-not-allowed' : '';
  
  // Get current state styling
  const getCurrentVariant = () => {
    if (success) return 'bg-green-500 hover:bg-green-600 text-white border-0';
    if (danger) return 'bg-red-500 hover:bg-red-600 text-white border-0';
    return variantClasses[variant];
  };
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    
    if (soundEffect) playSound();
    if (props.onClick) props.onClick(e);
  };
  
  // Advanced animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: magnetic ? 1.02 : 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 },
    loading: {
      scale: [1, 0.98, 1],
      transition: { duration: 1, repeat: Infinity }
    }
  };
  
  const glowVariants = {
    animate: glow ? {
      boxShadow: [
        "0 0 20px rgba(59, 130, 246, 0.3)",
        "0 0 40px rgba(139, 92, 246, 0.5)",
        "0 0 20px rgba(59, 130, 246, 0.3)"
      ],
      transition: { duration: 2, repeat: Infinity }
    } : {}
  };
  
  const pulseVariants = {
    animate: pulse ? {
      scale: [1, 1.05, 1],
      transition: { duration: 1, repeat: Infinity }
    } : {}
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`${baseClasses} ${getCurrentVariant()} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`}
      variants={buttonVariants}
      initial="initial"
      whileHover={!isDisabled ? "hover" : undefined}
      whileTap={!isDisabled ? "tap" : undefined}
      animate={loading ? "loading" : pulse ? pulseVariants.animate : undefined}
      style={{
        rotateX: magnetic ? rotateX : 0,
        rotateY: magnetic ? rotateY : 0,
        x: magnetic ? springX : 0,
        y: magnetic ? springY : 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={isDisabled}
      {...props}
    >
      {/* Enhanced Ripple Effect */}
      {isClicked && (
        <motion.span
          className="absolute inset-0 rounded-[inherit]"
          style={{
            background: variant === 'outline' || variant === 'ghost' 
              ? 'rgba(59, 130, 246, 0.2)' 
              : 'rgba(255, 255, 255, 0.3)'
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}
      
      {/* Magnetic field indicator */}
      {magnetic && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] border-2 border-primary-400/30"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          exit={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Enhanced Shimmer Effect */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        initial={{ x: '-150%' }}
        whileHover={{ x: '150%' }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      
      {/* Glow effect */}
      {glow && (variant === 'primary' || variant === 'secondary' || variant === 'gradient' || variant === 'neon') && (
        <motion.span
          className={`absolute inset-0 rounded-[inherit] opacity-0 blur-xl ${
            variant === 'primary' ? 'bg-primary-500' :
            variant === 'secondary' ? 'bg-secondary-500' :
            variant === 'gradient' ? 'bg-purple-500' :
            variant === 'neon' ? 'bg-cyan-400' : 'bg-primary-500'
          }`}
          variants={glowVariants}
          animate="animate"
        />
      )}
      
      {/* Neon effect for neon variant */}
      {variant === 'neon' && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] border-2 border-cyan-400"
          animate={{
            boxShadow: [
              "0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff",
              "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff",
              "0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff"
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      
      {/* Content with enhanced animations */}
      <span className="relative z-10 flex items-center gap-2">
        {/* Loading spinner */}
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        
        {/* Success checkmark */}
        {success && !loading && (
          <motion.svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </motion.svg>
        )}
        
        {/* Danger X */}
        {danger && !loading && (
          <motion.svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </motion.svg>
        )}
        
        {/* Left icon */}
        {icon && iconPosition === 'left' && !loading && !success && !danger && (
          <motion.span
            className="inline-block"
            whileHover={{ scale: 1.2, rotate: 5 }}
            animate={{ 
              scale: pulse ? [1, 1.1, 1] : 1,
              opacity: [1, 0.8, 1]
            }}
            transition={{ 
              scale: { duration: 2, repeat: pulse ? Infinity : 0 },
              opacity: { duration: 2, repeat: Infinity },
              type: "spring", 
              stiffness: 400 
            }}
          >
            {icon}
          </motion.span>
        )}
        
        {/* Button text */}
        <motion.span
          whileHover={{ y: -1 }}
          animate={{
            opacity: loading ? 0.7 : 1,
          }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {loading ? 'Loading...' : 
           success ? 'Success!' : 
           danger ? 'Error!' : 
           children}
        </motion.span>
        
        {/* Right icon */}
        {icon && iconPosition === 'right' && !loading && !success && !danger && (
          <motion.span
            className="inline-block"
            whileHover={{ scale: 1.2, rotate: -5 }}
            animate={{ 
              scale: pulse ? [1, 1.1, 1] : 1,
              opacity: [1, 0.8, 1]
            }}
            transition={{ 
              scale: { duration: 2, repeat: pulse ? Infinity : 0 },
              opacity: { duration: 2, repeat: Infinity },
              type: "spring", 
              stiffness: 400 
            }}
          >
            {icon}
          </motion.span>
        )}
      </span>
      
      {/* Floating particles for special effects */}
      {isHovered && (variant === 'gradient' || variant === 'neon') && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-70"
              style={{
                left: `${20 + i * 30}%`,
                top: '50%',
              }}
              animate={{
                y: [-10, -20, -10],
                opacity: [0, 1, 0],
                scale: [0, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </>
      )}
    </motion.button>
  );
};

export default Button;