import React, { useState } from 'react';
import {
  Title,
  Text,
  Box,
  Paper,
  Table,
  Group,
  TextInput,
  Stack,
  Badge,
  SimpleGrid,
  ThemeIcon
} from '@mantine/core';
import { IconSearch, IconUsers, IconBookmark, IconCalendar } from '@tabler/icons-react';
import { useAuth } from '../../context/AuthContext';
import { useAppState } from '../../context/AppStateContext';

export const ViewClass: React.FC = () => {
  const { user } = useAuth();
  const { getClassForTeacher, getStudentsInClass } = useAppState();
  
  const [search, setSearch] = useState('');

  if (!user || !user.teacherId) return null;

  const teacherId = user.teacherId;
  const assignedClass = getClassForTeacher(teacherId);
  const classStudents = assignedClass ? getStudentsInClass(assignedClass.id) : [];

  // Filter students based on search string
  const filteredStudents = classStudents.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="center">
        <Box>
          <Title order={2} style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800 }}>
            Class Roster Directory
          </Title>
          <Text size="sm" c="dimmed">
            Inspect registered student profiles, contact coordinates, and basic details within your classroom.
          </Text>
        </Box>
        
        {assignedClass && (
          <Badge size="lg" color="indigo" radius="md">
            {assignedClass.name}
          </Badge>
        )}
      </Group>

      {assignedClass ? (
        <>
          {/* Class Overview Cards */}
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
            <Paper p="md" radius="md" withBorder style={{ borderColor: 'var(--edu-glass-border)' }}>
              <Group gap="sm">
                <ThemeIcon color="indigo" radius="md">
                  <IconBookmark size={18} />
                </ThemeIcon>
                <Box>
                  <Text size="xs" c="dimmed" fw={700}>GRADE LEVEL</Text>
                  <Text size="sm" fw={800}>{assignedClass.grade}</Text>
                </Box>
              </Group>
            </Paper>

            <Paper p="md" radius="md" withBorder style={{ borderColor: 'var(--edu-glass-border)' }}>
              <Group gap="sm">
                <ThemeIcon color="violet" radius="md">
                  <IconUsers size={18} />
                </ThemeIcon>
                <Box>
                  <Text size="xs" c="dimmed" fw={700}>TOTAL ROSTER SIZE</Text>
                  <Text size="sm" fw={800}>{classStudents.length} Students</Text>
                </Box>
              </Group>
            </Paper>

            <Paper p="md" radius="md" withBorder style={{ borderColor: 'var(--edu-glass-border)' }}>
              <Group gap="sm">
                <ThemeIcon color="pink" radius="md">
                  <IconCalendar size={18} />
                </ThemeIcon>
                <Box>
                  <Text size="xs" c="dimmed" fw={700}>ACADEMIC TERM</Text>
                  <Text size="sm" fw={800}>June 2026 - Dec 2026</Text>
                </Box>
              </Group>
            </Paper>
          </SimpleGrid>

          {/* Search & List Table */}
          <Paper
            withBorder
            radius="lg"
            p="xl"
            style={{
              background: 'var(--edu-glass-bg)',
              borderColor: 'var(--edu-glass-border)'
            }}
          >
            <TextInput
              placeholder="Search students in your roster by name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftSection={<IconSearch size={16} />}
              mb="lg"
              radius="md"
              style={{ maxWidth: '400px' }}
            />

            <Box style={{ overflowX: 'auto' }}>
              <Table verticalSpacing="sm" highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Student ID</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Gender</Table.Th>
                    <Table.Th>Email Address</Table.Th>
                    <Table.Th>Contact Number</Table.Th>
                    <Table.Th>Birth Date</Table.Th>
                    <Table.Th>Date Enrolled</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {filteredStudents.length === 0 ? (
                    <Table.Tr>
                      <Table.Td colSpan={7} style={{ textAlign: 'center' }}>
                        <Text c="dimmed" my="md">No students found matching filters.</Text>
                      </Table.Td>
                    </Table.Tr>
                  ) : (
                    filteredStudents.map(student => (
                      <Table.Tr key={student.id}>
                        <Table.Td>
                          <Text size="xs" fw={700} c="dimmed">{student.id.toUpperCase()}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm" fw={600}>{student.name}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm">{student.gender}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm">{student.email}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm">{student.phone}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm">{student.dob}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm">{student.joinedDate}</Text>
                        </Table.Td>
                      </Table.Tr>
                    ))
                  )}
                </Table.Tbody>
              </Table>
            </Box>
          </Paper>
        </>
      ) : (
        <Paper p="xl" radius="md" withBorder style={{ textAlign: 'center' }}>
          <Text c="red" fw={500}>No Class allocated. Contact Admin department to link class.</Text>
        </Paper>
      )}
    </Stack>
  );
};
export default ViewClass;
