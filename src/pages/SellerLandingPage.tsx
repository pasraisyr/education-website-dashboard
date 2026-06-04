import React from 'react';
import { Container, Title, Text, Button, SimpleGrid, Card, Badge, Group, Stack, ThemeIcon, Box } from '@mantine/core';
import {
  IconArrowRight,
  IconBrandWhatsapp,
  IconEdit,
  IconUsers,
  IconLayoutDashboard
} from '@tabler/icons-react';

interface SellerLandingPageProps {
  onLivePreviewClick: () => void;
}

export const SellerLandingPage: React.FC<SellerLandingPageProps> = ({ onLivePreviewClick }) => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello, I am interested in getting a custom education dashboard and website portal for my center.");
    window.open(`https://wa.me/60104282163?text=${message}`, '_blank');
  };

  return (
    <Box 
      style={{ 
        backgroundColor: '#090d16', // Sleek space-dark background
        color: '#f8fafc', // Muted white text
        minHeight: '100vh', 
        overflowX: 'hidden', 
        position: 'relative',
        fontFamily: 'Outfit, sans-serif'
      }}
    >
      
      {/* Dynamic Glowing Neon Blobs */}
      <Box
        style={{
          position: 'absolute',
          top: '5%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)', // Neon Cyan
          filter: 'blur(120px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <Box
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)', // Neon Pink
          filter: 'blur(140px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Navigation Header */}
      <Box style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', position: 'relative', zIndex: 1, backdropFilter: 'blur(10px)' }}>
        <Container size="lg" h={80} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Group gap="xs">
            <Box
              className="animated-gradient-bg"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 900,
                fontSize: '18px'
              }}
            >
              PS
            </Box>
            <Text
              size="lg"
              fw={800}
              variant="gradient"
              gradient={{ from: 'cyan', to: 'blue', deg: 135 }}
              style={{ letterSpacing: '0.5px' }}
            >
              PasraisyEdu Solutions
            </Text>
          </Group>

          <Group gap="md">
            <Button
              radius="xl"
              variant="subtle"
              color="cyan"
              onClick={onLivePreviewClick}
              style={{ fontWeight: 600 }}
            >
              Live Demo
            </Button>
            <Button
              radius="xl"
              variant="gradient"
              gradient={{ from: 'teal', to: 'lime', deg: 135 }}
              leftSection={<IconBrandWhatsapp size={18} />}
              onClick={handleWhatsAppClick}
              style={{ color: 'white', fontWeight: 600, boxShadow: '0 4px 15px rgba(20, 201, 151, 0.2)' }}
            >
              WhatsApp
            </Button>
          </Group>
        </Container>
      </Box>

      {/* Hero Header Section */}
      <Container size="lg" style={{ position: 'relative', zIndex: 1, padding: '100px 0 60px 0' }}>
        <Stack align="center" gap="xl" style={{ textAlign: 'center' }} mb={80}>
          <Badge variant="dot" color="cyan" size="lg" radius="md">
            ⚡ SAAS EDUCATION MANAGEMENT SUITE
          </Badge>
          
          <Title
            order={1}
            style={{
              fontSize: '56px',
              fontWeight: 900,
              lineHeight: '1.15',
              maxWidth: '850px',
              color: '#ffffff'
            }}
          >
            Own Your Custom{' '}
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: 'cyan', to: 'indigo', deg: 135 }}
              inherit
              fw={900}
            >
              Tuition Center Portal & Web App
            </Text>
          </Title>

          <Text size="lg" style={{ maxWidth: '650px', color: '#94a3b8', lineHeight: '1.7' }}>
            Empower your academy. Get a custom brand landing page combined with role-based administrative dashboards, teacher scheduling, and attendance logs.
          </Text>

          <Group gap="md" mt="md">
            <Button
              size="lg"
              radius="md"
              variant="gradient"
              gradient={{ from: 'cyan', to: 'blue', deg: 135 }}
              onClick={onLivePreviewClick}
              rightSection={<IconArrowRight size={20} />}
              style={{ fontWeight: 600, boxShadow: '0 4px 20px rgba(6, 182, 212, 0.25)' }}
            >
              View Live Demo Preview
            </Button>
            <Button
              size="lg"
              radius="md"
              variant="outline"
              color="teal"
              leftSection={<IconBrandWhatsapp size={20} />}
              onClick={handleWhatsAppClick}
              style={{ fontWeight: 600 }}
            >
              WhatsApp Us
            </Button>
          </Group>
        </Stack>

        {/* Simplified Scanning Grid (No clutter, easy reading) */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mb={100}>
          
          {/* Module 1: Customizable Landing */}
          <Card 
            className="hover-glow"
            p="xl" 
            radius="24px" 
            style={{ 
              background: '#111827', // Solid dark gray background for maximum readability
              borderColor: 'rgba(6, 182, 212, 0.3)', // Cyber cyan border glow
              borderWidth: '1px',
              borderStyle: 'solid',
              boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
              transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
            }}
          >
            <Group justify="space-between" align="center" mb="lg">
              <ThemeIcon size={50} radius="xl" color="cyan" variant="light">
                <IconEdit size={24} />
              </ThemeIcon>
              <Text fw={900} size="xl" style={{ color: '#06b6d4', opacity: 0.9, fontSize: '26px', fontFamily: 'Outfit, sans-serif' }}>
                01
              </Text>
            </Group>
            <Title order={3} size="h3" mb="sm" style={{ fontWeight: 800, color: '#ffffff' }}>
              Editable Public Website
            </Title>
            <Text size="sm" style={{ color: '#e2e8f0', lineHeight: '1.6', fontWeight: 400 }}>
              Your brand public landing page. Highlight course packages, post announcements, and show media activity logs. Fully customizable from the dashboard in real-time.
            </Text>
          </Card>

          {/* Module 2: Admin Panel */}
          <Card 
            className="hover-glow"
            p="xl" 
            radius="24px" 
            style={{ 
              background: '#111827', // Solid dark gray background for maximum readability
              borderColor: 'rgba(99, 102, 241, 0.3)', // Cyber indigo border glow
              borderWidth: '1px',
              borderStyle: 'solid',
              boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
              transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
            }}
          >
            <Group justify="space-between" align="center" mb="lg">
              <ThemeIcon size={50} radius="xl" color="indigo" variant="light">
                <IconLayoutDashboard size={24} />
              </ThemeIcon>
              <Text fw={900} size="xl" style={{ color: '#6366f1', opacity: 0.9, fontSize: '26px', fontFamily: 'Outfit, sans-serif' }}>
                02
              </Text>
            </Group>
            <Title order={3} size="h3" mb="sm" style={{ fontWeight: 800, color: '#ffffff' }}>
              Admin Control Center
            </Title>
            <Text size="sm" style={{ color: '#e2e8f0', lineHeight: '1.6', fontWeight: 400 }}>
              Organize student profiles, manage teacher schedules, allocate classrooms, and assign courses. Monitor daily student attendance analytics and teacher clock-in logs.
            </Text>
          </Card>

          {/* Module 3: Teacher Portal */}
          <Card 
            className="hover-glow"
            p="xl" 
            radius="24px" 
            style={{ 
              background: '#111827', // Solid dark gray background for maximum readability
              borderColor: 'rgba(20, 184, 166, 0.3)', // Cyber teal border glow
              borderWidth: '1px',
              borderStyle: 'solid',
              boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
              transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
            }}
          >
            <Group justify="space-between" align="center" mb="lg">
              <ThemeIcon size={50} radius="xl" color="teal" variant="light">
                <IconUsers size={24} />
              </ThemeIcon>
              <Text fw={900} size="xl" style={{ color: '#14b8a6', opacity: 0.9, fontSize: '26px', fontFamily: 'Outfit, sans-serif' }}>
                03
              </Text>
            </Group>
            <Title order={3} size="h3" mb="sm" style={{ fontWeight: 800, color: '#ffffff' }}>
              Tutor Workspace
            </Title>
            <Text size="sm" style={{ color: '#e2e8f0', lineHeight: '1.6', fontWeight: 400 }}>
              Teachers get a mobile-responsive workspace to clock-in to duty, check their specific assigned classes, and easily take daily student attendance logs.
            </Text>
          </Card>
        </SimpleGrid>

        {/* Clean Call-To-Action (CTA) */}
        <Card
          p="xl"
          radius="32px"
          style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.8) 0%, rgba(59, 130, 246, 0.8) 100%)',
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(6, 182, 212, 0.2)',
            border: 'none',
            backdropFilter: 'blur(20px)',
            maxWidth: '900px',
            margin: '0 auto'
          }}
        >
          <Stack align="center" gap="md">
            <Title order={2} style={{ fontWeight: 800, fontSize: '32px' }}>
              Launch Your Own Customized Portal
            </Title>
            <Text size="md" style={{ maxWidth: '600px', opacity: 0.9, lineHeight: '1.6' }}>
              Ready to upgrade your school or academy? Get in touch with us to set up your customized brand dashboard package.
            </Text>
            <Button
              size="lg"
              radius="md"
              variant="white"
              color="dark"
              leftSection={<IconBrandWhatsapp size={22} />}
              onClick={handleWhatsAppClick}
              style={{ fontWeight: 800, color: '#090d16' }}
            >
              Order via WhatsApp (010-4282163)
            </Button>
          </Stack>
        </Card>

      </Container>
    </Box>
  );
};
export default SellerLandingPage;
