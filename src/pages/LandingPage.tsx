import React, { useState } from 'react';
import { Container, Title, Text, Button, SimpleGrid, Card, Image, Badge, Group, Stack, Tabs, ThemeIcon, Box, Paper, Avatar, RingProgress } from '@mantine/core';
import { SubscribeBanner } from '../components/SubscribeBanner';
import {
  IconSchool,
  IconArrowRight,
  IconPhoto,
  IconInfoCircle,
  IconBook,
  IconCalendar,
  IconUsers,
  IconActivity,
  IconCircleCheck
} from '@tabler/icons-react';
import { useAppState } from '../context/AppStateContext';

interface LandingPageProps {
  onLoginClick: () => void;
  onBackToSellerClick?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick, onBackToSellerClick }) => {
  const { classes, subjects, gallery, posts } = useAppState();
  const [galleryFilter, setGalleryFilter] = useState<string>('All');
  const [hoveredGalId, setHoveredGalId] = useState<string | null>(null);

  // Categories helper
  const filteredGallery = galleryFilter === 'All'
    ? gallery
    : gallery.filter(item => item.category === galleryFilter);

  // Helper to fetch subjects list for a class
  const getClassSubjects = (subjectIds: string[]) => {
    return subjects.filter(s => subjectIds.includes(s.id));
  };

  return (
    <Box style={{ backgroundColor: 'var(--mantine-color-body)', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      
      {/* Decorative Ambient Blur Blobs */}
      <Box
        style={{
          position: 'absolute',
          top: '5%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
          filter: 'blur(100px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <Box
        style={{
          position: 'absolute',
          top: '30%',
          right: '-15%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)',
          filter: 'blur(120px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <Box
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.06) 0%, transparent 70%)',
          filter: 'blur(90px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Floating Glassmorphic Header */}
      <Box
        style={{
          position: 'sticky',
          top: '20px',
          zIndex: 100,
          margin: '0 auto',
          maxWidth: '1280px',
          padding: '0 20px',
        }}
      >
        <Box
          className="glass-panel"
          style={{
            borderRadius: '20px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.04)',
            border: '1px solid var(--edu-glass-border)',
            padding: '10px 24px'
          }}
        >
          <Group justify="space-between" h={60}>
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
                style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '0.2px' }}
              >
                PasraisyEdu Center
              </Text>
            </Group>

            <Group gap="xl" visibleFrom="sm" style={{ fontWeight: 600, fontSize: '15px' }}>
              <a href="#hero" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>Home</a>
              <a href="#classes" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>Classes</a>
              <a href="#gallery" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>Gallery</a>
              <a href="#about" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>Announcements</a>
            </Group>

            <Group gap="xs">
              {onBackToSellerClick && (
                <Button
                  variant="subtle"
                  color="indigo"
                  radius="xl"
                  onClick={onBackToSellerClick}
                  style={{ fontWeight: 600 }}
                >
                  ← Info Seller
                </Button>
              )}
              <Button
                radius="xl"
                size="md"
                variant="gradient"
                gradient={{ from: 'indigo', to: 'violet', deg: 135 }}
                onClick={onLoginClick}
                rightSection={<IconArrowRight size={16} />}
                style={{ fontWeight: 600, boxShadow: '0 4px 15px rgba(99, 102, 241, 0.25)' }}
              >
                Portal Login
              </Button>
            </Group>
          </Group>
        </Box>
      </Box>

      {/* Hero Section */}
      <Box
        id="hero"
        style={{
          position: 'relative',
          padding: '100px 0 80px 0',
          zIndex: 1
        }}
      >
        <Container size="lg">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="50px" style={{ alignItems: 'center' }}>
            
            {/* Left side text copy */}
            <Stack gap="xl">
              <Group gap="xs">
                <Box
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#6366f1',
                    boxShadow: '0 0 10px #6366f1',
                    animation: 'pulseGlow 2s infinite'
                  }}
                />
                <Badge variant="light" color="indigo" size="lg" radius="md">
                  🎓 Next-Gen Education Center
                </Badge>
              </Group>
              
              <Title
                order={1}
                style={{
                  fontSize: '52px',
                  fontWeight: 900,
                  lineHeight: '1.1',
                  fontFamily: 'Outfit, sans-serif',
                }}
              >
                Empowering Minds,<br />
                <Text
                  component="span"
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'violet', deg: 135 }}
                  inherit
                  fw={900}
                >
                  Shaping Futures
                </Text>
              </Title>

              <Text size="lg" c="dimmed" style={{ lineHeight: '1.7' }}>
                Welcome to PasraisyEdu Center, an integrated ecosystem connecting students, teachers, and parents. Experience real-time monitoring, curriculum planning, and interactive galleries designed to drive educational excellence.
              </Text>

              <Group gap="md">
                <Button
                  size="lg"
                  radius="md"
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'violet', deg: 135 }}
                  onClick={onLoginClick}
                  style={{ boxShadow: '0 4px 20px rgba(99, 102, 241, 0.2)' }}
                >
                  Enter Portal Dashboard
                </Button>
                <Button
                  size="lg"
                  radius="md"
                  variant="outline"
                  color="indigo"
                  component="a"
                  href="#classes"
                >
                  Explore Classes
                </Button>
              </Group>
            </Stack>

            {/* Right side live monitoring console mockup (WOW factor) */}
            <Card
              padding="lg"
              radius="xl"
              withBorder
              style={{
                background: 'var(--edu-glass-bg)',
                borderColor: 'var(--edu-glass-border)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.05)',
                position: 'relative',
                overflow: 'visible',
                border: '1px solid var(--edu-glass-border)'
              }}
            >
              {/* Top ambient bulb */}
              <Box
                style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-10px',
                  width: '90px',
                  height: '90px',
                  background: 'var(--edu-primary-grad)',
                  borderRadius: '50%',
                  filter: 'blur(35px)',
                  opacity: 0.2,
                  zIndex: -1
                }}
              />

              <Stack gap="md">
                <Group justify="space-between">
                  <Group gap="xs">
                    <Box style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#40c057', boxShadow: '0 0 8px #40c057', animation: 'pulseGlow 1.5s infinite' }} />
                    <Text size="xs" fw={700} c="indigo" tt="uppercase" style={{ letterSpacing: '0.8px' }}>
                      PasraisyEdu Portal Live Status
                    </Text>
                  </Group>
                  <Badge variant="light" color="teal" size="sm">
                    Interactive Demo
                  </Badge>
                </Group>

                <SimpleGrid cols={2} spacing="md">
                  <Paper p="md" radius="lg" withBorder style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'var(--edu-glass-border)' }}>
                    <Group gap="xs" wrap="nowrap">
                      <RingProgress
                        size={55}
                        thickness={5}
                        roundCaps
                        sections={[{ value: 98, color: 'indigo' }]}
                        label={
                          <Text size="xs" ta="center" fw={800}>
                            98%
                          </Text>
                        }
                      />
                      <Box>
                        <Text size="xs" c="dimmed" fw={500}>Attendance</Text>
                        <Text size="sm" fw={800}>Rate Today</Text>
                      </Box>
                    </Group>
                  </Paper>

                  <Paper p="md" radius="lg" withBorder style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'var(--edu-glass-border)' }}>
                    <Group gap="xs" wrap="nowrap">
                      <ThemeIcon size={38} radius="md" color="violet" variant="light">
                        <IconUsers size={20} />
                      </ThemeIcon>
                      <Box style={{ marginLeft: '4px' }}>
                        <Text size="xs" c="dimmed" fw={500}>Roster Stats</Text>
                        <Text size="sm" fw={800}>500+ Enrolled</Text>
                      </Box>
                    </Group>
                  </Paper>
                </SimpleGrid>

                <Box style={{ borderTop: '1px solid var(--edu-glass-border)', paddingTop: '15px' }}>
                  <Text size="xs" c="dimmed" fw={800} mb="sm" tt="uppercase" style={{ letterSpacing: '0.5px' }}>
                    Live Activities Feed
                  </Text>
                  
                  <Stack gap="xs">
                    <Group justify="space-between" style={{ background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <Group gap="xs">
                        <Avatar size="xs" color="indigo" radius="xl">SA</Avatar>
                        <Text size="xs" fw={700}>Cikgu Siti Aminah</Text>
                      </Group>
                      <Badge color="green" variant="light" size="xs" leftSection={<IconActivity size={10} />}>Clocked In</Badge>
                    </Group>

                    <Group justify="space-between" style={{ background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <Group gap="xs">
                        <Avatar size="xs" color="violet" radius="xl">AF</Avatar>
                        <Text size="xs" fw={700}>Ahmad Farhan</Text>
                      </Group>
                      <Badge color="blue" variant="light" size="xs" leftSection={<IconCircleCheck size={10} />}>Present</Badge>
                    </Group>

                    <Group justify="space-between" style={{ background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <Group gap="xs">
                        <Avatar size="xs" color="pink" radius="xl">BH</Avatar>
                        <Text size="xs" fw={700}>Badrul Hisyam</Text>
                      </Group>
                      <Badge color="yellow" variant="light" size="xs">Late (Bus)</Badge>
                    </Group>
                  </Stack>
                </Box>
              </Stack>
            </Card>

          </SimpleGrid>
        </Container>
      </Box>

      {/* Classes Directory Section */}
      <Box id="classes" style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
        <Container size="lg">
          <Stack align="center" gap="xs" mb={60}>
            <Badge variant="light" color="indigo" size="lg" radius="md">
              <IconBook size={14} style={{ marginRight: '5px' }} /> Academic Directory
            </Badge>
            <Title order={2} style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '32px' }}>
              Our Enrolled Classes
            </Title>
            <Text size="md" c="dimmed" style={{ maxWidth: '600px', textAlign: 'center', lineHeight: '1.6' }}>
              Explore the classes offered on our campus along with core subjects mapping and grade benchmarks.
            </Text>
          </Stack>

          {classes.length === 0 ? (
            <Paper p="xl" radius="lg" withBorder style={{ textAlign: 'center', background: 'var(--edu-glass-bg)' }}>
              <Text c="dimmed">No classes available at the moment.</Text>
            </Paper>
          ) : (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
              {classes.map(cls => {
                const classSubjects = getClassSubjects(cls.subjectIds);
                return (
                  <Card
                    key={cls.id}
                    withBorder
                    radius="xl"
                    p="xl"
                    className="hover-glow"
                    style={{
                      background: 'var(--edu-glass-bg)',
                      borderColor: 'var(--edu-glass-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                    }}
                  >
                    <Box>
                      <Group justify="space-between" mb="lg">
                        <Badge variant="light" color="violet" size="md" radius="md">
                          {cls.grade}
                        </Badge>
                        <Text size="xs" c="dimmed" fw={700}>
                          ID: {cls.id.toUpperCase()}
                        </Text>
                      </Group>

                      <Title order={3} size="h3" mb="md" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800 }}>
                        {cls.name}
                      </Title>
                      
                      <Text size="xs" c="dimmed" fw={800} tt="uppercase" mt="lg" mb="sm" style={{ letterSpacing: '0.5px' }}>
                        Curriculum Subjects
                      </Text>

                      <Stack gap="xs" mb="xl">
                        {classSubjects.length === 0 ? (
                          <Text size="xs" c="dimmed">No subjects assigned</Text>
                        ) : (
                          classSubjects.map(sub => (
                            <Group key={sub.id} gap="xs">
                              <IconSchool size={15} style={{ color: 'var(--mantine-color-indigo-5)' }} />
                              <Text size="sm" fw={600}>{sub.name}</Text>
                              <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace' }}>({sub.code})</Text>
                            </Group>
                          ))
                        )}
                      </Stack>
                    </Box>

                    <Button
                      fullWidth
                      variant="light"
                      color="indigo"
                      radius="md"
                      onClick={onLoginClick}
                      rightSection={<IconArrowRight size={14} />}
                      style={{ fontWeight: 600 }}
                    >
                      View Student Roster
                    </Button>
                  </Card>
                );
              })}
            </SimpleGrid>
          )}
        </Container>
      </Box>

      {/* Gallery Section */}
      <Box id="gallery" style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
        <Container size="lg">
          <Stack align="center" gap="xs" mb={40}>
            <Badge variant="light" color="indigo" size="lg" radius="md">
              <IconPhoto size={14} style={{ marginRight: '5px' }} /> Media Gallery
            </Badge>
            <Title order={2} style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '32px' }}>
              Life at Our Campus
            </Title>
            <Text size="md" c="dimmed" style={{ maxWidth: '600px', textAlign: 'center', lineHeight: '1.6' }}>
              Check out some highlights from our cultural ceremonies, sporting tournaments, and classroom sessions.
            </Text>
          </Stack>

          {/* Category Tabs */}
          <Tabs
            value={galleryFilter}
            onChange={(val) => setGalleryFilter(val || 'All')}
            color="indigo"
            mb="xl"
            styles={{
              tab: { fontWeight: 600, fontSize: '14px' },
              list: { borderBottom: '1px solid var(--edu-glass-border)', justifyContent: 'center' }
            }}
          >
            <Tabs.List>
              <Tabs.Tab value="All">All Images</Tabs.Tab>
              <Tabs.Tab value="Campus">Campus</Tabs.Tab>
              <Tabs.Tab value="Sports">Sports</Tabs.Tab>
              <Tabs.Tab value="Academics">Academics</Tabs.Tab>
              <Tabs.Tab value="Events">Events</Tabs.Tab>
            </Tabs.List>
          </Tabs>

          {filteredGallery.length === 0 ? (
            <Paper p="xl" radius="xl" withBorder style={{ textAlign: 'center', background: 'var(--edu-glass-bg)', borderColor: 'var(--edu-glass-border)' }}>
              <Text c="dimmed">No media items in this category.</Text>
            </Paper>
          ) : (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
              {filteredGallery.map(item => (
                <Card
                  key={item.id}
                  padding={0}
                  radius="xl"
                  withBorder
                  className="hover-glow"
                  onMouseEnter={() => setHoveredGalId(item.id)}
                  onMouseLeave={() => setHoveredGalId(null)}
                  style={{
                    overflow: 'hidden',
                    background: 'var(--edu-glass-bg)',
                    borderColor: 'var(--edu-glass-border)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.02)'
                  }}
                >
                  <Box style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <Image
                      src={item.imageUrl}
                      alt={item.caption}
                      height="100%"
                      fit="cover"
                      style={{
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: hoveredGalId === item.id ? 'scale(1.08)' : 'scale(1)'
                      }}
                    />
                    <Badge
                      style={{ position: 'absolute', top: '15px', left: '15px', zIndex: 1 }}
                      color="indigo"
                      variant="filled"
                      radius="sm"
                    >
                      {item.category}
                    </Badge>
                  </Box>
                  <Box p="md">
                    <Text size="sm" fw={600} style={{ lineHeight: '1.4' }}>
                      {item.caption}
                    </Text>
                  </Box>
                </Card>
              ))}
            </SimpleGrid>
          )}
        </Container>
      </Box>

      {/* Announcements / About Section */}
      <Box id="about" style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
        <Container size="lg">
          <Stack align="center" gap="xs" mb={50}>
            <Badge variant="light" color="indigo" size="lg" radius="md">
              <IconInfoCircle size={14} style={{ marginRight: '5px' }} /> Announcements Board
            </Badge>
            <Title order={2} style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '32px' }}>
              Latest News & Postings
            </Title>
            <Text size="md" c="dimmed" style={{ maxWidth: '600px', textAlign: 'center', lineHeight: '1.6' }}>
              Stay updated with academic schedules, new facility operations, and official notices from the administration.
            </Text>
          </Stack>

          {posts.length === 0 ? (
            <Paper p="xl" radius="xl" withBorder style={{ textAlign: 'center', background: 'var(--edu-glass-bg)', borderColor: 'var(--edu-glass-border)' }}>
              <Text c="dimmed">No announcements posted yet.</Text>
            </Paper>
          ) : (
            <Stack gap="xl">
              {posts.map(post => {
                // Border accent indicator based on tags
                let borderHighlight = '4px solid var(--mantine-color-indigo-5)';
                if (post.tags?.includes('STEM')) borderHighlight = '4px solid var(--mantine-color-violet-5)';
                if (post.tags?.includes('Meeting')) borderHighlight = '4px solid var(--mantine-color-teal-5)';

                return (
                  <Card
                    key={post.id}
                    withBorder
                    radius="xl"
                    p="xl"
                    className="hover-glow"
                    style={{
                      background: 'var(--edu-glass-bg)',
                      borderColor: 'var(--edu-glass-border)',
                      borderLeft: borderHighlight,
                      boxShadow: '0 8px 30px rgba(0,0,0,0.02)'
                    }}
                  >
                    <Group justify="space-between" align="center" mb="md">
                      <Group gap="xs">
                        <Avatar color="indigo" radius="xl" name={post.author} style={{ fontWeight: 600 }} />
                        <Box>
                          <Text size="sm" fw={700}>{post.author}</Text>
                          <Group gap="xs">
                            <IconCalendar size={12} style={{ color: 'var(--mantine-color-dimmed)' }} />
                            <Text size="xs" c="dimmed">{post.date}</Text>
                          </Group>
                        </Box>
                      </Group>

                      <Group gap="xs">
                        {post.tags?.map(tag => (
                          <Badge key={tag} color="indigo" variant="light" radius="md">
                            #{tag}
                          </Badge>
                        ))}
                      </Group>
                    </Group>

                    <Title order={3} size="h3" mb="sm" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800 }}>
                      {post.title}
                    </Title>
                    
                    <Text size="sm" c="dimmed" style={{ lineHeight: '1.7' }}>
                      {post.content}
                    </Text>
                  </Card>
                );
              })}
            </Stack>
          )}
        </Container>
      </Box>

      {/* Subscription Banner Section */}
      <Box
        id="subscribe"
        style={{
          padding: '80px 0',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Container size="md">
          <SubscribeBanner />
        </Container>
      </Box>

      {/* Footer */}
      <Box
        style={{
          borderTop: '1px solid var(--edu-glass-border)',
          backgroundColor: 'var(--edu-glass-bg)',
          padding: '60px 0 30px 0',
          backdropFilter: 'blur(15px)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Container size="lg">
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mb="xl">
            <Stack>
              <Group gap="xs">
                <Box
                  className="animated-gradient-bg"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 900,
                    fontSize: '16px'
                  }}
                >
                  PS
                </Box>
                <Text size="lg" fw={800} variant="gradient" gradient={{ from: 'indigo', to: 'violet', deg: 135 }}>
                  PasraisyEdu Center
                </Text>
              </Group>
              <Text size="sm" c="dimmed" style={{ maxWidth: '280px', lineHeight: '1.6' }}>
                Next generation school portal providing academic organization and administrative dashboards.
              </Text>
            </Stack>

            <Stack gap="xs">
              <Text fw={700} size="sm">Quick Links</Text>
              <a href="#hero" style={{ textDecoration: 'none', color: 'inherit', fontSize: '14px' }}>Home</a>
              <a href="#classes" style={{ textDecoration: 'none', color: 'inherit', fontSize: '14px' }}>Classes</a>
              <a href="#gallery" style={{ textDecoration: 'none', color: 'inherit', fontSize: '14px' }}>Gallery</a>
              <a href="#about" style={{ textDecoration: 'none', color: 'inherit', fontSize: '14px' }}>Announcements</a>
            </Stack>

            <Stack gap="xs">
              <Text fw={700} size="sm">Contact Info</Text>
              <Text size="sm" c="dimmed">123, Academic Blvd, Knowledge City</Text>
              <Text size="sm" c="dimmed">info@pasraisyedu.com</Text>
              <Text size="sm" c="dimmed">+603-1234-5678</Text>
            </Stack>
          </SimpleGrid>

          <Box style={{ borderTop: '1px solid var(--edu-glass-border)', paddingTop: '20px', textAlign: 'center' }}>
            <Text size="xs" c="dimmed">
              © {new Date().getFullYear()} PasraisyEdu Center. All Rights Reserved. Created as an Interactive Client Demo.
            </Text>
          </Box>
        </Container>
      </Box>

    </Box>
  );
};
export default LandingPage;
