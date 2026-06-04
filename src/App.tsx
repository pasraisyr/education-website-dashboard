import React, { useState, useEffect } from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppStateProvider } from './context/AppStateContext';

// Pages & Layout
import SellerLandingPage from './pages/SellerLandingPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import CRUDStudents from './pages/admin/CRUDStudents';
import CRUDTeachers from './pages/admin/CRUDTeachers';
import CRUDClasses from './pages/admin/CRUDClasses';
import ClassAllocation from './pages/admin/ClassAllocation';
import CheckAttendance from './pages/admin/CheckAttendance';
import LandingEditor from './pages/admin/LandingEditor';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TakeAttendance from './pages/teacher/TakeAttendance';
import ViewClass from './pages/teacher/ViewClass';

// Define a premium styling theme
const theme = createTheme({
  primaryColor: 'indigo',
  fontFamily: 'Outfit, Plus Jakarta Sans, system-ui, sans-serif',
  headings: {
    fontFamily: 'Outfit, sans-serif',
  },
  colors: {
    // Elegant Indigo overrides
    indigo: [
      '#eef2ff',
      '#e0e7ff',
      '#c7d2fe',
      '#a5b4fc',
      '#818cf8',
      '#6366f1',
      '#4f46e5',
      '#3730a3',
      '#312e81',
      '#1e1b4b',
    ],
  },
});

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<'seller' | 'landing' | 'login'>('seller');

  // Sub-routing within dashboards
  const [adminView, setAdminView] = useState<string>('overview');
  const [teacherView, setTeacherView] = useState<string>('overview');

  // Reset view to seller page when user logs out
  useEffect(() => {
    if (!user) {
      setCurrentView('seller');
    }
  }, [user]);

  if (isLoading) {
    return null; // Let main page load once session status is resolved
  }

  // Guest view routing (Seller / Landing / Login)
  if (!user) {
    if (currentView === 'seller') {
      return <SellerLandingPage onLivePreviewClick={() => setCurrentView('landing')} />;
    }
    if (currentView === 'landing') {
      return (
        <LandingPage
          onLoginClick={() => setCurrentView('login')}
          onBackToSellerClick={() => setCurrentView('seller')}
        />
      );
    }
    return <LoginPage onBackClick={() => setCurrentView('landing')} />;
  }

  // Admin routing
  if (user.role === 'admin') {
    return (
      <DashboardLayout activeView={adminView} setActiveView={setAdminView}>
        {adminView === 'overview' && <AdminDashboard />}
        {adminView === 'students' && <CRUDStudents />}
        {adminView === 'teachers' && <CRUDTeachers />}
        {adminView === 'classes' && <CRUDClasses />}
        {adminView === 'allocations' && <ClassAllocation />}
        {adminView === 'attendance' && <CheckAttendance />}
        {adminView === 'editor' && <LandingEditor />}
      </DashboardLayout>
    );
  }

  // Teacher routing
  if (user.role === 'teacher') {
    return (
      <DashboardLayout activeView={teacherView} setActiveView={setTeacherView}>
        {teacherView === 'overview' && <TeacherDashboard setActiveView={setTeacherView} />}
        {teacherView === 'take-attendance' && <TakeAttendance />}
        {teacherView === 'view-class' && <ViewClass />}
      </DashboardLayout>
    );
  }

  return null;
};

export function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" zIndex={2000} />
      <AuthProvider>
        <AppStateProvider>
          <AppContent />
        </AppStateProvider>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
