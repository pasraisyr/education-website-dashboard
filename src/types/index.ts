export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female';
  dob: string; // YYYY-MM-DD
  joinedDate: string; // YYYY-MM-DD
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subjectSpecialization: string; // Subject ID or name
  joinedDate: string; // YYYY-MM-DD
  clockedIn?: boolean;
}

export interface Subject {
  id: string;
  name: string;
  code: string; // e.g. MATH101
}

export interface Class {
  id: string;
  name: string;
  grade: string; // e.g. Grade 10
  subjectIds: string[]; // List of subject IDs taught in this class
}

export interface ClassAllocation {
  classId: string;
  teacherId: string; // For simplicity, 1 main teacher per class
  studentIds: string[]; // List of student IDs allocated to this class
}

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  type: 'student' | 'teacher';
  targetId: string; // studentId or teacherId
  status: 'present' | 'absent' | 'late';
  remarks?: string;
  classId?: string; // only for student type
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
  category: 'Campus' | 'Sports' | 'Events' | 'Academics';
}

export interface AboutPost {
  id: string;
  title: string;
  content: string;
  date: string; // YYYY-MM-DD
  author: string;
  tags?: string[];
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  date: string;
}
