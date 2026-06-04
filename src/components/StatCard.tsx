import React from 'react';
import { Paper, Text, Group, Box } from '@mantine/core';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon, color = 'indigo' }) => {
  return (
    <Paper
      withBorder
      radius="lg"
      p="xl"
      className="hover-glow"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--edu-glass-bg)',
        borderColor: 'var(--edu-glass-border)'
      }}
    >
      <Box
        style={{
          position: 'absolute',
          top: '-15px',
          right: '-15px',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: `var(--mantine-color-${color}-light)`,
          opacity: 0.2,
          filter: 'blur(8px)',
        }}
      />
      
      <Group justify="space-between" align="flex-start">
        <Box>
          <Text size="xs" c="dimmed" fw={700} tt="uppercase" lts="1px">
            {title}
          </Text>
          <Text size="2xl" fw={800} mt="xs" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {value}
          </Text>
        </Box>
        <Paper
          p="md"
          radius="md"
          className="badge-indigo"
          style={{
            background: `var(--mantine-color-${color}-light)`,
            color: `var(--mantine-color-${color}-filled)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </Paper>
      </Group>
      
      <Text size="sm" c="dimmed" mt="md" fw={500}>
        {description}
      </Text>
    </Paper>
  );
};
export default StatCard;
