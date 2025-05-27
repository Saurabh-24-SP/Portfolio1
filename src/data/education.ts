import { ExperienceItem } from '../types';

export const experience: ExperienceItem[] = [
  {
    id: '1',
    title: 'Master of Computer Applications (MCA)',
    company: "St. Andrew's Institute of Technology And Management",
    location: 'Gurgaon, Haryana',
    startDate: '2024',
    endDate: '2026',
    description: [
      'Currently pursuing Master of Computer Applications',
      'Focusing on advanced software development and system design',
      'Specializing in modern web technologies and cloud computing',
      'Building strong foundation in advanced computer science concepts'
    ],
    technologies: ['Full Stack Development', 'Cloud Computing', 'System Design', 'Advanced Algorithms'],
    type: 'education',
    grade: 'Pursuing'
  },
  {
    id: '2',
    title: 'Bachelor of Computer Applications (BCA)',
    company: 'Veer Bahadur Singh Purvanchal University',
    location: 'Jaunpur, Uttar Pradesh',
    startDate: '2021',
    endDate: '2024',
    description: [
      'Completed BCA with 71% aggregate marks',
      'Gained comprehensive knowledge in computer applications',
      'Developed strong programming and problem-solving skills',
      'Participated in various technical projects and presentations'
    ],
    technologies: ['Programming', 'Database Management', 'Web Development', 'Software Engineering'],
    type: 'education',
    grade: '71%'
  },
  {
    id: '3',
    title: 'Higher Secondary Education (12th)',
    company: 'Maharashtra State Board of Secondary and Higher Secondary Education',
    location: 'Maharashtra, India',
    startDate: '2019',
    endDate: '2021',
    description: [
      'Completed Higher Secondary Certificate (HSC) with 76.33% marks',
      'Science Stream with focus on Mathematics and Computer Science',
      'Developed strong foundation in analytical and problem-solving skills',
      'Active participation in academic competitions and tech events'
    ],
    technologies: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
    type: 'education',
    grade: '76.33%'
  },
  {
    id: '4',
    title: 'Secondary Education (10th)',
    company: 'Maharashtra State Board of Secondary and Higher Secondary Education',
    location: 'Maharashtra, India',
    startDate: '2017',
    endDate: '2019',
    description: [
      'Completed Secondary School Certificate (SSC) with 60.80% marks',
      'Built strong academic foundation across core subjects',
      'Participated in various extracurricular activities',
      'Developed interest in technology and programming'
    ],
    technologies: ['Mathematics', 'Science', 'English', 'Social Studies'],
    type: 'education',
    grade: '60.80%'
  }
];