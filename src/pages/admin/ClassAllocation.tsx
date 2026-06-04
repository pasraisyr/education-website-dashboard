import React, { useState, useEffect } from 'react';
import {
  Select,
  MultiSelect,
  Button,
  Group,
  Title,
  Text,
  Paper,
  Stack,
  Box,
  SimpleGrid,
  ThemeIcon,
  Avatar,
  Table,
  Badge
} from '@mantine/core';
import { IconClipboardList, IconUsers, IconCheckbox } from '@tabler/icons-react';
import { useAppState } from '../../context/AppStateContext';
import { notifications } from '@mantine/notifications';

export const ClassAllocation: React.FC = () => {
  const {
    classes,
    teachers,
    students,
    allocations,
    allocateTeacherToClass,
    allocateStudentsToClass,
    getStudentsInClass,
    getTeacherForClass
  } = useAppState();

  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  
  // Local Form States
  const [assignedTeacherId, setAssignedTeacherId] = useState<string>('');
  const [assignedStudentIds, setAssignedStudentIds] = useState<string[]>([]);

  // Load allocations whenever class selection changes
  useEffect(() => {
    if (selectedClassId) {
      const allocation = allocations.find(a => a.classId === selectedClassId);
      if (allocation) {
        setAssignedTeacherId(allocation.teacherId || '');
        setAssignedStudentIds(allocation.studentIds || []);
      } else {
        setAssignedTeacherId('');
        setAssignedStudentIds([]);
      }
    }
  }, [selectedClassId, allocations]);

  // Set default class on load if available
  useEffect(() => {
    if (classes.length > 0 && !selectedClassId) {
      setSelectedClassId(classes[0].id);
    }
  }, [classes, selectedClassId]);

  const handleSave = () => {
    if (!selectedClassId) {
      notifications.show({ title: 'Selection Error', message: 'Please select a class first.', color: 'yellow' });
      return;
    }

    allocateTeacherToClass(selectedClassId, assignedTeacherId);
    allocateStudentsToClass(selectedClassId, assignedStudentIds);

    notifications.show({
      title: 'Allocations Saved',
      message: 'Teacher and Student rosters updated successfully.',
      color: 'teal'
    });
  };

  // Map data for dropdowns
  const classSelectData = classes.map(c => ({
    value: c.id,
    label: `${c.grade} - ${c.name}`
  }));

  const teacherSelectData = [
    { value: '', label: 'No Teacher Assigned (Vacant)' },
    ...teachers.map(t => ({
      value: t.id,
      label: `${t.name} (${t.subjectSpecialization})`
    }))
  ];

  const studentSelectData = students.map(s => ({
    value: s.id,
    label: `${s.name} (${s.id.toUpperCase()})`
  }));

  const activeClass = classes.find(c => c.id === selectedClassId);
  const activeClassStudents = selectedClassId ? getStudentsInClass(selectedClassId) : [];
  const activeClassTeacher = selectedClassId ? getTeacherForClass(selectedClassId) : null;

  return (
    <Stack gap="xl">
      <Box>
        <Title order={2} style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800 }}>
          Class Allocation Manager
        </Title>
        <Text size="sm" c="dimmed">
          Allocate teachers as class tutors, assign students to classes, and review active rosters.
        </Text>
      </Box>

      {/* Selection Panel */}
      <Paper
        withBorder
        radius="lg"
        p="xl"
        style={{
          background: 'var(--edu-glass-bg)',
          borderColor: 'var(--edu-glass-border)'
        }}
      >
        <Group align="flex-end" gap="xl">
          <Select
            label="Select Class to Allocate Roster"
            placeholder="Choose class..."
            data={classSelectData}
            value={selectedClassId}
            onChange={(val) => setSelectedClassId(val)}
            radius="md"
            style={{ minWidth: '300px' }}
          />
          {activeClass && (
            <Badge size="lg" color="indigo" radius="md" h={36} p="md">
              {activeClassStudents.length} Students Allocated
            </Badge>
          )}
        </Group>
      </Paper>

      {selectedClassId && activeClass ? (
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          
          {/* Allocations Form Card */}
          <Paper
            withBorder
            radius="lg"
            p="xl"
            style={{
              background: 'var(--edu-glass-bg)',
              borderColor: 'var(--edu-glass-border)'
            }}
          >
            <Group gap="xs" mb="xl">
              <ThemeIcon size="md" color="indigo" radius="md">
                <IconClipboardList size={18} />
              </ThemeIcon>
              <Title order={3} size="h4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Roster Allocation Configuration
              </Title>
            </Group>

            <Stack gap="lg">
              <Select
                label="Assigned Lead Teacher"
                placeholder="Assign class tutor..."
                data={teacherSelectData}
                value={assignedTeacherId}
                onChange={(val) => setAssignedTeacherId(val || '')}
                radius="md"
              />

              <MultiSelect
                label="Enrolled Students"
                placeholder="Add/remove students in batch..."
                data={studentSelectData}
                value={assignedStudentIds}
                onChange={setAssignedStudentIds}
                radius="md"
                searchable
              />

              <Button
                onClick={handleSave}
                radius="md"
                size="md"
                variant="gradient"
                gradient={{ from: 'indigo', to: 'violet', deg: 135 }}
                leftSection={<IconCheckbox size={18} />}
                mt="md"
              >
                Save Allocation Changes
              </Button>
            </Stack>
          </Paper>

          {/* Current Roster Preview Card */}
          <Paper
            withBorder
            radius="lg"
            p="xl"
            style={{
              background: 'var(--edu-glass-bg)',
              borderColor: 'var(--edu-glass-border)'
            }}
          >
            <Group gap="xs" mb="xl">
              <ThemeIcon size="md" color="violet" radius="md">
                <IconUsers size={18} />
              </ThemeIcon>
              <Title order={3} size="h4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Class Roster Preview
              </Title>
            </Group>

            {/* Class Tutor section */}
            <Paper p="md" radius="md" withBorder mb="lg" style={{ borderColor: 'var(--edu-glass-border)' }}>
              <Text size="xs" c="dimmed" fw={700} tt="uppercase" mb="xs">Class Lead Tutor</Text>
              {activeClassTeacher ? (
                <Group gap="sm">
                  <Avatar color="violet" size="md" name={activeClassTeacher.name} />
                  <Box>
                    <Text size="sm" fw={700}>{activeClassTeacher.name}</Text>
                    <Text size="xs" c="dimmed">Spec: {activeClassTeacher.subjectSpecialization} • {activeClassTeacher.email}</Text>
                  </Box>
                </Group>
              ) : (
                <Text size="sm" c="red" fw={500}>No lead tutor assigned to this class yet.</Text>
              )}
            </Paper>

            {/* Class Students section */}
            <Text size="xs" c="dimmed" fw={700} tt="uppercase" mb="xs">Enrolled Student List</Text>
            <Box style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid var(--edu-glass-border)', borderRadius: '8px' }}>
              {activeClassStudents.length === 0 ? (
                <Box p="md" style={{ textAlign: 'center' }}>
                  <Text size="sm" c="dimmed">No students enrolled in this class roster.</Text>
                </Box>
              ) : (
                <Table verticalSpacing="xs">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th style={{ fontSize: '11px' }}>ID</Table.Th>
                      <Table.Th style={{ fontSize: '11px' }}>Name</Table.Th>
                      <Table.Th style={{ fontSize: '11px' }}>Gender</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {activeClassStudents.map(student => (
                      <Table.Tr key={student.id}>
                        <Table.Td>
                          <Text size="xs" fw={700} c="dimmed">{student.id.toUpperCase()}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="xs" fw={600}>{student.name}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="xs">{student.gender}</Text>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              )}
            </Box>
          </Paper>

        </SimpleGrid>
      ) : (
        <Paper p="xl" radius="md" withBorder style={{ textAlign: 'center' }}>
          <Text c="dimmed">Please create at least one class in the Classes Directory first.</Text>
        </Paper>
      )}
    </Stack>
  );
};
export default ClassAllocation;
