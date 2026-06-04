import React from 'react';
import { Container, Title, Text, Button, SimpleGrid, Card, Badge, Group, Stack, ThemeIcon, Box } from '@mantine/core';
import {
  IconArrowRight,
  IconBrandWhatsapp,
  IconEdit,
  IconUsers,
  IconLayoutDashboard
} from '@tabler/icons-react';
import { SubscribeBanner } from '../components/SubscribeBanner';

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
        backgroundColor: '#090d16',
        color: '#f8fafc',
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
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
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
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)',
          filter: 'blur(140px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* ===== Navigation Header (Mobile Responsive) ===== */}
      <Box style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', position: 'relative', zIndex: 10, backdropFilter: 'blur(10px)' }}>
        <Container size="lg" py="sm" px="md">
          <Group justify="space-between" align="center" wrap="nowrap">

            {/* Left: Logo + Brand Name */}
            <Group gap="xs" wrap="nowrap" style={{ minWidth: 0 }}>
              <Box
                className="animated-gradient-bg"
                style={{
                  width: '36px',
                  height: '36px',
                  minWidth: '36px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 900,
                  fontSize: '16px',
                  flexShrink: 0
                }}
              >
                PS
              </Box>
              <Text
                fw={800}
                variant="gradient"
                gradient={{ from: 'cyan', to: 'blue', deg: 135 }}
                style={{ letterSpacing: '0.3px', fontSize: 'clamp(13px, 3.5vw, 18px)', whiteSpace: 'nowrap' }}
              >
                PasraisyEdu Solutions
              </Text>
            </Group>

            {/* Right: Action Buttons — on mobile show icon-only, on desktop show full text */}
            <Group gap="xs" wrap="nowrap" style={{ flexShrink: 0 }}>
              {/* Live Demo: Icon only on mobile, text on sm+ */}
              <Button
                radius="xl"
                variant="subtle"
                color="cyan"
                onClick={onLivePreviewClick}
                style={{ fontWeight: 600, paddingLeft: '10px', paddingRight: '10px' }}
                visibleFrom="sm"
              >
                Live Demo
              </Button>
              {/* Mobile icon-only version */}
              <Button
                radius="xl"
                variant="subtle"
                color="cyan"
                onClick={onLivePreviewClick}
                hiddenFrom="sm"
                size="sm"
                px="xs"
                style={{ fontWeight: 600 }}
              >
                Demo
              </Button>

              {/* WhatsApp: Icon + text on desktop, icon-only on mobile */}
              <Button
                radius="xl"
                variant="gradient"
                gradient={{ from: 'teal', to: 'lime', deg: 135 }}
                leftSection={<IconBrandWhatsapp size={16} />}
                onClick={handleWhatsAppClick}
                visibleFrom="sm"
                style={{ color: 'white', fontWeight: 600, boxShadow: '0 4px 15px rgba(20, 201, 151, 0.2)' }}
              >
                WhatsApp
              </Button>
              {/* Mobile icon-only WA button */}
              <Button
                radius="xl"
                variant="gradient"
                gradient={{ from: 'teal', to: 'lime', deg: 135 }}
                onClick={handleWhatsAppClick}
                hiddenFrom="sm"
                size="sm"
                px="xs"
                style={{ color: 'white', fontWeight: 600, boxShadow: '0 4px 15px rgba(20, 201, 151, 0.2)' }}
              >
                <IconBrandWhatsapp size={18} />
              </Button>
            </Group>

          </Group>
        </Container>
      </Box>

      {/* ===== Hero Header Section ===== */}
      <Container size="lg" px="md" style={{ position: 'relative', zIndex: 1, padding: '70px 16px 50px 16px' }}>
        <Stack align="center" gap="xl" style={{ textAlign: 'center' }} mb={70}>
          <Badge variant="dot" color="cyan" size="lg" radius="md">
            ⚡ SAAS EDUCATION MANAGEMENT SUITE
          </Badge>
          
          <Title
            order={1}
            style={{
              fontSize: 'clamp(30px, 7vw, 56px)', // Responsive font size
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

          <Text size="lg" style={{ maxWidth: '650px', color: '#94a3b8', lineHeight: '1.7', fontSize: 'clamp(15px, 2.5vw, 18px)' }}>
            Empower your academy. Get a custom brand landing page combined with role-based administrative dashboards, teacher scheduling, and attendance logs.
          </Text>

          {/* Hero CTA Buttons — stack on mobile */}
          <Stack align="center" gap="sm" style={{ width: '100%' }}>
            <Group gap="md" justify="center" wrap="wrap">
              <Button
                size="lg"
                radius="md"
                variant="gradient"
                gradient={{ from: 'cyan', to: 'blue', deg: 135 }}
                onClick={onLivePreviewClick}
                rightSection={<IconArrowRight size={20} />}
                style={{ fontWeight: 600, boxShadow: '0 4px 20px rgba(6, 182, 212, 0.25)', width: 'clamp(200px, 80%, 280px)' }}
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
                style={{ fontWeight: 600, width: 'clamp(160px, 80%, 220px)' }}
              >
                WhatsApp Us
              </Button>
            </Group>
          </Stack>
        </Stack>

        {/* ===== Feature Cards Grid ===== */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mb={60}>
          
          {/* Module 1: Customizable Landing */}
          <Card 
            className="hover-glow"
            p="xl" 
            radius="24px" 
            style={{ 
              background: '#111827',
              borderColor: 'rgba(6, 182, 212, 0.3)',
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
              <Text fw={900} style={{ color: '#06b6d4', opacity: 0.9, fontSize: '26px', fontFamily: 'Outfit, sans-serif' }}>
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
              background: '#111827',
              borderColor: 'rgba(99, 102, 241, 0.3)',
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
              <Text fw={900} style={{ color: '#6366f1', opacity: 0.9, fontSize: '26px', fontFamily: 'Outfit, sans-serif' }}>
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
              background: '#111827',
              borderColor: 'rgba(20, 184, 166, 0.3)',
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
              <Text fw={900} style={{ color: '#14b8a6', opacity: 0.9, fontSize: '26px', fontFamily: 'Outfit, sans-serif' }}>
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

        {/* ===== Bottom CTA Card ===== */}
        <Card
          p="xl"
          radius="32px"
          mb={40}
          style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.85) 0%, rgba(59, 130, 246, 0.85) 100%)',
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(6, 182, 212, 0.2)',
            border: 'none',
            backdropFilter: 'blur(20px)',
          }}
        >
          <Stack align="center" gap="md">
            <Title order={2} style={{ fontWeight: 800, fontSize: 'clamp(22px, 5vw, 32px)' }}>
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
              fullWidth={false}
            >
              Order via WhatsApp (010-4282163)
            </Button>
          </Stack>
        </Card>

        {/* ===== Subscribe Banner (Lead Capture) ===== */}
        <SubscribeBanner 
          title="Request a Custom Dashboard Demo" 
          subtitle="Interested in setting up a branded school portal or custom academy dashboards? Fill in your details below and our team will get back to you shortly." 
        />

        {/* Bottom padding */}
        <Box h={40} />
      </Container>

    </Box>
  );
};
export default SellerLandingPage;
