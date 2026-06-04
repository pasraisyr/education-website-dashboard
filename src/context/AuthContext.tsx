import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'teacher' | 'guest';

export interface UserSession {
  role: UserRole;
  name: string;
  email: string;
  teacherId?: string; // Present only if role is teacher
}

interface AuthContextType {
  user: UserSession | null;
  login: (role: UserRole, emailOrId?: string, password?: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('pasraisyedu_session');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse user session', e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (role: UserRole, emailOrId?: string, _password?: string): boolean => {
    if (role === 'guest') {
      setUser(null);
      localStorage.removeItem('pasraisyedu_session');
      return true;
    }

    if (role === 'admin') {
      // Mock validation
      const adminSession: UserSession = {
        role: 'admin',
        name: 'Admin Chief',
        email: 'admin@pasraisyedu.com'
      };
      setUser(adminSession);
      localStorage.setItem('pasraisyedu_session', JSON.stringify(adminSession));
      return true;
    }

    if (role === 'teacher') {
      // Find the teacher from our state
      const teachersRaw = localStorage.getItem('pasraisyedu_teachers');
      let teacherName = 'Teacher Staff';
      let teacherId = 't1';
      let teacherEmail = 'teacher@pasraisyedu.com';
      
      if (teachersRaw) {
        try {
          const teachers = JSON.parse(teachersRaw);
          const found = teachers.find((t: any) => t.email.toLowerCase() === emailOrId?.toLowerCase() || t.id === emailOrId);
          if (found) {
            teacherName = found.name;
            teacherId = found.id;
            teacherEmail = found.email;
          } else if (teachers.length > 0) {
            // Default to first if not found (for robustness in quick demos)
            teacherName = teachers[0].name;
            teacherId = teachers[0].id;
            teacherEmail = teachers[0].email;
          }
        } catch (e) {
          console.error(e);
        }
      }

      const teacherSession: UserSession = {
        role: 'teacher',
        name: teacherName,
        email: teacherEmail,
        teacherId: teacherId
      };
      setUser(teacherSession);
      localStorage.setItem('pasraisyedu_session', JSON.stringify(teacherSession));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pasraisyedu_session');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
