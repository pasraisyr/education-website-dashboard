import type { Student, Teacher, Subject, Class, ClassAllocation, AttendanceRecord, GalleryItem, AboutPost } from '../types';

export const initialSubjects: Subject[] = [
  { id: 'sub1', name: 'Advanced Mathematics', code: 'MATH401' },
  { id: 'sub2', name: 'General Physics', code: 'PHYS302' },
  { id: 'sub3', name: 'English Literature', code: 'ENGL201' },
  { id: 'sub4', name: 'World History', code: 'HIST101' },
  { id: 'sub5', name: 'Computer Science', code: 'CS102' }
];

export const initialTeachers: Teacher[] = [
  {
    id: 't1',
    name: 'Siti Aminah',
    email: 'siti.aminah@pasraisyedu.com',
    phone: '+6012-345-6789',
    subjectSpecialization: 'Advanced Mathematics',
    joinedDate: '2023-01-15',
    clockedIn: true
  },
  {
    id: 't2',
    name: 'Johari Ramli',
    email: 'johari.ramli@pasraisyedu.com',
    phone: '+6013-987-6543',
    subjectSpecialization: 'General Physics',
    joinedDate: '2024-03-01',
    clockedIn: false
  },
  {
    id: 't3',
    name: 'Maimunah Mansor',
    email: 'maimunah.m@pasraisyedu.com',
    phone: '+6017-555-8888',
    subjectSpecialization: 'English Literature',
    joinedDate: '2021-08-20',
    clockedIn: true
  },
  {
    id: 't4',
    name: 'Khairul Anwar',
    email: 'khairul.anwar@pasraisyedu.com',
    phone: '+6019-123-4567',
    subjectSpecialization: 'World History',
    joinedDate: '2022-05-10',
    clockedIn: false
  }
];

export const initialStudents: Student[] = [
  {
    id: 's1',
    name: 'Ahmad Farhan',
    email: 'ahmad.farhan@gmail.com',
    phone: '+6011-222-3333',
    gender: 'Male',
    dob: '2009-04-12',
    joinedDate: '2025-01-05'
  },
  {
    id: 's2',
    name: 'Farah Diana',
    email: 'farah.diana@gmail.com',
    phone: '+6011-444-5555',
    gender: 'Female',
    dob: '2010-09-24',
    joinedDate: '2025-01-05'
  },
  {
    id: 's3',
    name: 'Badrul Hisyam',
    email: 'badrul.h@gmail.com',
    phone: '+6018-888-9999',
    gender: 'Male',
    dob: '2009-02-19',
    joinedDate: '2025-01-10'
  },
  {
    id: 's4',
    name: 'Siti Nurhaliza',
    email: 'siti.nurhaliza@gmail.com',
    phone: '+6014-777-6666',
    gender: 'Female',
    dob: '2010-11-05',
    joinedDate: '2025-01-12'
  },
  {
    id: 's5',
    name: 'Muhammad Amirul',
    email: 'amirul.m@gmail.com',
    phone: '+6012-444-8888',
    gender: 'Male',
    dob: '2010-08-10',
    joinedDate: '2025-01-15'
  },
  {
    id: 's6',
    name: 'Nurul Izzah',
    email: 'nurul.izzah@gmail.com',
    phone: '+6016-123-9876',
    gender: 'Female',
    dob: '2010-03-05',
    joinedDate: '2025-01-15'
  }
];

export const initialClasses: Class[] = [
  { id: 'c1', name: 'Grade 10 - Alpha', grade: 'Grade 10', subjectIds: ['sub1', 'sub3', 'sub5'] },
  { id: 'c2', name: 'Grade 11 - Beta', grade: 'Grade 11', subjectIds: ['sub2', 'sub4'] }
];

export const initialAllocations: ClassAllocation[] = [
  {
    classId: 'c1',
    teacherId: 't1', // Siti Aminah teaches Class Alpha
    studentIds: ['s1', 's2', 's5', 's6'] // Ahmad Farhan, Farah Diana, Muhammad Amirul, Nurul Izzah
  },
  {
    classId: 'c2',
    teacherId: 't2', // Johari Ramli teaches Class Beta
    studentIds: ['s3', 's4'] // Badrul Hisyam, Siti Nurhaliza
  }
];

// Seed yesterday's student attendance
export const initialAttendance: AttendanceRecord[] = [
  { id: 'att1', date: '2026-06-03', type: 'student', targetId: 's1', status: 'present', classId: 'c1' },
  { id: 'att2', date: '2026-06-03', type: 'student', targetId: 's2', status: 'present', classId: 'c1' },
  { id: 'att3', date: '2026-06-03', type: 'student', targetId: 's3', status: 'late', remarks: 'Late school bus', classId: 'c2' },
  { id: 'att4', date: '2026-06-03', type: 'student', targetId: 's4', status: 'absent', remarks: 'Sore throat', classId: 'c2' },
  { id: 'att5', date: '2026-06-03', type: 'student', targetId: 's5', status: 'present', classId: 'c1' },
  { id: 'att6', date: '2026-06-03', type: 'student', targetId: 's6', status: 'present', classId: 'c1' },
  
  // Seed teacher attendance for yesterday
  { id: 'att_t1', date: '2026-06-03', type: 'teacher', targetId: 't1', status: 'present' },
  { id: 'att_t2', date: '2026-06-03', type: 'teacher', targetId: 't2', status: 'present' },
  { id: 'att_t3', date: '2026-06-03', type: 'teacher', targetId: 't3', status: 'present' },
  { id: 'att_t4', date: '2026-06-03', type: 'teacher', targetId: 't4', status: 'absent', remarks: 'Medical leave' }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal1',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    caption: 'Modern Campus Main Entrance & Administrative block',
    category: 'Campus'
  },
  {
    id: 'gal2',
    imageUrl: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=800&q=80',
    caption: 'Annual Athletics Championship Track & Field Events',
    category: 'Sports'
  },
  {
    id: 'gal3',
    imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
    caption: 'Interactive Science & Robotics Laboratory Session',
    category: 'Academics'
  },
  {
    id: 'gal4',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    caption: 'Students Cultural Night & Performing Arts Showcase',
    category: 'Events'
  }
];

export const initialPosts: AboutPost[] = [
  {
    id: 'post1',
    title: 'Welcome to the Academic Year 2026/27',
    content: 'We are thrilled to welcome all new and returning students to a fresh and exciting academic year. This term, we are focusing on hybrid digital modules, advanced STEM laboratories, and expanding our athletic facilities. Get ready for a transformative journey of learning and personal growth!',
    date: '2026-06-01',
    author: 'Pengetua Maimunah Mansor',
    tags: ['Announcement', 'Welcome', 'Academic']
  },
  {
    id: 'post2',
    title: 'New High-Performance Robotics Lab Commissioned',
    content: 'Our school board has officially inaugurated the new Advanced Robotics Lab. Equipping students with early exposure to AI, microcontroller programming, and industrial engineering concepts, the lab features 3D printers, VR design headsets, and state-of-the-art testing arenas.',
    date: '2026-06-03',
    author: 'Admin Khairul',
    tags: ['STEM', 'Facility', 'Robotics']
  },
  {
    id: 'post3',
    title: 'Notice: Parent-Teacher Meeting Scheduled for June 15',
    content: 'Please note that our quarterly Parent-Teacher Consultation Day is scheduled for Saturday, June 15, from 9:00 AM to 3:00 PM. Teachers will be available in the main hall to discuss individual academic progress, social development, and target setting for the mid-term examinations.',
    date: '2026-06-04',
    author: 'Office of Student Affairs',
    tags: ['Meeting', 'Parents', 'Notice']
  }
];
