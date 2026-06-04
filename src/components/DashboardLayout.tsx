import React from 'react';
import { AppShell, Burger, Group, Text, Box, NavLink, Avatar, Button, Menu, Badge } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLayoutDashboard,
  IconSchool,
  IconUsers,
  IconBookmark,
  IconClipboardList,
  IconCalendarCheck,
  IconEdit,
  IconClipboardCheck,
  IconLogout,
  IconSettings,
  IconDatabase,
  IconClock
} from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeView: string;
  setActiveView: (view: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeView, setActiveView }) => {
  const [opened, { toggle }] = useDisclosure();
  const { user, logout } = useAuth();

  const handleNavClick = (view: string) => {
    setActiveView(view);
    if (opened) toggle(); // Close mobile drawer
  };

  const renderNavLinks = () => {
    if (!user) return null;

    if (user.role === 'admin') {
      return (
        <>
          <NavLink
            label="Dashboard Overview"
            leftSection={<IconLayoutDashboard size={20} />}
            active={activeView === 'overview'}
            onClick={() => handleNavClick('overview')}
            mb="xs"
            styles={{ label: { fontWeight: 500 } }}
          />
          <NavLink
            label="Students Directory"
            leftSection={<IconSchool size={20} />}
            active={activeView === 'students'}
            onClick={() => handleNavClick('students')}
            mb="xs"
            styles={{ label: { fontWeight: 500 } }}
          />
          <NavLink
            label="Teachers Directory"
            leftSection={<IconUsers size={20} />}
            active={activeView === 'teachers'}
            onClick={() => handleNavClick('teachers')}
            mb="xs"
            styles={{ label: { fontWeight: 500 } }}
          />
          <NavLink
            label="Classes & Subjects"
            leftSection={<IconBookmark size={20} />}
            active={activeView === 'classes'}
            onClick={() => handleNavClick('classes')}
            mb="xs"
            styles={{ label: { fontWeight: 500 } }}
          />
          <NavLink
            label="Class Allocation"
            leftSection={<IconClipboardList size={20} />}
            active={activeView === 'allocations'}
            onClick={() => handleNavClick('allocations')}
            mb="xs"
            styles={{ label: { fontWeight: 500 } }}
          />
          <NavLink
            label="Check Attendance"
            leftSection={<IconCalendarCheck size={20} />}
            active={activeView === 'attendance'}
            onClick={() => handleNavClick('attendance')}
            mb="xs"
            styles={{ label: { fontWeight: 500 } }}
          />
          <NavLink
            label="Landing Page Editor"
            leftSection={<IconEdit size={20} />}
            active={activeView === 'editor'}
            onClick={() => handleNavClick('editor')}
            mb="xs"
            styles={{ label: { fontWeight: 500 } }}
          />
        </>
      );
    } else if (user.role === 'teacher') {
      return (
        <>
          <NavLink
            label="Teacher Portal"
            leftSection={<IconLayoutDashboard size={20} />}
            active={activeView === 'overview'}
            onClick={() => handleNavClick('overview')}
            mb="xs"
            styles={{ label: { fontWeight: 500 } }}
          />
          <NavLink
            label="Take Attendance"
            leftSection={<IconClipboardCheck size={20} />}
            active={activeView === 'take-attendance'}
            onClick={() => handleNavClick('take-attendance')}
            mb="xs"
            styles={{ label: { fontWeight: 500 } }}
          />
          <NavLink
            label="My Class Roster"
            leftSection={<IconSchool size={20} />}
            active={activeView === 'view-class'}
            onClick={() => handleNavClick('view-class')}
            mb="xs"
            styles={{ label: { fontWeight: 500 } }}
          />
        </>
      );
    }

    return null;
  };

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="xl"
      style={{
        backgroundColor: 'var(--mantine-color-body)'
      }}
    >
      <AppShell.Header
        className="glass-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
        }}
      >
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group gap="xs">
            <Box
              className="animated-gradient-bg"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 800,
                fontSize: '18px',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              PS
            </Box>
            <Text
              size="lg"
              fw={800}
              variant="gradient"
              gradient={{ from: 'indigo', to: 'violet', deg: 135 }}
              style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '0.5px' }}
            >
              PasraisyEdu Center
            </Text>
          </Group>
        </Group>

        <Group gap="md">
          {/* Database mode badge */}
          <Badge
            variant="light"
            color="teal"
            leftSection={<IconDatabase size={12} />}
            visibleFrom="md"
            radius="md"
            p="md"
          >
            Demo Database: LocalStorage Active
          </Badge>

          {user && (
            <Menu shadow="md" width={200} position="bottom-end" radius="md">
              <Menu.Target>
                <Group gap="xs" style={{ cursor: 'pointer' }}>
                  <Avatar
                    color="indigo"
                    radius="xl"
                    name={user.name}
                    src={null}
                    style={{ border: '2px solid var(--mantine-color-indigo-light)' }}
                  />
                  <Box visibleFrom="xs">
                    <Text size="sm" fw={600}>
                      {user.name}
                    </Text>
                    <Text size="xs" c="dimmed" style={{ textTransform: 'capitalize' }}>
                      {user.role} Account
                    </Text>
                  </Box>
                </Group>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Application Settings</Menu.Label>
                <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
                <Menu.Item
                  leftSection={<IconClock size={14} />}
                  onClick={() => {
                    // Redirect to landing
                    window.location.href = '#';
                    location.reload();
                  }}
                >
                  Visit Public Site
                </Menu.Item>
                
                <Menu.Divider />
                
                <Menu.Item
                  color="red"
                  leftSection={<IconLogout size={14} />}
                  onClick={logout}
                >
                  Log out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" className="glass-panel">
        <Box style={{ flex: 1 }}>
          <Text size="xs" c="dimmed" fw={700} tt="uppercase" pl="xs" mb="md" lts="1px">
            Main Menu
          </Text>
          {renderNavLinks()}
        </Box>

        <Box style={{ borderTop: '1px solid var(--edu-glass-border)', paddingTop: '15px' }}>
          <Group justify="space-between" px="xs" mb="md">
            <Box>
              <Text size="xs" fw={700} c="dimmed">PORTAL STATUS</Text>
              <Text size="sm" fw={600} c="green">Online • Demo</Text>
            </Box>
          </Group>
          <Button
            fullWidth
            variant="light"
            color="red"
            leftSection={<IconLogout size={18} />}
            onClick={logout}
            radius="md"
          >
            Log Out
          </Button>
        </Box>
      </AppShell.Navbar>

      <AppShell.Main>
        <Box style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};
export default DashboardLayout;
