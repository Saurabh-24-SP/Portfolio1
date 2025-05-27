import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Mail, MapPin, Clock, ExternalLink, AlertCircle } from 'lucide-react';
import Section from '../ui/Section';
import Button from '../ui/Button';
import { socialLinks } from '../../data/social';
import SocialIcon from '../ui/SocialIcon';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', message: '' };
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    } else if (formState.message.length < 10) {
      newErrors.message = 'Message is too short';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const inputVariants = {
    focus: { 
      scale: 1.02,
      boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  };
  
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 },
    success: { 
      backgroundColor: "#10B981",
      transition: { duration: 0.3 } 
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 15 }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Create form data
    const formData = new FormData();
    formData.append('name', formState.name);
    formData.append('email', formState.email);
    formData.append('message', formState.message);
    
    // Send the form data using fetch API
    fetch('https://formspree.io/f/mwkjerbz', {  // Replace with your own Formspree endpoint or API
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after submission
        setFormState({
          name: '',
          email: '',
          message: '',
        });
        
        // Reset success message after 7 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 7000);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsSubmitting(false);
        alert('There was an error sending your message. Please try again later.');
      });
  };
  
  return (
    <Section
      id="contact"
      title="Get In Touch"
      subtitle="Have a question or want to work together?"
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Background decorative elements */}
          <motion.div 
            className="absolute -top-10 -left-10 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl z-0"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          
          <motion.div 
            className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary-500/10 rounded-full blur-3xl z-0"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
          
          <div className="relative z-10">
            <motion.h3 
              className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Contact Information
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-400 mb-8"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Feel free to reach out if you're looking for a developer, have a question, or just want to connect. I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </motion.p>
            
            <motion.div 
              className="space-y-6 mb-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.a
                href="mailto:saurabhprajapati7756@gmail.com"
                className="flex group items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full mr-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors duration-300 relative overflow-hidden">
                  <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400 relative z-10" />
                  <motion.div 
                    className="absolute inset-0 bg-primary-300/30 dark:bg-primary-700/30 rounded-full"
                    animate={{ 
                      scale: [1, 1.4, 1],
                      opacity: [0, 0.3, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">Email</p>
                  <p className="font-medium group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300">saurabhprajapati7756@gmail.com</p>
                  <motion.div
                    className="h-0.5 w-0 bg-gradient-to-r from-primary-400 to-primary-600 mt-1 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <motion.div 
                  className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.5 }}
                  animate={{ 
                    boxShadow: ["0 0 0 rgba(59, 130, 246, 0)", "0 0 10px rgba(59, 130, 246, 0.5)", "0 0 0 rgba(59, 130, 246, 0)"]
                  }}
                >
                  <ExternalLink size={18} className="text-primary-500" />
                </motion.div>
              </motion.a>
              
              <motion.div
                className="flex group items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-3 bg-secondary-100 dark:bg-secondary-900/30 rounded-full mr-4 group-hover:bg-secondary-200 dark:group-hover:bg-secondary-800/50 transition-colors duration-300 relative overflow-hidden">
                  <MapPin className="w-6 h-6 text-secondary-600 dark:text-secondary-400 relative z-10" />
                  <motion.div 
                    className="absolute inset-0 bg-secondary-300/30 dark:bg-secondary-700/30 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.5, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors duration-300">Location</p>
                  <p className="font-medium group-hover:text-secondary-700 dark:group-hover:text-secondary-300 transition-colors duration-300">Jaunpur, Uttarpradesh, India</p>
                  <motion.div
                    className="h-0.5 w-0 bg-gradient-to-r from-secondary-400 to-secondary-600 mt-1 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <motion.div 
                  className="w-20 h-20 bg-secondary-500/10 rounded-full absolute -right-10 -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
              
              <motion.div
                className="flex group items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-3 bg-accent-100 dark:bg-accent-900/30 rounded-full mr-4 group-hover:bg-accent-200 dark:group-hover:bg-accent-800/50 transition-colors duration-300 relative">
                  <Clock className="w-6 h-6 text-accent-600 dark:text-accent-400 relative z-10" />
                  <motion.div 
                    className="absolute inset-0 rounded-full"
                    animate={{ 
                      border: ["2px solid transparent", "2px solid rgba(236, 72, 153, 0.3)", "2px solid transparent"],
                      rotate: [0, 360]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <div className="relative">
                  <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">Working Hours</p>
                  <p className="font-medium group-hover:text-accent-700 dark:group-hover:text-accent-300 transition-colors duration-300">9:00 AM - 9:00 PM IST</p>
                  <motion.div
                    className="h-0.5 w-0 bg-gradient-to-r from-accent-400 to-accent-600 mt-1 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className="absolute -right-2 -top-2 text-xs bg-accent-500 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md"
                    initial={{ scale: 0.8, rotate: -5 }}
                    whileHover={{ scale: 1.1, rotate: 0 }}
                  >
                    GMT+5:30
                  </motion.div>
                </div>
                <motion.div 
                  className="w-32 h-32 bg-accent-500/5 rounded-full absolute -right-16 -bottom-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ 
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)",
                y: -5
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="flex items-center mb-4">
                <motion.div 
                  className="w-3 h-3 bg-green-500 rounded-full mr-2"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.7, 1],
                    boxShadow: ["0 0 0 rgba(34, 197, 94, 0)", "0 0 10px rgba(34, 197, 94, 0.7)", "0 0 0 rgba(34, 197, 94, 0)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <h4 className="text-lg font-semibold">Current Availability</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                I'm currently <span className="font-medium text-green-500 relative">
                  available
                  <motion.span 
                    className="absolute inset-0 bg-green-500/20 rounded blur-sm"
                    animate={{ 
                      opacity: [0, 0.7, 0]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </span> for freelance work and open to discussing new opportunities. Let's create something amazing together!
              </p>
            </motion.div>
            
            <motion.div 
              className="mt-8 flex gap-4 justify-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {socialLinks
                .filter(link => link.name.toLowerCase() !== 'twitter') // Filter out Twitter
                .map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.15,
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  custom={index}
                  title={link.name}
                >
                  <SocialIcon icon={link.icon} className="w-5 h-5 text-gray-700 dark:text-gray-300 relative z-10" />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/20 to-primary-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  />
                  <motion.div 
                    className="absolute -inset-2 opacity-0 group-hover:opacity-30 rounded-full blur-xl bg-primary-500"
                    animate={{ 
                      scale: [0.8, 1.2, 0.8], 
                      opacity: [0, 0.3, 0] 
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
        
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl h-full flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                  className="relative mb-6"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-success-500/20 blur-xl"
                    animate={{ 
                      scale: [1, 1.2, 1], 
                      opacity: [0.5, 0.8, 0.5] 
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <CheckCircle size={80} className="text-success-500 relative z-10" />
                </motion.div>
                
                <motion.h3 
                  className="text-3xl font-bold mb-3 bg-gradient-to-r from-success-500 to-primary-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Message Sent Successfully!
                </motion.h3>
                
                <motion.p 
                  className="text-lg text-gray-600 dark:text-gray-400 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Thank you for reaching out. I'll get back to you as soon as possible. Looking forward to connecting with you!
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => setIsSubmitted(false)}
                    className="border-success-500 text-success-500 hover:bg-success-50 dark:hover:bg-success-900/20"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl relative overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                action="https://formspree.io/f/mwkjerbz"  // Backup direct submission if JS fails
                method="POST"
              >
                {/* Form background decorative elements */}
                <motion.div 
                  className="absolute top-0 right-0 w-40 h-40 bg-secondary-500/5 rounded-full blur-xl"
                  animate={{ 
                    x: [0, 10, 0], 
                    y: [0, -10, 0],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                
                <motion.div 
                  className="absolute bottom-0 left-0 w-40 h-40 bg-primary-500/5 rounded-full blur-xl"
                  animate={{ 
                    x: [0, -10, 0], 
                    y: [0, 10, 0],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 8, repeat: Infinity, delay: 2 }}
                />
                
                <motion.h3 
                  className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
                  variants={itemVariants}
                >
                  Send Me a Message
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 dark:text-gray-400 mb-8"
                  variants={itemVariants}
                >
                  Got a question or proposal, or just want to say hello? Go ahead.
                </motion.p>
                
                <motion.div className="mb-5" variants={itemVariants}>
                  <div className="flex justify-between mb-1">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    {errors.name && (
                      <span className="text-sm text-error-500 flex items-center">
                        <AlertCircle size={14} className="mr-1" /> {errors.name}
                      </span>
                    )}
                  </div>
                  <motion.div whileFocus="focus">
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 dark:border-gray-700 ${
                        errors.name 
                          ? 'border-error-500 focus:ring-error-400/50 focus:border-error-500' 
                          : 'focus:ring-primary-400/50 focus:border-primary-500 border-gray-300'
                      }`}
                      placeholder="Your name"
                      variants={inputVariants}
                    />
                  </motion.div>
                </motion.div>
                
                <motion.div className="mb-5" variants={itemVariants}>
                  <div className="flex justify-between mb-1">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    {errors.email && (
                      <span className="text-sm text-error-500 flex items-center">
                        <AlertCircle size={14} className="mr-1" /> {errors.email}
                      </span>
                    )}
                  </div>
                  <motion.div whileFocus="focus">
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 dark:border-gray-700 ${
                        errors.email 
                          ? 'border-error-500 focus:ring-error-400/50 focus:border-error-500' 
                          : 'focus:ring-primary-400/50 focus:border-primary-500 border-gray-300'
                      }`}
                      placeholder="Your email"
                      variants={inputVariants}
                    />
                  </motion.div>
                </motion.div>
                
                <motion.div className="mb-6" variants={itemVariants}>
                  <div className="flex justify-between mb-1">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    {errors.message && (
                      <span className="text-sm text-error-500 flex items-center">
                        <AlertCircle size={14} className="mr-1" /> {errors.message}
                      </span>
                    )}
                  </div>
                  <motion.div whileFocus="focus">
                    <motion.textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 dark:border-gray-700 ${
                        errors.message 
                          ? 'border-error-500 focus:ring-error-400/50 focus:border-error-500' 
                          : 'focus:ring-primary-400/50 focus:border-primary-500 border-gray-300'
                      }`}
                      placeholder="Your message"
                      variants={inputVariants}
                    />
                  </motion.div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                  >
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={isSubmitting}
                      className={`rounded-lg relative overflow-hidden group transition-all duration-300 ${
                        isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                      }`}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 opacity-100"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        style={{ backgroundSize: '200% 200%' }}
                      />
                      <span className="relative z-10 flex items-center justify-center py-1">
                        <span className="mr-2">
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </span>
                        <motion.div
                          animate={{ 
                            x: isSubmitting ? [0, 5, 0] : 0
                          }}
                          transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0 }}
                        >
                          <Send size={18} className={isSubmitting ? "animate-pulse" : "group-hover:translate-x-1 transition-transform duration-300"} />
                        </motion.div>
                      </span>
                      
                      {/* Shimmer effect */}
                      <motion.div 
                        className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out"
                      />
                    </Button>
                  </motion.div>
                  
                  {/* Form submission status indicator */}
                  {isSubmitting && (
                    <motion.div 
                      className="mt-4 flex items-center justify-center text-primary-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div 
                        className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <p className="text-sm">Sending your message, please wait...</p>
                    </motion.div>
                  )}
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Section>
  );
};

export default Contact;