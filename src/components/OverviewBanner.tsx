import React from 'react';
import { Paper, Badge, Title, Text, Stack, Group, Avatar, Box } from '@mantine/core';

interface OverviewBannerProps {
  title: string;
  subtitle: string;
  badgeText: string;
  avatarName?: string;
  actionSection?: React.ReactNode;
}

export const OverviewBanner: React.FC<OverviewBannerProps> = ({
  title,
  subtitle,
  badgeText,
  avatarName,
  actionSection
}) => {
  return (
    <Paper
      p="xl"
      radius="xl"
      className="animated-gradient-bg"
      style={{
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 12px 30px rgba(99, 102, 241, 0.25)',
        border: 'none',
        marginBottom: '20px'
      }}
    >
      {/* Decorative backdrop bubble */}
      <Box
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '180px',
          height: '180px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />
      <Box
        style={{
          position: 'absolute',
          bottom: '-40px',
          left: '10%',
          width: '100px',
          height: '100px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />

      <Group justify="space-between" align="center" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <Group gap="md">
          {avatarName && (
            <Avatar
              size="lg"
              radius="xl"
              name={avatarName}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '20px',
                border: '2px solid rgba(255, 255, 255, 0.4)'
              }}
            />
          )}
          <Stack gap="xs">
            <Group gap="xs">
              <Badge variant="white" color="indigo" size="sm" radius="md" style={{ fontWeight: 800 }}>
                {badgeText}
              </Badge>
            </Group>
            <Title order={2} style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '28px', lineHeight: '1.2' }}>
              {title}
            </Title>
            <Text size="sm" style={{ opacity: 0.95, maxWidth: '650px', lineHeight: '1.5' }}>
              {subtitle}
            </Text>
          </Stack>
        </Group>

        {actionSection && (
          <Box style={{ alignSelf: 'center' }}>
            {actionSection}
          </Box>
        )}
      </Group>
    </Paper>
  );
};
export default OverviewBanner;
