import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Mail, ExternalLink } from 'lucide-react';

interface SocialIconProps {
  icon: string;
  className?: string;
  onClick?: () => void;
  href?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon, className = '', onClick, href, ...props }) => {
  const [isClicked, setIsClicked] = useState(false);
  
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 1000);
    if (onClick) onClick();
  };
  
  const getBrandColor = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github': return '#24292e';
      case 'linkedin': return '#0077b5';
      case 'twitter': return '#1da1f2';
      case 'instagram': return '#e4405f';
      case 'mail': return '#ea4335';
      default: return '#6b7280';
    }
  };
  
  const getGlowClass = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github': return 'glow-github';
      case 'linkedin': return 'glow-linkedin';
      case 'twitter': return 'glow-twitter';
      case 'instagram': return 'glow-instagram';
      case 'mail': return 'glow-mail';
      default: return '';
    }
  };
  
  const renderIcon = () => {
    const iconProps = {
      ...props,
      className: `${className} transition-all duration-300`,
      style: { 
        color: isClicked ? getBrandColor(icon) : undefined,
        filter: isClicked ? 'drop-shadow(0 0 8px currentColor)' : undefined
      }
    };
    
    switch (icon.toLowerCase()) {
      case 'github':
        return <Github {...iconProps} />;
      case 'linkedin':
        return <Linkedin {...iconProps} />;
      case 'twitter':
        return <Twitter {...iconProps} />;
      case 'instagram':
        return <Instagram {...iconProps} />;
      case 'mail':
        return <Mail {...iconProps} />;
      default:
        return <ExternalLink {...iconProps} />;
    }
  };
  
  const IconWrapper = href ? motion.a : motion.div;
  
  return (
    <IconWrapper
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      className={`hover-glow-box inline-block cursor-pointer transition-all duration-300 ${
        isClicked ? getGlowClass(icon) : ''
      }`}
      whileHover={{ 
        scale: 1.2,
        rotate: 5,
        filter: `drop-shadow(0 0 10px ${getBrandColor(icon)})`
      }}
      whileTap={{ scale: 0.9 }}
      animate={{
        scale: isClicked ? [1, 1.3, 1] : 1,
        boxShadow: [`0 0 0px ${getBrandColor(icon)}00`, `0 0 15px ${getBrandColor(icon)}40`, `0 0 0px ${getBrandColor(icon)}00`]
      }}
      transition={{ 
        duration: isClicked ? 0.6 : 0.2,
        boxShadow: { duration: 2, repeat: Infinity },
        type: "spring",
        stiffness: 300
      }}
    >
      {renderIcon()}
      
      {/* Add glowing effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 blur-md pointer-events-none"
        style={{ backgroundColor: getBrandColor(icon) }}
        animate={{ 
          opacity: [0, 0.3, 0],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </IconWrapper>
  );
};

export default SocialIcon;