import React, { useState, useEffect } from 'react';
import {
  Title,
  Text,
  Box,
  Paper,
  Table,
  Button,
  Group,
  TextInput,
  Radio,
  Stack,
  Badge
} from '@mantine/core';
import { IconClipboardCheck, IconCalendar, IconCheck, IconAlertTriangle } from '@tabler/icons-react';
import { useAuth } from '../../context/AuthContext';
import { useAppState } from '../../context/AppStateContext';
import { notifications } from '@mantine/notifications';

interface StudentAttendanceInput {
  studentId: string;
  status: 'present' | 'absent' | 'late';
  remarks: string;
}

export const TakeAttendance: React.FC = () => {
  const { user } = useAuth();
  const {
    getClassForTeacher,
    getStudentsInClass,
    attendance,
    saveStudentAttendance
  } = useAppState();

  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [attendanceSheet, setAttendanceSheet] = useState<StudentAttendanceInput[]>([]);

  if (!user || !user.teacherId) return null;

  const teacherId = user.teacherId;
  const assignedClass = getClassForTeacher(teacherId);
  const classStudents = assignedClass ? getStudentsInClass(assignedClass.id) : [];

  // Initialize or load existing attendance sheet for the selected class and date
  useEffect(() => {
    if (assignedClass && classStudents.length > 0) {
      // Check if there are existing records for this class & date
      const existingRecords = attendance.filter(
        r => r.type === 'student' && r.classId === assignedClass.id && r.date === selectedDate
      );

      const initialSheet: StudentAttendanceInput[] = classStudents.map(student => {
        const record = existingRecords.find(r => r.targetId === student.id);
        return {
          studentId: student.id,
          status: record ? record.status : 'present', // default to present if no record
          remarks: record ? record.remarks || '' : ''
        };
      });

      setAttendanceSheet(initialSheet);
    }
  }, [selectedDate, classStudents, attendance]); // depend on attendance/student list triggers

  // Handle local status change
  const handleStatusChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceSheet(prev =>
      prev.map(row => (row.studentId === studentId ? { ...row, status } : row))
    );
  };

  // Handle local remarks change
  const handleRemarksChange = (studentId: string, remarks: string) => {
    setAttendanceSheet(prev =>
      prev.map(row => (row.studentId === studentId ? { ...row, remarks } : row))
    );
  };

  const handleSave = () => {
    if (!assignedClass) return;

    // Convert sheet format to Context payload
    const records = attendanceSheet.map(item => ({
      studentId: item.studentId,
      status: item.status,
      remarks: item.remarks || undefined
    }));

    saveStudentAttendance(assignedClass.id, selectedDate, records);
    notifications.show({
      title: 'Attendance Saved',
      message: `Daily attendance logs for ${assignedClass.name} have been registered.`,
      color: 'teal'
    });
  };

  const hasExistingLogs = attendance.some(
    r => r.type === 'student' && r.classId === assignedClass?.id && r.date === selectedDate
  );

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="center">
        <Box>
          <Title order={2} style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800 }}>
            Daily Attendance Sheet
          </Title>
          <Text size="sm" c="dimmed">
            Fill in student attendance rolls, mark statuses, and record medical or excuse notices.
          </Text>
        </Box>
        
        {assignedClass && (
          <Badge size="lg" color="indigo" radius="md">
            Class: {assignedClass.name} ({assignedClass.grade})
          </Badge>
        )}
      </Group>

      {/* Date filter & status bar */}
      <Paper withBorder radius="lg" p="xl" className="glass-panel" style={{ borderColor: 'var(--edu-glass-border)' }}>
        <Group gap="xl" align="flex-end">
          <TextInput
            label="Log Sheet Date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            radius="md"
            leftSection={<IconCalendar size={16} />}
            style={{ minWidth: '260px' }}
          />

          <Group gap="xs">
            {hasExistingLogs ? (
              <Badge color="green" size="md" radius="sm" leftSection={<IconCheck size={10} />} h={36} p="md">
                Sheet Submitted
              </Badge>
            ) : (
              <Badge color="yellow" size="md" radius="sm" leftSection={<IconAlertTriangle size={10} />} h={36} p="md">
                Roster Pending
              </Badge>
            )}
          </Group>
        </Group>
      </Paper>

      {/* Roster Sheet */}
      {assignedClass ? (
        classStudents.length === 0 ? (
          <Paper p="xl" radius="md" withBorder style={{ textAlign: 'center' }}>
            <Text c="red" fw={500}>No students are allocated to your class roster. Please ask the Administrator to assign students.</Text>
          </Paper>
        ) : (
          <Paper withBorder radius="lg" p="xl" className="glass-panel" style={{ borderColor: 'var(--edu-glass-border)' }}>
            <Box style={{ overflowX: 'auto' }}>
              <Table verticalSpacing="sm" highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th style={{ width: '150px' }}>Student ID</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th style={{ width: '320px' }}>Attendance Status</Table.Th>
                    <Table.Th>Remarks / Absence Excuses</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {classStudents.map(student => {
                    const rowState = attendanceSheet.find(r => r.studentId === student.id);
                    if (!rowState) return null;

                    return (
                      <Table.Tr key={student.id}>
                        <Table.Td>
                          <Text size="xs" fw={700} c="dimmed">{student.id.toUpperCase()}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm" fw={600}>{student.name}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Radio.Group
                            value={rowState.status}
                            onChange={(val) => handleStatusChange(student.id, val as any)}
                          >
                            <Group gap="md">
                              <Radio value="present" label="Present" color="green" styles={{ label: { fontSize: '13px' } }} />
                              <Radio value="late" label="Late" color="yellow" styles={{ label: { fontSize: '13px' } }} />
                              <Radio value="absent" label="Absent" color="red" styles={{ label: { fontSize: '13px' } }} />
                            </Group>
                          </Radio.Group>
                        </Table.Td>
                        <Table.Td>
                          <TextInput
                            placeholder="e.g. Doctor's note, school bus delay"
                            value={rowState.remarks}
                            onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                            radius="md"
                            size="xs"
                          />
                        </Table.Td>
                      </Table.Tr>
                    );
                  })}
                </Table.Tbody>
              </Table>
            </Box>

            <Group justify="flex-end" mt="xl">
              <Button
                size="md"
                radius="md"
                variant="gradient"
                gradient={{ from: 'indigo', to: 'violet', deg: 135 }}
                onClick={handleSave}
                leftSection={<IconClipboardCheck size={18} />}
              >
                Save Daily Attendance
              </Button>
            </Group>
          </Paper>
        )
      ) : (
        <Paper p="xl" radius="md" withBorder style={{ textAlign: 'center' }}>
          <Text c="red" fw={500}>No Class Assigned. Please ask the Administrator to allocate a class to you.</Text>
        </Paper>
      )}
    </Stack>
  );
};
export default TakeAttendance;
