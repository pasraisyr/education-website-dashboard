import React, { useState } from 'react';
import {
  Table,
  Button,
  Group,
  TextInput,
  Modal,
  Select,
  ActionIcon,
  Title,
  Text,
  Paper,
  Stack,
  Box,
  Tooltip
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconSearch, IconEdit, IconTrash } from '@tabler/icons-react';
import { useAppState } from '../../context/AppStateContext';
import type { Student } from '../../types';
import { notifications } from '@mantine/notifications';

export const CRUDStudents: React.FC = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useAppState();
  const [opened, { open, close }] = useDisclosure(false);
  const [search, setSearch] = useState('');
  
  // Form States
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [dob, setDob] = useState('');
  const [joinedDate, setJoinedDate] = useState('');

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setName('');
    setEmail('');
    setPhone('');
    setGender('Male');
    setDob('2010-01-01');
    setJoinedDate(new Date().toISOString().split('T')[0]);
    open();
  };

  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);
    setName(student.name);
    setEmail(student.email);
    setPhone(student.phone);
    setGender(student.gender);
    setDob(student.dob);
    setJoinedDate(student.joinedDate);
    open();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !dob || !joinedDate) {
      notifications.show({ title: 'Validation Error', message: 'All fields are required.', color: 'red' });
      return;
    }

    if (editingStudent) {
      updateStudent({
        ...editingStudent,
        name,
        email,
        phone,
        gender,
        dob,
        joinedDate
      });
      notifications.show({
        title: 'Student Updated',
        message: `${name} has been updated successfully.`,
        color: 'indigo'
      });
    } else {
      addStudent({
        name,
        email,
        phone,
        gender,
        dob,
        joinedDate
      });
      notifications.show({
        title: 'Student Created',
        message: `${name} has been added to the directory.`,
        color: 'teal'
      });
    }
    close();
  };

  const handleDelete = (student: Student) => {
    if (window.confirm(`Are you sure you want to remove ${student.name}? This will clear their class allocations.`)) {
      deleteStudent(student.id);
      notifications.show({
        title: 'Student Removed',
        message: `${student.name} was deleted from database.`,
        color: 'red'
      });
    }
  };

  // Filter students based on search string
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="center">
        <Box>
          <Title order={2} style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800 }}>
            Students Management
          </Title>
          <Text size="sm" c="dimmed">
            Manage student registrations, update records, and oversee basic files.
          </Text>
        </Box>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={handleOpenAdd}
          variant="gradient"
          gradient={{ from: 'indigo', to: 'violet', deg: 135 }}
          radius="md"
        >
          Add Student
        </Button>
      </Group>

      {/* Filter and Table */}
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
          placeholder="Search students by name, email or ID..."
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
                <Table.Th>ID</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Gender</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Phone Number</Table.Th>
                <Table.Th>Birth Date</Table.Th>
                <Table.Th>Joined Date</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredStudents.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={8} style={{ textAlign: 'center' }}>
                    <Text c="dimmed" my="md">No students found matching search filters.</Text>
                  </Table.Td>
                </Table.Tr>
              ) : (
                filteredStudents.map(student => (
                  <Table.Tr key={student.id}>
                    <Table.Td>
                      <Text size="xs" fw={700} c="dimmed">
                        {student.id.toUpperCase()}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" fw={600}>
                        {student.name}
                      </Text>
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
                    <Table.Td>
                      <Group gap="xs">
                        <Tooltip label="Edit student details">
                          <ActionIcon
                            variant="light"
                            color="indigo"
                            onClick={() => handleOpenEdit(student)}
                            radius="md"
                          >
                            <IconEdit size={16} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Delete student record">
                          <ActionIcon
                            variant="light"
                            color="red"
                            onClick={() => handleDelete(student)}
                            radius="md"
                          >
                            <IconTrash size={16} />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        </Box>
      </Paper>

      {/* Add / Edit Student Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={editingStudent ? 'Edit Student Details' : 'Add New Student'}
        radius="lg"
        size="md"
      >
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Full Name"
              placeholder="e.g. Ahmad Farhan"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              radius="md"
            />

            <TextInput
              label="Email Address"
              placeholder="e.g. farhan@gmail.com"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              radius="md"
            />

            <TextInput
              label="Phone Number"
              placeholder="e.g. +6011-222-3333"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              radius="md"
            />

            <Select
              label="Gender"
              data={['Male', 'Female']}
              value={gender}
              onChange={(val) => setGender((val as 'Male' | 'Female') || 'Male')}
              radius="md"
            />

            <TextInput
              label="Date of Birth"
              type="date"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              radius="md"
            />

            <TextInput
              label="Enrollment Date"
              type="date"
              required
              value={joinedDate}
              onChange={(e) => setJoinedDate(e.target.value)}
              radius="md"
            />

            <Group justify="flex-end" mt="md">
              <Button variant="light" color="gray" onClick={close} radius="md">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="gradient"
                gradient={{ from: 'indigo', to: 'violet', deg: 135 }}
                radius="md"
              >
                {editingStudent ? 'Save Changes' : 'Register Student'}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Stack>
  );
};
export default CRUDStudents;
