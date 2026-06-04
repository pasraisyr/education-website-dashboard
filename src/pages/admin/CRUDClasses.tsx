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
  Badge,
  Tabs,
  MultiSelect
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconBookmark, IconBook, IconEdit, IconTrash } from '@tabler/icons-react';
import { useAppState } from '../../context/AppStateContext';
import type { Class, Subject } from '../../types';
import { notifications } from '@mantine/notifications';

export const CRUDClasses: React.FC = () => {
  const { classes, subjects, addClass, updateClass, deleteClass, addSubject, updateSubject, deleteSubject } = useAppState();
  
  const [activeTab, setActiveTab] = useState<string | null>('classes');

  // Modals disclosure
  const [classModalOpened, { open: openClassModal, close: closeClassModal }] = useDisclosure(false);
  const [subjectModalOpened, { open: openSubjectModal, close: closeSubjectModal }] = useDisclosure(false);

  // Class Form States
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [className, setClassName] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);

  // Subject Form States
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');

  // 1. Class Actions
  const handleOpenAddClass = () => {
    setEditingClass(null);
    setClassName('');
    setClassGrade('Grade 10');
    setSelectedSubjectIds([]);
    openClassModal();
  };

  const handleOpenEditClass = (cls: Class) => {
    setEditingClass(cls);
    setClassName(cls.name);
    setClassGrade(cls.grade);
    setSelectedSubjectIds(cls.subjectIds);
    openClassModal();
  };

  const handleClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!className || !classGrade) {
      notifications.show({ title: 'Validation Error', message: 'Name and Grade are required.', color: 'red' });
      return;
    }

    if (editingClass) {
      updateClass({
        ...editingClass,
        name: className,
        grade: classGrade,
        subjectIds: selectedSubjectIds
      });
      notifications.show({ title: 'Class Updated', message: `${className} has been updated.`, color: 'indigo' });
    } else {
      addClass({
        name: className,
        grade: classGrade,
        subjectIds: selectedSubjectIds
      });
      notifications.show({ title: 'Class Created', message: `${className} has been added.`, color: 'teal' });
    }
    closeClassModal();
  };

  const handleClassDelete = (cls: Class) => {
    if (window.confirm(`Are you sure you want to delete ${cls.name}? Students and teachers allocated to this class will be unassigned.`)) {
      deleteClass(cls.id);
      notifications.show({ title: 'Class Deleted', message: `${cls.name} has been removed.`, color: 'red' });
    }
  };

  // 2. Subject Actions
  const handleOpenAddSubject = () => {
    setEditingSubject(null);
    setSubjectName('');
    setSubjectCode('');
    openSubjectModal();
  };

  const handleOpenEditSubject = (sub: Subject) => {
    setEditingSubject(sub);
    setSubjectName(sub.name);
    setSubjectCode(sub.code);
    openSubjectModal();
  };

  const handleSubjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName || !subjectCode) {
      notifications.show({ title: 'Validation Error', message: 'Name and Code are required.', color: 'red' });
      return;
    }

    if (editingSubject) {
      updateSubject({
        ...editingSubject,
        name: subjectName,
        code: subjectCode
      });
      notifications.show({ title: 'Subject Updated', message: `${subjectName} has been updated.`, color: 'indigo' });
    } else {
      addSubject({
        name: subjectName,
        code: subjectCode
      });
      notifications.show({ title: 'Subject Created', message: `${subjectName} has been created.`, color: 'teal' });
    }
    closeSubjectModal();
  };

  const handleSubjectDelete = (sub: Subject) => {
    if (window.confirm(`Are you sure you want to delete ${sub.name}? It will be removed from all class curriculums.`)) {
      deleteSubject(sub.id);
      notifications.show({ title: 'Subject Deleted', message: `${sub.name} has been deleted.`, color: 'red' });
    }
  };

  // Subject multi-select mappings
  const subjectSelectData = subjects.map(s => ({
    value: s.id,
    label: `${s.name} (${s.code})`
  }));

  // Fetch subjects in a class helper
  const getClassSubjects = (subjectIds: string[]) => {
    return subjects.filter(s => subjectIds.includes(s.id));
  };

  return (
    <Stack gap="xl">
      <Box>
        <Title order={2} style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800 }}>
          Classes & Subjects Directory
        </Title>
        <Text size="sm" c="dimmed">
          Set up class rosters, register curriculum subjects, and map courses to school grades.
          Note that allocations and attendance depend on these configurations.
        </Text>
      </Box>

      <Tabs value={activeTab} onChange={setActiveTab} color="indigo" radius="md">
        <Tabs.List mb="lg">
          <Tabs.Tab value="classes" leftSection={<IconBookmark size={16} />}>
            Classes Directory ({classes.length})
          </Tabs.Tab>
          <Tabs.Tab value="subjects" leftSection={<IconBook size={16} />}>
            Subject Modules ({subjects.length})
          </Tabs.Tab>
        </Tabs.List>

        {/* Classes Tab */}
        <Tabs.Panel value="classes">
          <Stack gap="md">
            <Group justify="flex-end">
              <Button
                leftSection={<IconPlus size={16} />}
                onClick={handleOpenAddClass}
                variant="gradient"
                gradient={{ from: 'indigo', to: 'violet', deg: 135 }}
                radius="md"
              >
                Create New Class
              </Button>
            </Group>

            <Paper withBorder radius="lg" p="xl" className="glass-panel" style={{ borderColor: 'var(--edu-glass-border)' }}>
              <Box style={{ overflowX: 'auto' }}>
                <Table verticalSpacing="sm" highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Class ID</Table.Th>
                      <Table.Th>Class Name</Table.Th>
                      <Table.Th>Grade Level</Table.Th>
                      <Table.Th>Curriculum Subjects</Table.Th>
                      <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {classes.length === 0 ? (
                      <Table.Tr>
                        <Table.Td colSpan={5} style={{ textAlign: 'center' }}>
                          <Text c="dimmed" my="md">No academic classes registered yet.</Text>
                        </Table.Td>
                      </Table.Tr>
                    ) : (
                      classes.map(cls => {
                        const classSubjects = getClassSubjects(cls.subjectIds);
                        return (
                          <Table.Tr key={cls.id}>
                            <Table.Td>
                              <Text size="xs" fw={700} c="dimmed">{cls.id.toUpperCase()}</Text>
                            </Table.Td>
                            <Table.Td>
                              <Text size="sm" fw={600}>{cls.name}</Text>
                            </Table.Td>
                            <Table.Td>
                              <Badge color="indigo" radius="md">{cls.grade}</Badge>
                            </Table.Td>
                            <Table.Td>
                              <Group gap="xs">
                                {classSubjects.length === 0 ? (
                                  <Text size="xs" c="dimmed">No subjects assigned</Text>
                                ) : (
                                  classSubjects.map(sub => (
                                    <Badge key={sub.id} variant="light" color="violet" radius="sm">
                                      {sub.name}
                                    </Badge>
                                  ))
                                )}
                              </Group>
                            </Table.Td>
                            <Table.Td>
                              <Group gap="xs">
                                <Tooltip label="Edit class structure">
                                  <ActionIcon variant="light" color="indigo" onClick={() => handleOpenEditClass(cls)} radius="md">
                                    <IconEdit size={16} />
                                  </ActionIcon>
                                </Tooltip>
                                <Tooltip label="Remove class">
                                  <ActionIcon variant="light" color="red" onClick={() => handleClassDelete(cls)} radius="md">
                                    <IconTrash size={16} />
                                  </ActionIcon>
                                </Tooltip>
                              </Group>
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

        {/* Subjects Tab */}
        <Tabs.Panel value="subjects">
          <Stack gap="md">
            <Group justify="flex-end">
              <Button
                leftSection={<IconPlus size={16} />}
                onClick={handleOpenAddSubject}
                variant="gradient"
                gradient={{ from: 'indigo', to: 'violet', deg: 135 }}
                radius="md"
              >
                Create Subject Module
              </Button>
            </Group>

            <Paper withBorder radius="lg" p="xl" className="glass-panel" style={{ borderColor: 'var(--edu-glass-border)' }}>
              <Box style={{ overflowX: 'auto' }}>
                <Table verticalSpacing="sm" highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Subject ID</Table.Th>
                      <Table.Th>Subject Code</Table.Th>
                      <Table.Th>Subject Name</Table.Th>
                      <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {subjects.length === 0 ? (
                      <Table.Tr>
                        <Table.Td colSpan={4} style={{ textAlign: 'center' }}>
                          <Text c="dimmed" my="md">No subject modules registered yet.</Text>
                        </Table.Td>
                      </Table.Tr>
                    ) : (
                      subjects.map(sub => (
                        <Table.Tr key={sub.id}>
                          <Table.Td>
                            <Text size="xs" fw={700} c="dimmed">{sub.id.toUpperCase()}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Badge color="pink" variant="light" radius="md">{sub.code}</Badge>
                          </Table.Td>
                          <Table.Td>
                            <Text size="sm" fw={600}>{sub.name}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Group gap="xs">
                              <Tooltip label="Edit subject details">
                                <ActionIcon variant="light" color="indigo" onClick={() => handleOpenEditSubject(sub)} radius="md">
                                  <IconEdit size={16} />
                                </ActionIcon>
                              </Tooltip>
                              <Tooltip label="Delete subject module">
                                <ActionIcon variant="light" color="red" onClick={() => handleSubjectDelete(sub)} radius="md">
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
          </Stack>
        </Tabs.Panel>
      </Tabs>

      {/* Class Modal */}
      <Modal opened={classModalOpened} onClose={closeClassModal} title={editingClass ? 'Edit Class Details' : 'Create Academic Class'} radius="lg">
        <form onSubmit={handleClassSubmit}>
          <Stack gap="md">
            <TextInput
              label="Class Name"
              placeholder="e.g. Grade 10 - Alpha"
              required
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              radius="md"
            />
            <TextInput
              label="Grade Level"
              placeholder="e.g. Grade 10"
              required
              value={classGrade}
              onChange={(e) => setClassGrade(e.target.value)}
              radius="md"
            />
            <MultiSelect
              label="Assign Subjects"
              placeholder="Select subject modules..."
              data={subjectSelectData}
              value={selectedSubjectIds}
              onChange={setSelectedSubjectIds}
              radius="md"
              searchable
            />
            <Group justify="flex-end" mt="md">
              <Button variant="light" color="gray" onClick={closeClassModal} radius="md">Cancel</Button>
              <Button type="submit" variant="gradient" gradient={{ from: 'indigo', to: 'violet', deg: 135 }} radius="md">
                {editingClass ? 'Save Changes' : 'Create Class'}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      {/* Subject Modal */}
      <Modal opened={subjectModalOpened} onClose={closeSubjectModal} title={editingSubject ? 'Edit Subject Details' : 'Create Subject Module'} radius="lg">
        <form onSubmit={handleSubjectSubmit}>
          <Stack gap="md">
            <TextInput
              label="Subject Name"
              placeholder="e.g. English Literature"
              required
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              radius="md"
            />
            <TextInput
              label="Subject Code"
              placeholder="e.g. ENGL201"
              required
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
              radius="md"
            />
            <Group justify="flex-end" mt="md">
              <Button variant="light" color="gray" onClick={closeSubjectModal} radius="md">Cancel</Button>
              <Button type="submit" variant="gradient" gradient={{ from: 'indigo', to: 'violet', deg: 135 }} radius="md">
                {editingSubject ? 'Save Changes' : 'Create Subject'}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Stack>
  );
};
export default CRUDClasses;
