import React, { useState } from 'react';
import { Container, Card, Title, Text, TextInput, PasswordInput, Button, Stack, Group, Box, Divider, Select } from '@mantine/core';
import { IconLock, IconMail, IconArrowLeft, IconUserCheck, IconUserCircle } from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppStateContext';
import { notifications } from '@mantine/notifications';

interface LoginPageProps {
  onBackClick: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onBackClick }) => {
  const { login } = useAuth();
  const { teachers } = useAppState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);

  // Manual credentials check (mocked)
  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      notifications.show({
        title: 'Validation Error',
        message: 'Please fill in both fields.',
        color: 'yellow'
      });
      return;
    }

    if (email.toLowerCase() === 'admin@pasraisyedu.com' && password === 'admin123') {
      login('admin');
      notifications.show({
        title: 'Admin Success',
        message: 'Successfully logged in as Administrator.',
        color: 'indigo'
      });
    } else {
      // Check if matches any teacher email
      const matchedTeacher = teachers.find(t => t.email.toLowerCase() === email.toLowerCase());
      if (matchedTeacher && password === 'teacher123') {
        login('teacher', matchedTeacher.id);
        notifications.show({
          title: 'Teacher Success',
          message: `Successfully logged in as ${matchedTeacher.name}.`,
          color: 'violet'
        });
      } else {
        notifications.show({
          title: 'Access Denied',
          message: 'Invalid credentials. Use admin@pasraisyedu.com / admin123 or teacher emails / teacher123. Or use the quick shortcuts below!',
          color: 'red'
        });
      }
    }
  };

  const handleQuickAdmin = () => {
    login('admin');
    notifications.show({
      title: 'Demo Access',
      message: 'Logged in as Admin (Full Rights).',
      color: 'indigo'
    });
  };

  const handleQuickTeacher = () => {
    if (!selectedTeacherId) {
      notifications.show({
        title: 'Selection Required',
        message: 'Please choose a teacher from the dropdown first.',
        color: 'yellow'
      });
      return;
    }
    const teacher = teachers.find(t => t.id === selectedTeacherId);
    login('teacher', selectedTeacherId);
    notifications.show({
      title: 'Demo Access',
      message: `Logged in as ${teacher?.name || 'Teacher'}.`,
      color: 'violet'
    });
  };

  // Map teachers for dropdown select
  const teacherSelectData = teachers.map(t => ({
    value: t.id,
    label: `${t.name} (${t.subjectSpecialization})`
  }));

  return (
    <Box
      className="animated-gradient-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '20px',
        alignItems: 'center'
      }}
    >
      <Container size="xs" style={{ width: '100%', maxWidth: '440px' }}>
        {/* Back Button */}
        <Button
          leftSection={<IconArrowLeft size={16} />}
          variant="subtle"
          color="white"
          onClick={onBackClick}
          mb="xl"
          style={{ alignSelf: 'flex-start' }}
        >
          Back to Public Site
        </Button>

        <Card
          shadow="xl"
          padding="xl"
          radius="xl"
          className="glass-panel"
          style={{
            borderColor: 'var(--edu-glass-border)',
            background: 'var(--edu-glass-bg)',
            backdropFilter: 'blur(20px)'
          }}
        >
          {/* Logo Heading */}
          <Stack align="center" gap="xs" mb="lg">
            <Box
              className="animated-gradient-bg"
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 800,
                fontSize: '22px',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              PS
            </Box>
            <Title order={2} style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800 }}>
              Welcome Back
            </Title>
            <Text size="sm" c="dimmed" ta="center">
              Enter your credentials or use the live demo shortcuts below to explore the portal modules.
            </Text>
          </Stack>

          {/* Login Form */}
          <form onSubmit={handleManualLogin}>
            <Stack gap="md">
              <TextInput
                label="Email Address"
                placeholder="e.g. admin@pasraisyedu.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftSection={<IconMail size={16} />}
                radius="md"
              />

              <PasswordInput
                label="Password"
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftSection={<IconLock size={16} />}
                radius="md"
              />

              <Button
                type="submit"
                fullWidth
                size="md"
                radius="md"
                variant="gradient"
                gradient={{ from: 'indigo', to: 'violet', deg: 135 }}
                mt="xs"
              >
                Log In
              </Button>
            </Stack>
          </form>

          <Divider my="lg" label="Demo Quick Access Shortcuts" labelPosition="center" />

          {/* Quick Access panel for client review */}
          <Stack gap="sm">
            <Button
              variant="outline"
              color="indigo"
              radius="md"
              leftSection={<IconUserCheck size={18} />}
              onClick={handleQuickAdmin}
            >
              Quick Login as Admin
            </Button>

            <Group gap="xs" grow>
              <Select
                placeholder="Choose Teacher"
                data={teacherSelectData}
                value={selectedTeacherId}
                onChange={(val) => setSelectedTeacherId(val)}
                radius="md"
                style={{ flex: 1 }}
              />
              <Button
                variant="light"
                color="violet"
                radius="md"
                leftSection={<IconUserCircle size={18} />}
                onClick={handleQuickTeacher}
                disabled={!selectedTeacherId}
              >
                As Teacher
              </Button>
            </Group>
            
            <Text size="xs" c="dimmed" ta="center" mt="xs">
              Credentials: <b>admin@pasraisyedu.com</b> / <b>admin123</b> <br />
              Teacher Email (choose list) / <b>teacher123</b>
            </Text>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
};
export default LoginPage;
