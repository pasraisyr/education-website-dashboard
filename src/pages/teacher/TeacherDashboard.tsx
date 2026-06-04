import React, { useState, useEffect } from 'react';
import { Title, Text, Box, Paper, Button, Group, Badge, SimpleGrid, ThemeIcon, Stack } from '@mantine/core';
import { IconClock, IconUsers, IconBookmark, IconClipboardCheck, IconMapPin } from '@tabler/icons-react';
import { useAuth } from '../../context/AuthContext';
import { useAppState } from '../../context/AppStateContext';
import { notifications } from '@mantine/notifications';
import { OverviewBanner } from '../../components/OverviewBanner';

interface TeacherDashboardProps {
  setActiveView: (view: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ setActiveView }) => {
  const { user } = useAuth();
  const { teachers, attendance, getClassForTeacher, getStudentsInClass, teacherClockIn, teacherClockOut } = useAppState();

  const [time, setTime] = useState(new Date());

  // Live ticking clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!user || !user.teacherId) return null;

  const teacherId = user.teacherId;
  const teacherProfile = teachers.find(t => t.id === teacherId);
  const assignedClass = getClassForTeacher(teacherId);
  const classStudents = assignedClass ? getStudentsInClass(assignedClass.id) : [];

  const isClockedIn = teacherProfile?.clockedIn || false;
  const todayDateStr = new Date().toISOString().split('T')[0];

  // Check if student attendance is already taken for today for their assigned class
  const classAttendanceRecords = attendance.filter(
    r => r.type === 'student' && r.classId === assignedClass?.id && r.date === todayDateStr
  );
  const isAttendanceTakenToday = classAttendanceRecords.length > 0;

  const handleClockAction = () => {
    if (isClockedIn) {
      teacherClockOut(teacherId, todayDateStr);
      notifications.show({
        title: 'Clocked Out',
        message: 'You have clocked out for the day. Have a great evening!',
        color: 'gray'
      });
    } else {
      teacherClockIn(teacherId, todayDateStr);
      notifications.show({
        title: 'Clocked In',
        message: 'Your clock-in attendance has been registered successfully.',
        color: 'green'
      });
    }
  };

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate = time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Stack gap="xl">
      <OverviewBanner
        title={`Welcome back, ${user.name}!`}
        subtitle={assignedClass
          ? `You are assigned as the Lead Tutor for ${assignedClass.grade} - ${assignedClass.name}. Manage student rosters, check daily schedules, and register attendance details.`
          : 'You currently have no class assigned. Please contact the administrative department for class allocations.'
        }
        badgeText="🎓 Teacher Workspace"
        avatarName={user.name}
      />

      {/* Clock in and Metrics */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
        {/* Clock In Panel */}
        <Paper
          withBorder
          radius="lg"
          p="xl"
          style={{
            background: 'var(--edu-glass-bg)',
            borderColor: 'var(--edu-glass-border)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Stack align="center" gap="md">
            <ThemeIcon size="xl" radius="md" color={isClockedIn ? 'green' : 'gray'} variant="light">
              <IconClock size={30} />
            </ThemeIcon>

            <Title order={3} style={{ fontFamily: 'Outfit, sans-serif', fontSize: '36px', fontWeight: 900 }} mb={0}>
              {formattedTime}
            </Title>
            <Text size="sm" c="dimmed" fw={600}>{formattedDate}</Text>

            <Group gap="xs" mb="md">
              <Badge
                color={isClockedIn ? 'green' : 'gray'}
                variant={isClockedIn ? 'filled' : 'light'}
                size="lg"
                radius="md"
                leftSection={<IconMapPin size={12} />}
              >
                Status: {isClockedIn ? 'Active Duty • Clocked In' : 'Off Duty • Clocked Out'}
              </Badge>
            </Group>

            <Button
              size="lg"
              fullWidth
              radius="md"
              color={isClockedIn ? 'red' : 'green'}
              onClick={handleClockAction}
            >
              {isClockedIn ? 'Clock Out' : 'Clock In Duty'}
            </Button>
          </Stack>
        </Paper>

        {/* Dynamic Class Metrics */}
        <Paper
          withBorder
          radius="lg"
          p="xl"
          style={{
            background: 'var(--edu-glass-bg)',
            borderColor: 'var(--edu-glass-border)'
          }}
        >
          <Title order={3} size="h4" mb="xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Your Class Metrics
          </Title>

          <SimpleGrid cols={2} spacing="md">
            {/* Assigned Class */}
            <Paper p="md" radius="md" withBorder style={{ borderColor: 'var(--edu-glass-border)' }}>
              <ThemeIcon size="md" color="indigo" variant="light" mb="xs">
                <IconBookmark size={18} />
              </ThemeIcon>
              <Text size="xs" c="dimmed" fw={700}>ASSIGNED CLASS</Text>
              <Text size="md" fw={800} mt={5}>
                {assignedClass ? assignedClass.name : 'None'}
              </Text>
              <Text size="xs" c="dimmed">Grade Level: {assignedClass ? assignedClass.grade : 'N/A'}</Text>
            </Paper>

            {/* Students count */}
            <Paper p="md" radius="md" withBorder style={{ borderColor: 'var(--edu-glass-border)' }}>
              <ThemeIcon size="md" color="violet" variant="light" mb="xs">
                <IconUsers size={18} />
              </ThemeIcon>
              <Text size="xs" c="dimmed" fw={700}>TOTAL STUDENTS</Text>
              <Text size="xl" fw={800} mt={5}>{classStudents.length}</Text>
              <Text size="xs" c="dimmed">Enrolled in roster</Text>
            </Paper>
          </SimpleGrid>

          {/* Attendance Status check */}
          <Paper p="md" radius="md" withBorder mt="lg" style={{ borderColor: 'var(--edu-glass-border)' }}>
            <Group justify="space-between">
              <Box>
                <Text size="xs" c="dimmed" fw={700}>TODAY'S STUDENT ATTENDANCE SHEET</Text>
                <Text size="sm" fw={600} mt={3}>
                  {isAttendanceTakenToday
                    ? 'Attendance recorded for today.'
                    : 'Attendance sheet pending registration.'
                  }
                </Text>
              </Box>
              <Badge color={isAttendanceTakenToday ? 'green' : 'yellow'} radius="md">
                {isAttendanceTakenToday ? 'Recorded' : 'Pending'}
              </Badge>
            </Group>
          </Paper>
        </Paper>
      </SimpleGrid>

      {/* Quick Action Navigation Grid */}
      <Title order={3} size="h4" mt="md" style={{ fontFamily: 'Outfit, sans-serif' }}>
        Quick Navigation Actions
      </Title>
      
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        <Paper
          withBorder
          radius="lg"
          p="xl"
          className="hover-glow"
          style={{ cursor: 'pointer', background: 'var(--edu-glass-bg)', borderColor: 'var(--edu-glass-border)' }}
          onClick={() => setActiveView('take-attendance')}
        >
          <Group gap="md">
            <ThemeIcon size={48} color="indigo" radius="md" variant="light">
              <IconClipboardCheck size={26} />
            </ThemeIcon>
            <Box>
              <Text size="md" fw={700}>Take Class Attendance</Text>
              <Text size="xs" c="dimmed">Fill in daily sheets for class students, record late/absent remarks</Text>
            </Box>
          </Group>
        </Paper>

        <Paper
          withBorder
          radius="lg"
          p="xl"
          className="hover-glow"
          style={{ cursor: 'pointer', background: 'var(--edu-glass-bg)', borderColor: 'var(--edu-glass-border)' }}
          onClick={() => setActiveView('view-class')}
        >
          <Group gap="md">
            <ThemeIcon size={48} color="violet" radius="md" variant="light">
              <IconUsers size={26} />
            </ThemeIcon>
            <Box>
              <Text size="md" fw={700}>View Roster Directory</Text>
              <Text size="xs" c="dimmed">Inspect detailed lists of students, parents contact details, and joined files</Text>
            </Box>
          </Group>
        </Paper>
      </SimpleGrid>
    </Stack>
  );
};
export default TeacherDashboard;
