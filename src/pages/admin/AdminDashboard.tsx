import React from 'react';
import { SimpleGrid, Title, Text, Paper, Grid, ThemeIcon, List, RingProgress, Group, Stack, Badge } from '@mantine/core';
import {
  IconSchool,
  IconUsers,
  IconBookmark,
  IconChecklist,
  IconClock,
  IconAlertCircle,
  IconUserPlus
} from '@tabler/icons-react';
import { useAppState } from '../../context/AppStateContext';
import { StatCard } from '../../components/StatCard';
import { SubscribeBanner } from '../../components/SubscribeBanner';

export const AdminDashboard: React.FC = () => {
  const { students, teachers, classes, subjects, attendance } = useAppState();

  // 1. Calculations for stats
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalClasses = classes.length;
  const totalSubjects = subjects.length;

  // Active clocked in teachers count
  const clockedInTeachers = teachers.filter(t => t.clockedIn).length;

  // Calculate today's or latest attendance rate
  // Let's find the latest date in the attendance records
  const studentRecords = attendance.filter(r => r.type === 'student');
  const uniqueDates = Array.from(new Set(studentRecords.map(r => r.date))).sort();
  const latestDate = uniqueDates[uniqueDates.length - 1] || new Date().toISOString().split('T')[0];

  const latestRecords = studentRecords.filter(r => r.date === latestDate);
  const presentStudents = latestRecords.filter(r => r.status === 'present' || r.status === 'late').length;
  const totalAttendanceLogged = latestRecords.length;
  
  const studentAttendancePercentage = totalAttendanceLogged > 0
    ? Math.round((presentStudents / totalAttendanceLogged) * 100)
    : 0;

  // Calculate teacher clock-in rate for today
  const teacherRecords = attendance.filter(r => r.type === 'teacher' && r.date === latestDate);
  const presentTeachers = teacherRecords.filter(r => r.status === 'present').length;
  const teacherAttendancePercentage = totalTeachers > 0
    ? Math.round((presentTeachers / totalTeachers) * 100)
    : 0;

  // Calculate class-wise attendance rates
  const classAttendanceRates = classes.map(cls => {
    const classRecords = latestRecords.filter(r => r.classId === cls.id);
    const presentInClass = classRecords.filter(r => r.status === 'present' || r.status === 'late').length;
    const totalInClass = classRecords.length;
    const rate = totalInClass > 0 ? Math.round((presentInClass / totalInClass) * 100) : 100;
    return { name: cls.name, rate, count: totalInClass };
  });

  return (
    <Stack gap="xl">
      <SubscribeBanner compact />

      {/* Main KPI Stat Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
        <StatCard
          title="Total Students"
          value={totalStudents}
          description="Registered active students"
          icon={<IconSchool size={24} />}
          color="indigo"
        />
        <StatCard
          title="Total Instructors"
          value={totalTeachers}
          description="Staff teachers directory"
          icon={<IconUsers size={24} />}
          color="violet"
        />
        <StatCard
          title="Active Classes"
          value={totalClasses}
          description="Assigned academic classes"
          icon={<IconBookmark size={24} />}
          color="pink"
        />
        <StatCard
          title="Curriculum Subjects"
          value={totalSubjects}
          description="Course structures"
          icon={<IconChecklist size={24} />}
          color="teal"
        />
      </SimpleGrid>

      {/* Attendance Rings & Activity Logs */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper
            withBorder
            radius="lg"
            p="xl"
            style={{
              background: 'var(--edu-glass-bg)',
              borderColor: 'var(--edu-glass-border)'
            }}
          >
            <Title order={3} size="h4" mb="xl" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>
              Live Roster Attendance Breakdown
            </Title>
            
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
              {/* Student Ring */}
              <Paper p="md" radius="md" withBorder style={{ borderColor: 'var(--edu-glass-border)' }}>
                <Group justify="space-between">
                  <Stack gap={5}>
                    <Text size="sm" fw={700} c="dimmed">STUDENT ATTENDANCE</Text>
                    <Text size="xs" c="dimmed">Latest Date: {latestDate}</Text>
                    <Text size="lg" fw={800} mt="xs">
                      {presentStudents} / {totalAttendanceLogged} Present
                    </Text>
                  </Stack>
                  <RingProgress
                    size={90}
                    roundCaps
                    thickness={8}
                    sections={[{ value: studentAttendancePercentage, color: 'indigo' }]}
                    label={
                      <Text size="xs" fw={700} ta="center">
                        {studentAttendancePercentage}%
                      </Text>
                    }
                  />
                </Group>
              </Paper>

              {/* Teacher Ring */}
              <Paper p="md" radius="md" withBorder style={{ borderColor: 'var(--edu-glass-border)' }}>
                <Group justify="space-between">
                  <Stack gap={5}>
                    <Text size="sm" fw={700} c="dimmed">TEACHER ATTENDANCE</Text>
                    <Text size="xs" c="dimmed">Clocked-In Today</Text>
                    <Text size="lg" fw={800} mt="xs">
                      {clockedInTeachers} / {totalTeachers} Active
                    </Text>
                  </Stack>
                  <RingProgress
                    size={90}
                    roundCaps
                    thickness={8}
                    sections={[{ value: teacherAttendancePercentage, color: 'violet' }]}
                    label={
                      <Text size="xs" fw={700} ta="center">
                        {teacherAttendancePercentage}%
                      </Text>
                    }
                  />
                </Group>
              </Paper>
            </SimpleGrid>

            {/* Class attendance bars */}
            <Title order={4} size="h5" mt="xl" mb="md" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Attendance Rate by Class
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              {classAttendanceRates.map(cls => (
                <Paper key={cls.name} p="md" radius="md" withBorder style={{ borderColor: 'var(--edu-glass-border)' }}>
                  <Group justify="space-between" mb="xs">
                    <Text size="sm" fw={600}>{cls.name}</Text>
                    <Badge color={cls.rate >= 90 ? 'green' : cls.rate >= 75 ? 'yellow' : 'red'}>
                      {cls.rate}% Rate
                    </Badge>
                  </Group>
                  <Text size="xs" c="dimmed">Based on {cls.count} allocated student logs</Text>
                </Paper>
              ))}
            </SimpleGrid>
          </Paper>
        </Grid.Col>

        {/* Live activity log */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper
            withBorder
            radius="lg"
            p="xl"
            style={{
              background: 'var(--edu-glass-bg)',
              borderColor: 'var(--edu-glass-border)',
              height: '100%'
            }}
          >
            <Title order={3} size="h4" mb="xl" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>
              Recent Portal Activities
            </Title>

            <List
              spacing="md"
              size="sm"
              center
              icon={
                <ThemeIcon size={24} radius="xl" color="indigo" variant="light">
                  <IconClock size={14} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <Text size="sm" fw={500}>System initialized successfully</Text>
                <Text size="xs" c="dimmed">Database seed logs created</Text>
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon size={24} radius="xl" color="teal" variant="light">
                    <IconUserPlus size={14} />
                  </ThemeIcon>
                }
              >
                <Text size="sm" fw={500}>{totalStudents} students synced online</Text>
                <Text size="xs" c="dimmed">Active rosters verified</Text>
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon size={24} radius="xl" color="violet" variant="light">
                    <IconChecklist size={14} />
                  </ThemeIcon>
                }
              >
                <Text size="sm" fw={500}>{clockedInTeachers} teachers currently clocked in</Text>
                <Text size="xs" c="dimmed">Live log monitoring active</Text>
              </List.Item>
              {attendance.length > 0 && (
                <List.Item
                  icon={
                    <ThemeIcon size={24} radius="xl" color="pink" variant="light">
                      <IconAlertCircle size={14} />
                    </ThemeIcon>
                  }
                >
                  <Text size="sm" fw={500}>{attendance.filter(a => a.type === 'student').length} attendance logs active</Text>
                  <Text size="xs" c="dimmed">Historical records stored in LocalStorage</Text>
                </List.Item>
              )}
            </List>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
export default AdminDashboard;
