import React, { useState } from 'react';
import {
  Table,
  Button,
  Group,
  TextInput,
  Modal,
  ActionIcon,
  Title,
  Text,
  Paper,
  Stack,
  Box,
  Tooltip,
  Badge
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconSearch, IconEdit, IconTrash } from '@tabler/icons-react';
import { useAppState } from '../../context/AppStateContext';
import type { Teacher } from '../../types';
import { notifications } from '@mantine/notifications';

export const CRUDTeachers: React.FC = () => {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useAppState();
  const [opened, { open, close }] = useDisclosure(false);
  const [search, setSearch] = useState('');
  
  // Form States
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [joinedDate, setJoinedDate] = useState('');

  const handleOpenAdd = () => {
    setEditingTeacher(null);
    setName('');
    setEmail('');
    setPhone('');
    setSpecialization('');
    setJoinedDate(new Date().toISOString().split('T')[0]);
    open();
  };

  const handleOpenEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setName(teacher.name);
    setEmail(teacher.email);
    setPhone(teacher.phone);
    setSpecialization(teacher.subjectSpecialization);
    setJoinedDate(teacher.joinedDate);
    open();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !specialization || !joinedDate) {
      notifications.show({ title: 'Validation Error', message: 'All fields are required.', color: 'red' });
      return;
    }

    if (editingTeacher) {
      updateTeacher({
        ...editingTeacher,
        name,
        email,
        phone,
        subjectSpecialization: specialization,
        joinedDate
      });
      notifications.show({
        title: 'Teacher Updated',
        message: `${name} has been updated successfully.`,
        color: 'indigo'
      });
    } else {
      addTeacher({
        name,
        email,
        phone,
        subjectSpecialization: specialization,
        joinedDate
      });
      notifications.show({
        title: 'Teacher Added',
        message: `${name} has been registered successfully.`,
        color: 'teal'
      });
    }
    close();
  };

  const handleDelete = (teacher: Teacher) => {
    if (window.confirm(`Are you sure you want to remove ${teacher.name}? This will clear their class allocations.`)) {
      deleteTeacher(teacher.id);
      notifications.show({
        title: 'Teacher Removed',
        message: `${teacher.name} has been deleted.`,
        color: 'red'
      });
    }
  };

  // Filter teachers list
  const filteredTeachers = teachers.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.email.toLowerCase().includes(search.toLowerCase()) ||
    t.subjectSpecialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="center">
        <Box>
          <Title order={2} style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800 }}>
            Teachers Management
          </Title>
          <Text size="sm" c="dimmed">
            Register academic instructors, assign subject specialization, and check clocked-in statuses.
          </Text>
        </Box>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={handleOpenAdd}
          variant="gradient"
          gradient={{ from: 'indigo', to: 'violet', deg: 135 }}
          radius="md"
        >
          Add Teacher
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
          placeholder="Search teachers by name, specialization, or email..."
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
                <Table.Th>Email Address</Table.Th>
                <Table.Th>Phone Number</Table.Th>
                <Table.Th>Specialization</Table.Th>
                <Table.Th>Joined Date</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredTeachers.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={8} style={{ textAlign: 'center' }}>
                    <Text c="dimmed" my="md">No instructors found.</Text>
                  </Table.Td>
                </Table.Tr>
              ) : (
                filteredTeachers.map(teacher => (
                  <Table.Tr key={teacher.id}>
                    <Table.Td>
                      <Text size="xs" fw={700} c="dimmed">
                        {teacher.id.toUpperCase()}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" fw={600}>
                        {teacher.name}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{teacher.email}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{teacher.phone}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge color="violet" radius="md" variant="light">
                        {teacher.subjectSpecialization}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{teacher.joinedDate}</Text>
                    </Table.Td>
                    <Table.Td>
                      {teacher.clockedIn ? (
                        <Badge color="green" variant="filled" radius="md">
                          Clocked In
                        </Badge>
                      ) : (
                        <Badge color="gray" variant="light" radius="md">
                          Offline
                        </Badge>
                      )}
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Tooltip label="Edit instructor details">
                          <ActionIcon
                            variant="light"
                            color="indigo"
                            onClick={() => handleOpenEdit(teacher)}
                            radius="md"
                          >
                            <IconEdit size={16} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Remove instructor record">
                          <ActionIcon
                            variant="light"
                            color="red"
                            onClick={() => handleDelete(teacher)}
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

      {/* Add / Edit Teacher Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title={editingTeacher ? 'Edit Teacher Details' : 'Add New Teacher'}
        radius="lg"
        size="md"
      >
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Full Name"
              placeholder="e.g. Siti Aminah"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              radius="md"
            />

            <TextInput
              label="Email Address"
              placeholder="e.g. siti.aminah@pasraisyedu.com"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              radius="md"
            />

            <TextInput
              label="Phone Number"
              placeholder="e.g. +6012-345-6789"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              radius="md"
            />

            <TextInput
              label="Subject Specialization"
              placeholder="e.g. Advanced Mathematics"
              required
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              radius="md"
            />

            <TextInput
              label="Joined Date"
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
                {editingTeacher ? 'Save Changes' : 'Register Teacher'}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Stack>
  );
};
export default CRUDTeachers;
