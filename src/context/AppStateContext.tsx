import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Student, Teacher, Subject, Class, ClassAllocation, AttendanceRecord, GalleryItem, AboutPost, Subscriber } from '../types';
import {
  initialStudents,
  initialTeachers,
  initialClasses,
  initialSubjects,
  initialAllocations,
  initialAttendance,
  initialGallery,
  initialPosts,
} from '../data/initialData';

interface AppStateContextType {
  students: Student[];
  teachers: Teacher[];
  subjects: Subject[];
  classes: Class[];
  allocations: ClassAllocation[];
  attendance: AttendanceRecord[];
  gallery: GalleryItem[];
  posts: AboutPost[];

  // Student CRUD
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (id: string) => void;

  // Teacher CRUD
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (teacher: Teacher) => void;
  deleteTeacher: (id: string) => void;

  // Subject CRUD
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  updateSubject: (subject: Subject) => void;
  deleteSubject: (id: string) => void;

  // Class CRUD
  addClass: (cls: Omit<Class, 'id'>) => void;
  updateClass: (cls: Class) => void;
  deleteClass: (id: string) => void;

  // Allocations
  allocateTeacherToClass: (classId: string, teacherId: string) => void;
  allocateStudentsToClass: (classId: string, studentIds: string[]) => void;

  // Attendance
  saveStudentAttendance: (classId: string, date: string, records: { studentId: string; status: 'present' | 'absent' | 'late'; remarks?: string }[]) => void;
  teacherClockIn: (teacherId: string, date: string) => void;
  teacherClockOut: (teacherId: string, date: string) => void;

  // Landing Page Editor
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  addPost: (post: Omit<AboutPost, 'id' | 'date'>) => void;
  deletePost: (id: string) => void;

  // Helper Queries
  getStudentsInClass: (classId: string) => Student[];
  getTeacherForClass: (classId: string) => Teacher | null;
  getClassForTeacher: (teacherId: string) => Class | null;
  getClassForStudent: (studentId: string) => Class | null;

  // Subscribers
  subscribers: Subscriber[];
  addSubscriber: (subData: { email: string; name?: string; phone?: string }) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize states with localStorage or initial data
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [allocations, setAllocations] = useState<ClassAllocation[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [posts, setPosts] = useState<AboutPost[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  // Load initial data
  useEffect(() => {
    const loadState = (key: string, defaultData: any) => {
      const dbKey = key.replace('eduflex_', 'pasraisyedu_');
      const saved = localStorage.getItem(dbKey);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(`Failed to load ${dbKey} from localStorage`, e);
        }
      }
      localStorage.setItem(dbKey, JSON.stringify(defaultData));
      return defaultData;
    };

    setStudents(loadState('eduflex_students', initialStudents));
    setTeachers(loadState('eduflex_teachers', initialTeachers));
    setSubjects(loadState('eduflex_subjects', initialSubjects));
    setClasses(loadState('eduflex_classes', initialClasses));
    setAllocations(loadState('eduflex_allocations', initialAllocations));
    setAttendance(loadState('eduflex_attendance', initialAttendance));
    setGallery(loadState('eduflex_gallery', initialGallery));
    setPosts(loadState('eduflex_posts', initialPosts));
    setSubscribers(loadState('eduflex_subscribers', []));
  }, []);

  // Save changes helper
  const saveState = (key: string, data: any) => {
    const dbKey = key.replace('eduflex_', 'pasraisyedu_');
    localStorage.setItem(dbKey, JSON.stringify(data));
  };

  // Student CRUD
  const addStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...studentData,
      id: `s_${Date.now()}`
    };
    const updated = [...students, newStudent];
    setStudents(updated);
    saveState('eduflex_students', updated);
  };

  const updateStudent = (updatedStudent: Student) => {
    const updated = students.map(s => s.id === updatedStudent.id ? updatedStudent : s);
    setStudents(updated);
    saveState('eduflex_students', updated);
  };

  const deleteStudent = (id: string) => {
    const updated = students.filter(s => s.id !== id);
    setStudents(updated);
    saveState('eduflex_students', updated);

    // Remove from allocations
    const updatedAllocations = allocations.map(alloc => ({
      ...alloc,
      studentIds: alloc.studentIds.filter(sid => sid !== id)
    }));
    setAllocations(updatedAllocations);
    saveState('eduflex_allocations', updatedAllocations);
  };

  // Teacher CRUD
  const addTeacher = (teacherData: Omit<Teacher, 'id'>) => {
    const newTeacher: Teacher = {
      ...teacherData,
      id: `t_${Date.now()}`,
      clockedIn: false
    };
    const updated = [...teachers, newTeacher];
    setTeachers(updated);
    saveState('eduflex_teachers', updated);
  };

  const updateTeacher = (updatedTeacher: Teacher) => {
    const updated = teachers.map(t => t.id === updatedTeacher.id ? updatedTeacher : t);
    setTeachers(updated);
    saveState('eduflex_teachers', updated);
  };

  const deleteTeacher = (id: string) => {
    const updated = teachers.filter(t => t.id !== id);
    setTeachers(updated);
    saveState('eduflex_teachers', updated);

    // Remove from allocations
    const updatedAllocations = allocations.map(alloc => {
      if (alloc.teacherId === id) {
        return { ...alloc, teacherId: '' };
      }
      return alloc;
    });
    setAllocations(updatedAllocations);
    saveState('eduflex_allocations', updatedAllocations);
  };

  // Subject CRUD
  const addSubject = (subjectData: Omit<Subject, 'id'>) => {
    const newSubject: Subject = {
      ...subjectData,
      id: `sub_${Date.now()}`
    };
    const updated = [...subjects, newSubject];
    setSubjects(updated);
    saveState('eduflex_subjects', updated);
  };

  const updateSubject = (updatedSubject: Subject) => {
    const updated = subjects.map(s => s.id === updatedSubject.id ? updatedSubject : s);
    setSubjects(updated);
    saveState('eduflex_subjects', updated);
  };

  const deleteSubject = (id: string) => {
    const updated = subjects.filter(s => s.id !== id);
    setSubjects(updated);
    saveState('eduflex_subjects', updated);

    // Clean up class subject lists
    const updatedClasses = classes.map(cls => ({
      ...cls,
      subjectIds: cls.subjectIds.filter(sid => sid !== id)
    }));
    setClasses(updatedClasses);
    saveState('eduflex_classes', updatedClasses);
  };

  // Class CRUD
  const addClass = (classData: Omit<Class, 'id'>) => {
    const newClass: Class = {
      ...classData,
      id: `c_${Date.now()}`
    };
    const updatedClasses = [...classes, newClass];
    setClasses(updatedClasses);
    saveState('eduflex_classes', updatedClasses);

    // Create empty allocation slot
    const updatedAllocations = [...allocations, { classId: newClass.id, teacherId: '', studentIds: [] }];
    setAllocations(updatedAllocations);
    saveState('eduflex_allocations', updatedAllocations);
  };

  const updateClass = (updatedClass: Class) => {
    const updated = classes.map(c => c.id === updatedClass.id ? updatedClass : c);
    setClasses(updated);
    saveState('eduflex_classes', updated);
  };

  const deleteClass = (id: string) => {
    const updatedClasses = classes.filter(c => c.id !== id);
    setClasses(updatedClasses);
    saveState('eduflex_classes', updatedClasses);

    // Delete allocation record
    const updatedAllocations = allocations.filter(alloc => alloc.classId !== id);
    setAllocations(updatedAllocations);
    saveState('eduflex_allocations', updatedAllocations);
  };

  // Allocations
  const allocateTeacherToClass = (classId: string, teacherId: string) => {
    const exist = allocations.some(a => a.classId === classId);
    let updated: ClassAllocation[];
    if (exist) {
      updated = allocations.map(a => a.classId === classId ? { ...a, teacherId } : a);
    } else {
      updated = [...allocations, { classId, teacherId, studentIds: [] }];
    }
    setAllocations(updated);
    saveState('eduflex_allocations', updated);
  };

  const allocateStudentsToClass = (classId: string, studentIds: string[]) => {
    const exist = allocations.some(a => a.classId === classId);
    let updated: ClassAllocation[];
    if (exist) {
      updated = allocations.map(a => a.classId === classId ? { ...a, studentIds } : a);
    } else {
      updated = [...allocations, { classId, teacherId: '', studentIds }];
    }
    setAllocations(updated);
    saveState('eduflex_allocations', updated);
  };

  // Attendance
  const saveStudentAttendance = (
    classId: string,
    date: string,
    records: { studentId: string; status: 'present' | 'absent' | 'late'; remarks?: string }[]
  ) => {
    // Filter out existing records for this class and date
    const remaining = attendance.filter(
      r => !(r.type === 'student' && r.classId === classId && r.date === date)
    );

    // Create new records
    const newRecords: AttendanceRecord[] = records.map(r => ({
      id: `att_s_${Date.now()}_${r.studentId}`,
      date,
      type: 'student',
      targetId: r.studentId,
      status: r.status,
      remarks: r.remarks,
      classId
    }));

    const updated = [...remaining, ...newRecords];
    setAttendance(updated);
    saveState('eduflex_attendance', updated);
  };

  const teacherClockIn = (teacherId: string, date: string) => {
    // Update teacher profile clockedIn status
    const updatedTeachers = teachers.map(t => t.id === teacherId ? { ...t, clockedIn: true } : t);
    setTeachers(updatedTeachers);
    saveState('eduflex_teachers', updatedTeachers);

    // Log clock in attendance
    const exist = attendance.some(
      r => r.type === 'teacher' && r.targetId === teacherId && r.date === date
    );
    if (!exist) {
      const record: AttendanceRecord = {
        id: `att_t_${Date.now()}_${teacherId}`,
        date,
        type: 'teacher',
        targetId: teacherId,
        status: 'present',
        remarks: 'Clocked In via Portal'
      };
      const updatedAtt = [...attendance, record];
      setAttendance(updatedAtt);
      saveState('eduflex_attendance', updatedAtt);
    }
  };

  const teacherClockOut = (teacherId: string, date: string) => {
    // Update teacher profile clockedIn status
    const updatedTeachers = teachers.map(t => t.id === teacherId ? { ...t, clockedIn: false } : t);
    setTeachers(updatedTeachers);
    saveState('eduflex_teachers', updatedTeachers);
    
    // Note clock out in remarks if record exists
    const updatedAtt = attendance.map(r => {
      if (r.type === 'teacher' && r.targetId === teacherId && r.date === date) {
        return { ...r, remarks: 'Clocked In & Out successfully' };
      }
      return r;
    });
    setAttendance(updatedAtt);
    saveState('eduflex_attendance', updatedAtt);
  };

  // Landing Page Editor
  const addGalleryItem = (itemData: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...itemData,
      id: `gal_${Date.now()}`
    };
    const updated = [newItem, ...gallery]; // add to front
    setGallery(updated);
    saveState('eduflex_gallery', updated);
  };

  const deleteGalleryItem = (id: string) => {
    const updated = gallery.filter(g => g.id !== id);
    setGallery(updated);
    saveState('eduflex_gallery', updated);
  };

  const addPost = (postData: Omit<AboutPost, 'id' | 'date'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newPost: AboutPost = {
      ...postData,
      id: `post_${Date.now()}`,
      date: today
    };
    const updated = [newPost, ...posts]; // add to front
    setPosts(updated);
    saveState('eduflex_posts', updated);
  };

  const deletePost = (id: string) => {
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    saveState('eduflex_posts', updated);
  };

  // Helper Queries
  const getStudentsInClass = (classId: string): Student[] => {
    const allocation = allocations.find(a => a.classId === classId);
    if (!allocation) return [];
    return students.filter(s => allocation.studentIds.includes(s.id));
  };

  const getTeacherForClass = (classId: string): Teacher | null => {
    const allocation = allocations.find(a => a.classId === classId);
    if (!allocation || !allocation.teacherId) return null;
    return teachers.find(t => t.id === allocation.teacherId) || null;
  };

  const getClassForTeacher = (teacherId: string): Class | null => {
    const allocation = allocations.find(a => a.teacherId === teacherId);
    if (!allocation) return null;
    return classes.find(c => c.id === allocation.classId) || null;
  };

  const getClassForStudent = (studentId: string): Class | null => {
    const allocation = allocations.find(a => a.studentIds.includes(studentId));
    if (!allocation) return null;
    return classes.find(c => c.id === allocation.classId) || null;
  };

  const addSubscriber = (subData: { email: string; name?: string; phone?: string }) => {
    const newSub: Subscriber = {
      ...subData,
      id: `sub_${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [...subscribers, newSub];
    setSubscribers(updated);
    saveState('eduflex_subscribers', updated);
  };

  return (
    <AppStateContext.Provider
      value={{
        students,
        teachers,
        subjects,
        classes,
        allocations,
        attendance,
        gallery,
        posts,
        subscribers,
        addStudent,
        updateStudent,
        deleteStudent,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        addSubject,
        updateSubject,
        deleteSubject,
        addClass,
        updateClass,
        deleteClass,
        allocateTeacherToClass,
        allocateStudentsToClass,
        saveStudentAttendance,
        teacherClockIn,
        teacherClockOut,
        addGalleryItem,
        deleteGalleryItem,
        addPost,
        deletePost,
        getStudentsInClass,
        getTeacherForClass,
        getClassForTeacher,
        getClassForStudent,
        addSubscriber
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
