import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Award, Coffee, Code, Users, Star, Calendar, MapPin, Mail, Phone, Briefcase, GraduationCap, Heart, Target } from 'lucide-react';
import Section from '../ui/Section';
import Button from '../ui/Button';

const About: React.FC = () => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };
  
  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      } 
    },
  };

  const stats = [
    { 
      icon: Calendar, 
      value: 1, 
      suffix: '+', 
      label: 'Years Learning',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      description: 'MERN Stack Development'
    },
    { 
      icon: Code, 
      value: 5, 
      suffix: '+', 
      label: 'Projects Built',
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      description: 'Full Stack Applications'
    },
    { 
      icon: Star, 
      value: 10, 
      suffix: '+', 
      label: 'Technologies',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      description: 'Learned & Practiced'
    },
    { 
      icon: Coffee, 
      value: 500, 
      suffix: '+', 
      label: 'Hours Coding',
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
      description: 'Learning & Building'
    },
  ];

  const timeline = [
    {
      year: '2024',
      title: 'MERN Stack Projects',
      company: 'Self Learning',
      description: 'Built multiple full-stack applications using MongoDB, Express, React, and Node.js',
      icon: Code
    },
    {
      year: '2023',
      title: 'Frontend Development',
      company: 'Personal Projects',
      description: 'Mastered React.js and modern frontend development practices',
      icon: Star
    },
    {
      year: '2023',
      title: 'Started Web Development',
      company: 'Online Courses',
      description: 'Began learning HTML, CSS, JavaScript and modern web technologies',
      icon: GraduationCap
    },
    {
      year: '2022',
      title: 'Computer Science Student',
      company: 'College/University',
      description: 'Pursuing degree in Computer Science with focus on software development',
      icon: Briefcase
    }
  ];

  const skills = [
    { name: 'MongoDB', level: 80, color: 'bg-green-600' },
    { name: 'Express.js', level: 85, color: 'bg-gray-600' },
    { name: 'React.js', level: 90, color: 'bg-blue-500' },
    { name: 'Node.js', level: 85, color: 'bg-green-500' },
    { name: 'JavaScript', level: 88, color: 'bg-yellow-500' },
    { name: 'HTML/CSS', level: 95, color: 'bg-orange-500' },
  ];

  const CountUp = ({ end, duration = 2 }: { end: number; duration?: number }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!isInView) return;
      
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, [end, duration, isInView]);
    
    return <span>{count}</span>;
  };
  
  const downloadResume = () => {
    // Create a downloadable PDF resume
    const link = document.createElement('a');
    link.href = '/src/public/Saurabh_Resume.pdf';
    link.download = 'Saurabh_Prajapati_Resume.pdf';
    link.click();
  };

  const sendEmail = () => {
    window.location.href = 'mailto:saurabh@example.com?subject=Hello Saurabh - Fresher MERN Developer&body=Hi, I am interested in connecting with you regarding opportunities.';
  };
  
  return (
    <Section
      id="about"
      title="About Me"
      subtitle="Get to know more about my journey and expertise"
      className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Timeline Section - Moved to Left */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          {/* Timeline Section */}
          <motion.div
            className="mb-12"
            variants={item}
          >
            <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-primary-500" />
              Experience Timeline
            </h4>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className={`relative pl-8 pb-4 cursor-pointer transition-all duration-300 ${
                    activeTimeline === index ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => setActiveTimeline(index)}
                  whileHover={{ x: 4 }}
                >
                  <div className="absolute left-0 top-1 w-3 h-3 bg-primary-500 rounded-full border-2 border-white dark:border-gray-900 shadow-lg"></div>
                  {index < timeline.length - 1 && (
                    <div className="absolute left-1.5 top-4 w-0.5 h-full bg-gray-200 dark:bg-gray-700"></div>
                  )}
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2 mb-1">
                      <item.icon className="w-4 h-4 text-primary-500" />
                      <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">{item.year}</span>
                    </div>
                    <h5 className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.company}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats Grid - Moved to Left */}
          <motion.div 
            variants={item}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                }}
                onHoverStart={() => setHoveredStat(index)}
                onHoverEnd={() => setHoveredStat(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <div className="flex items-center space-x-3 relative z-10">
                  <motion.div
                    className={`p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm`}
                    animate={{ 
                      scale: hoveredStat === index ? 1.2 : 1,
                      rotate: hoveredStat === index ? 10 : 0
                    }}
                  >
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </motion.div>
                  <div>
                    <div className="flex items-baseline space-x-1">
                      <span className={`text-2xl font-bold ${stat.color}`}>
                        <CountUp end={stat.value} />
                      </span>
                      <span className={`text-lg font-semibold ${stat.color}`}>
                        {stat.suffix}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {stat.label}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {stat.description}
                    </p>
                  </div>
                </div>
                
                {/* Hover background effect */}
                <motion.div
                  className={`absolute inset-0 ${stat.bgColor} opacity-0`}
                  animate={{ opacity: hoveredStat === index ? 0.1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Enhanced Content Section */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8"
        >
          {/* Introduction */}
          <div className="space-y-6">
            <motion.div 
              variants={item}
              className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 p-6 rounded-xl border border-primary-200 dark:border-primary-800"
            >
              <div className="flex items-center mb-4">
                <Heart className="w-5 h-5 text-red-500 mr-2" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  My Passion
                </h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                I am a passionate and dedicated <span className="font-semibold text-primary-600 dark:text-primary-400">MERN Stack Developer</span> and recent graduate, eager to contribute to innovative projects with clean, efficient code and modern web technologies.
              </p>
            </motion.div>
            
            <motion.p 
              variants={item} 
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              As a <span className="font-semibold text-secondary-600 dark:text-secondary-400">fresh graduate</span> with hands-on experience in <span className="font-semibold text-green-600 dark:text-green-400">MERN Stack</span>, I have built <span className="font-semibold text-blue-600 dark:text-blue-400">5+ full-stack projects</span> that showcase my ability to create responsive, user-friendly web applications.
            </motion.p>
            
            <motion.div
              variants={item}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <Target className="w-5 h-5 text-green-500 mr-2" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  My Goal
                </h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                I am actively seeking opportunities to work with experienced developers and contribute to real-world projects. My goal is to grow as a developer while building scalable, maintainable applications that solve meaningful problems.
              </p>
            </motion.div>
          </div>

          {/* Skills Preview */}
          <motion.div 
            variants={item}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <Code className="w-5 h-5 mr-2 text-primary-500" />
              MERN Stack Skills
            </h4>
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                    <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${skill.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Additional Skills Badge */}
            <motion.div 
              className="mt-4 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {['Git/GitHub', 'RESTful APIs', 'Responsive Design', 'JWT Auth'].map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full font-medium"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            variants={item}
            className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 p-6 rounded-xl border border-primary-200 dark:border-primary-800"
          >
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Ready to Start My Career
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div 
                className="flex items-center space-x-3 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                whileHover={{ x: 4 }}
              >
                <MapPin className="w-5 h-5 text-primary-500" />
                <span className="text-gray-700 dark:text-gray-300">India</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                whileHover={{ x: 4 }}
                onClick={sendEmail}
              >
                <Mail className="w-5 h-5 text-primary-500" />
                <span className="text-gray-700 dark:text-gray-300">saurabhprajapati7756@gmail.com</span>
              </motion.div>
            </div>
            <motion.p 
              className="text-sm text-gray-600 dark:text-gray-400 mt-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              🚀 Available for internships and entry-level positions
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={item}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              variant="primary" 
              icon={<Download size={18} />}
              onClick={downloadResume}
              className="shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40"
            >
              Download Resume
            </Button>
            <Button 
              variant="outline"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group"
            >
              <motion.span
                className="inline-block group-hover:scale-110 transition-transform"
              >
                🚀
              </motion.span>
              View My Projects
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-primary-300/20 to-secondary-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-accent-300/20 to-primary-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </div>
    </Section>
  );
};

export default About;