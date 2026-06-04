import React, { useState } from 'react';
import {
  Select,
  Table,
  Badge,
  Title,
  Text,
  Paper,
  Stack,
  Box,
  Tabs,
  TextInput,
  Group,
  RingProgress,
  ThemeIcon,
  SimpleGrid,
  Grid
} from '@mantine/core';
import { IconCalendar, IconSchool, IconUsers, IconCheck, IconX, IconAlertTriangle } from '@tabler/icons-react';
import { useAppState } from '../../context/AppStateContext';

export const CheckAttendance: React.FC = () => {
  const { classes, teachers, attendance, getStudentsInClass } = useAppState();

  const [activeTab, setActiveTab] = useState<string | null>('students');

  // Query States
  const [selectedClassId, setSelectedClassId] = useState<string | null>(classes[0]?.id || null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [teacherDate, setTeacherDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Map classes data
  const classSelectData = classes.map(c => ({
    value: c.id,
    label: `${c.grade} - ${c.name}`
  }));

  // Fetch Student Records for class and date
  const classStudents = selectedClassId ? getStudentsInClass(selectedClassId) : [];
  
  const classStudentRecords = attendance.filter(
    r => r.type === 'student' && r.classId === selectedClassId && r.date === selectedDate
  );

  const isStudentAttendanceRecorded = classStudentRecords.length > 0;

  // Calculate statistics for students
  const presentCount = classStudentRecords.filter(r => r.status === 'present').length;
  const lateCount = classStudentRecords.filter(r => r.status === 'late').length;
  const absentCount = classStudentRecords.filter(r => r.status === 'absent').length;
  const totalStudentsInClass = classStudents.length;

  const attendanceRatio = totalStudentsInClass > 0 && isStudentAttendanceRecorded
    ? Math.round(((presentCount + lateCount) / totalStudentsInClass) * 100)
    : 0;

  // Fetch Teacher Records for date
  const teacherRecords = attendance.filter(r => r.type === 'teacher' && r.date === teacherDate);

  const getTeacherAttendanceStatus = (teacherId: string) => {
    const record = teacherRecords.find(r => r.targetId === teacherId);
    if (record) {
      return {
        status: record.status,
        remarks: record.remarks || 'Clocked in successfully'
      };
    }
    return {
      status: 'absent' as const,
      remarks: 'Not Clocked In'
    };
  };

  const clockedInCount = teachers.filter(t => {
    const att = getTeacherAttendanceStatus(t.id);
    return att.status === 'present';
  }).length;

  return (
    <Stack gap="xl">
      <Box>
        <Title order={2} style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800 }}>
          Attendance Monitor
        </Title>
        <Text size="sm" c="dimmed">
          Inspect student class attendance logs and track teacher daily clock-in records.
        </Text>
      </Box>

      <Tabs value={activeTab} onChange={setActiveTab} color="indigo" radius="md">
        <Tabs.List mb="lg">
          <Tabs.Tab value="students" leftSection={<IconSchool size={16} />}>
            Student Roster Attendance
          </Tabs.Tab>
          <Tabs.Tab value="teachers" leftSection={<IconUsers size={16} />}>
            Teacher Clock-In Roster
          </Tabs.Tab>
        </Tabs.List>

        {/* Student Attendance Tab */}
        <Tabs.Panel value="students">
          <Stack gap="lg">
            {/* Filter Panel */}
            <Paper withBorder radius="lg" p="xl" className="glass-panel" style={{ borderColor: 'var(--edu-glass-border)' }}>
              <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
                <Select
                  label="Select Class"
                  placeholder="Choose class..."
                  data={classSelectData}
                  value={selectedClassId}
                  onChange={(val) => setSelectedClassId(val)}
                  radius="md"
                />
                
                <TextInput
                  label="Select Date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  radius="md"
                  leftSection={<IconCalendar size={16} />}
                />

                <Group gap="xs">
                  {isStudentAttendanceRecorded ? (
                    <Badge color="green" size="lg" radius="md" h={36} p="md">
                      Attendance Recorded
                    </Badge>
                  ) : (
                    <Badge color="yellow" size="lg" radius="md" h={36} p="md" leftSection={<IconAlertTriangle size={12} />}>
                      Pending Record
                    </Badge>
                  )}
                </Group>
              </SimpleGrid>
            </Paper>

            {selectedClassId ? (
              <Grid>
                {/* Stats Breakdown Column */}
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Paper withBorder radius="lg" p="xl" className="glass-panel" style={{ borderColor: 'var(--edu-glass-border)', height: '100%' }}>
                    <Title order={3} size="h4" mb="lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Roster Summary
                    </Title>

                    {isStudentAttendanceRecorded ? (
                      <Stack align="center" gap="md">
                        <RingProgress
                          size={150}
                          thickness={12}
                          roundCaps
                          sections={[
                            { value: (presentCount / totalStudentsInClass) * 100, color: 'green' },
                            { value: (lateCount / totalStudentsInClass) * 100, color: 'yellow' },
                            { value: (absentCount / totalStudentsInClass) * 100, color: 'red' }
                          ]}
                          label={
                            <Text size="md" fw={700} ta="center">
                              {attendanceRatio}% Rate
                            </Text>
                          }
                        />
                        <Stack gap="xs" style={{ width: '100%' }}>
                          <Group justify="space-between">
                            <Group gap="xs">
                              <ThemeIcon size="xs" color="green" radius="xl" />
                              <Text size="sm" fw={500}>Present</Text>
                            </Group>
                            <Text size="sm" fw={700}>{presentCount}</Text>
                          </Group>
                          
                          <Group justify="space-between">
                            <Group gap="xs">
                              <ThemeIcon size="xs" color="yellow" radius="xl" />
                              <Text size="sm" fw={500}>Late</Text>
                            </Group>
                            <Text size="sm" fw={700}>{lateCount}</Text>
                          </Group>

                          <Group justify="space-between">
                            <Group gap="xs">
                              <ThemeIcon size="xs" color="red" radius="xl" />
                              <Text size="sm" fw={500}>Absent</Text>
                            </Group>
                            <Text size="sm" fw={700}>{absentCount}</Text>
                          </Group>

                          <Group justify="space-between" style={{ borderTop: '1px solid var(--edu-glass-border)', paddingTop: '10px' }}>
                            <Text size="sm" fw={700}>Total Students</Text>
                            <Text size="sm" fw={700}>{totalStudentsInClass}</Text>
                          </Group>
                        </Stack>
                      </Stack>
                    ) : (
                      <Box style={{ textAlign: 'center' }} py="xl">
                        <IconAlertTriangle size={40} style={{ color: 'var(--mantine-color-yellow-filled)' }} />
                        <Text size="sm" fw={600} mt="md">No data logged for today.</Text>
                        <Text size="xs" c="dimmed" mt={5}>Instructors have not taken class attendance sheet for this date yet.</Text>
                      </Box>
                    )}
                  </Paper>
                </Grid.Col>

                {/* Students Details Column */}
                <Grid.Col span={{ base: 12, md: 8 }}>
                  <Paper withBorder radius="lg" p="xl" className="glass-panel" style={{ borderColor: 'var(--edu-glass-border)' }}>
                    <Title order={3} size="h4" mb="xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Student Logs Table
                    </Title>

                    <Box style={{ overflowX: 'auto' }}>
                      <Table verticalSpacing="sm" highlightOnHover>
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th>Student ID</Table.Th>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Remarks / Notes</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {classStudents.length === 0 ? (
                            <Table.Tr>
                              <Table.Td colSpan={4} style={{ textAlign: 'center' }}>
                                <Text c="red" fw={500}>No students allocated to this class. Go to Allocation menu to add them.</Text>
                              </Table.Td>
                            </Table.Tr>
                          ) : (
                            classStudents.map(student => {
                              const record = classStudentRecords.find(r => r.targetId === student.id);
                              let statusBadge = <Badge color="gray">Not Recorded</Badge>;
                              
                              if (record) {
                                if (record.status === 'present') statusBadge = <Badge color="green" leftSection={<IconCheck size={10} />}>Present</Badge>;
                                else if (record.status === 'absent') statusBadge = <Badge color="red" leftSection={<IconX size={10} />}>Absent</Badge>;
                                else if (record.status === 'late') statusBadge = <Badge color="yellow">Late</Badge>;
                              }

                              return (
                                <Table.Tr key={student.id}>
                                  <Table.Td>
                                    <Text size="xs" fw={700} c="dimmed">{student.id.toUpperCase()}</Text>
                                  </Table.Td>
                                  <Table.Td>
                                    <Text size="sm" fw={600}>{student.name}</Text>
                                  </Table.Td>
                                  <Table.Td>{statusBadge}</Table.Td>
                                  <Table.Td>
                                    <Text size="xs" c="dimmed">
                                      {record?.remarks || '—'}
                                    </Text>
                                  </Table.Td>
                                </Table.Tr>
                              );
                            })
                          )}
                        </Table.Tbody>
                      </Table>
                    </Box>
                  </Paper>
                </Grid.Col>
              </Grid>
            ) : (
              <Paper p="xl" radius="md" withBorder style={{ textAlign: 'center' }}>
                <Text c="dimmed">Create classes in database first.</Text>
              </Paper>
            )}
          </Stack>
        </Tabs.Panel>

        {/* Teacher Clock-In Tab */}
        <Tabs.Panel value="teachers">
          <Stack gap="lg">
            {/* Filter Panel */}
            <Paper withBorder radius="lg" p="xl" className="glass-panel" style={{ borderColor: 'var(--edu-glass-border)' }}>
              <Group gap="xl" align="flex-end">
                <TextInput
                  label="Select Log Date"
                  type="date"
                  value={teacherDate}
                  onChange={(e) => setTeacherDate(e.target.value)}
                  radius="md"
                  leftSection={<IconCalendar size={16} />}
                  style={{ minWidth: '250px' }}
                />
                
                <Badge color="violet" size="lg" radius="md" h={36} p="md">
                  {clockedInCount} / {teachers.length} Active Today
                </Badge>
              </Group>
            </Paper>

            <Paper withBorder radius="lg" p="xl" className="glass-panel" style={{ borderColor: 'var(--edu-glass-border)' }}>
              <Box style={{ overflowX: 'auto' }}>
                <Table verticalSpacing="sm" highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Teacher ID</Table.Th>
                      <Table.Th>Name</Table.Th>
                      <Table.Th>Specialization</Table.Th>
                      <Table.Th>Log Date</Table.Th>
                      <Table.Th>Clock Status</Table.Th>
                      <Table.Th>Log Details</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {teachers.length === 0 ? (
                      <Table.Tr>
                        <Table.Td colSpan={6} style={{ textAlign: 'center' }}>
                          <Text c="dimmed">No teachers registered in database.</Text>
                        </Table.Td>
                      </Table.Tr>
                    ) : (
                      teachers.map(teacher => {
                        const att = getTeacherAttendanceStatus(teacher.id);
                        return (
                          <Table.Tr key={teacher.id}>
                            <Table.Td>
                              <Text size="xs" fw={700} c="dimmed">{teacher.id.toUpperCase()}</Text>
                            </Table.Td>
                            <Table.Td>
                              <Text size="sm" fw={600}>{teacher.name}</Text>
                            </Table.Td>
                            <Table.Td>
                              <Badge color="indigo" variant="light" radius="md">
                                {teacher.subjectSpecialization}
                              </Badge>
                            </Table.Td>
                            <Table.Td>
                              <Text size="xs">{teacherDate}</Text>
                            </Table.Td>
                            <Table.Td>
                              {att.status === 'present' ? (
                                <Badge color="green" leftSection={<IconCheck size={10} />}>Clocked In</Badge>
                              ) : (
                                <Badge color="gray" variant="light" leftSection={<IconX size={10} />}>Not Clocked In</Badge>
                              )}
                            </Table.Td>
                            <Table.Td>
                              <Text size="xs" c={att.status === 'present' ? 'green' : 'dimmed'} fw={att.status === 'present' ? 600 : 400}>
                                {att.remarks}
                              </Text>
                            </Table.Td>
                          </Table.Tr>
                        );
                      })
                    )}
                  </Table.Tbody>
                </Table>
              </Box>
            </Paper>
          </Stack>
        </Tabs.Panel>

      </Tabs>
    </Stack>
  );
};
export default CheckAttendance;
