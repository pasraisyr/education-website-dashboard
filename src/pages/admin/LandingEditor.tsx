import React, { useState } from 'react';
import {
  Tabs,
  Button,
  Group,
  TextInput,
  Textarea,
  Modal,
  Select,
  ActionIcon,
  Title,
  Text,
  Paper,
  Stack,
  Box,
  SimpleGrid,
  Card,
  Image,
  Badge,
  Tooltip
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPhoto, IconInfoCircle, IconPlus, IconTrash, IconUsers } from '@tabler/icons-react';
import { useAppState } from '../../context/AppStateContext';
import { notifications } from '@mantine/notifications';

const MOCK_UNSPLASH_PRESETS = [
  { label: 'Campus Library', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80' },
  { label: 'Graduation Ceremony', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80' },
  { label: 'Soccer Match', url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80' },
  { label: 'Art Workshop', url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80' }
];

export const LandingEditor: React.FC = () => {
  const { gallery, posts, subscribers, addGalleryItem, deleteGalleryItem, addPost, deletePost } = useAppState();

  const [activeTab, setActiveTab] = useState<string | null>('gallery');

  // Modal disclosures
  const [galleryModalOpened, { open: openGalleryModal, close: closeGalleryModal }] = useDisclosure(false);
  const [postModalOpened, { open: openPostModal, close: closePostModal }] = useDisclosure(false);

  // Gallery Form States
  const [imageUrl, setImageUrl] = useState('');
  const [galleryCaption, setGalleryCaption] = useState('');
  const [galleryCategory, setGalleryCategory] = useState<'Campus' | 'Sports' | 'Events' | 'Academics'>('Campus');

  // Post Form States
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postAuthor, setPostAuthor] = useState('');
  const [postTagsRaw, setPostTagsRaw] = useState('');

  // 1. Gallery Actions
  const handleOpenAddGallery = () => {
    setImageUrl('');
    setGalleryCaption('');
    setGalleryCategory('Campus');
    openGalleryModal();
  };

  const handleGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl || !galleryCaption) {
      notifications.show({ title: 'Validation Error', message: 'Image URL and Caption are required.', color: 'red' });
      return;
    }

    addGalleryItem({
      imageUrl,
      caption: galleryCaption,
      category: galleryCategory
    });

    notifications.show({
      title: 'Gallery Updated',
      message: 'New photo successfully published to the landing page.',
      color: 'teal'
    });
    closeGalleryModal();
  };

  const handleGalleryDelete = (id: string) => {
    if (window.confirm('Delete this image from the public gallery?')) {
      deleteGalleryItem(id);
      notifications.show({ title: 'Item Removed', message: 'Image deleted from public site.', color: 'red' });
    }
  };

  const applyPresetUrl = (url: string) => {
    setImageUrl(url);
    notifications.show({ title: 'Preset Loaded', message: 'Mock Unsplash image URL filled in.', color: 'gray' });
  };

  // 2. Post Actions
  const handleOpenAddPost = () => {
    setPostTitle('');
    setPostContent('');
    setPostAuthor('Admin Office');
    setPostTagsRaw('Announcement, School');
    openPostModal();
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postContent || !postAuthor) {
      notifications.show({ title: 'Validation Error', message: 'Title, Content and Author are required.', color: 'red' });
      return;
    }

    // Split tags by comma
    const tags = postTagsRaw
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    addPost({
      title: postTitle,
      content: postContent,
      author: postAuthor,
      tags
    });

    notifications.show({
      title: 'Notice Published',
      message: 'New announcement successfully posted to the public site.',
      color: 'teal'
    });
    closePostModal();
  };

  const handlePostDelete = (id: string) => {
    if (window.confirm('Delete this article from the public news board?')) {
      deletePost(id);
      notifications.show({ title: 'Post Removed', message: 'Announcement deleted.', color: 'red' });
    }
  };

  return (
    <Stack gap="xl">
      <Box>
        <Title order={2} style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800 }}>
          Landing Page Customizer
        </Title>
        <Text size="sm" c="dimmed">
          Customize content displayed on the public landing page. Add or remove media highlights and post school updates.
        </Text>
      </Box>

      <Tabs value={activeTab} onChange={setActiveTab} color="indigo" radius="md">
        <Tabs.List mb="lg">
          <Tabs.Tab value="gallery" leftSection={<IconPhoto size={16} />}>
            Photo Gallery Items ({gallery.length})
          </Tabs.Tab>
          <Tabs.Tab value="posts" leftSection={<IconInfoCircle size={16} />}>
            News & Announcements ({posts.length})
          </Tabs.Tab>
          <Tabs.Tab value="subscribers" leftSection={<IconUsers size={16} />}>
            Service Subscribers ({subscribers.length})
          </Tabs.Tab>
        </Tabs.List>

        {/* Gallery Panel */}
        <Tabs.Panel value="gallery">
          <Stack gap="md">
            <Group justify="flex-end">
              <Button
                leftSection={<IconPlus size={16} />}
                onClick={handleOpenAddGallery}
                variant="gradient"
                gradient={{ from: 'indigo', to: 'violet', deg: 135 }}
                radius="md"
              >
                Add Gallery Image
              </Button>
            </Group>

            <Paper withBorder radius="lg" p="xl" className="glass-panel" style={{ borderColor: 'var(--edu-glass-border)' }}>
              {gallery.length === 0 ? (
                <Text c="dimmed" ta="center">No photos in public gallery.</Text>
              ) : (
                <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
                  {gallery.map(item => (
                    <Card
                      key={item.id}
                      padding={0}
                      radius="md"
                      withBorder
                      style={{ borderColor: 'var(--edu-glass-border)', display: 'flex', flexDirection: 'column' }}
                    >
                      <Box style={{ position: 'relative', height: '140px', overflow: 'hidden' }}>
                        <Image src={item.imageUrl} height="100%" fit="cover" />
                        <Badge style={{ position: 'absolute', top: '10px', left: '10px' }} color="indigo">
                          {item.category}
                        </Badge>
                      </Box>
                      
                      <Box p="sm" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Text size="xs" fw={500} lineClamp={2} mb="md">
                          {item.caption}
                        </Text>
                        
                        <Group justify="space-between" align="center">
                          <Text size="10px" c="dimmed">ID: {item.id.toUpperCase()}</Text>
                          <Tooltip label="Delete image">
                            <ActionIcon variant="light" color="red" size="sm" onClick={() => handleGalleryDelete(item.id)} radius="md">
                              <IconTrash size={14} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      </Box>
                    </Card>
                  ))}
                </SimpleGrid>
              )}
            </Paper>
          </Stack>
        </Tabs.Panel>

        {/* Posts Panel */}
        <Tabs.Panel value="posts">
          <Stack gap="md">
            <Group justify="flex-end">
              <Button
                leftSection={<IconPlus size={16} />}
                onClick={handleOpenAddPost}
                variant="gradient"
                gradient={{ from: 'indigo', to: 'violet', deg: 135 }}
                radius="md"
              >
                Publish Announcement
              </Button>
            </Group>

            <Paper withBorder radius="lg" p="xl" className="glass-panel" style={{ borderColor: 'var(--edu-glass-border)' }}>
              {posts.length === 0 ? (
                <Text c="dimmed" ta="center">No announcements published.</Text>
              ) : (
                <Stack gap="md">
                  {posts.map(post => (
                    <Card
                      key={post.id}
                      withBorder
                      radius="md"
                      p="md"
                      style={{ borderColor: 'var(--edu-glass-border)' }}
                    >
                      <Group justify="space-between" align="center" mb="xs">
                        <Box>
                          <Text size="sm" fw={700}>{post.title}</Text>
                          <Text size="xs" c="dimmed">By {post.author} on {post.date}</Text>
                        </Box>
                        <Group gap="xs">
                          {post.tags?.map(tag => (
                            <Badge key={tag} size="xs" variant="light" color="indigo">#{tag}</Badge>
                          ))}
                          <Tooltip label="Delete announcement">
                            <ActionIcon variant="light" color="red" size="md" onClick={() => handlePostDelete(post.id)} radius="md">
                              <IconTrash size={14} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      </Group>
                      <Text size="xs" c="dimmed" lineClamp={2}>
                        {post.content}
                      </Text>
                    </Card>
                  ))}
                </Stack>
              )}
            </Paper>
          </Stack>
        </Tabs.Panel>

        {/* Subscribers Panel */}
        <Tabs.Panel value="subscribers">
          <Stack gap="md">
            <Paper withBorder radius="lg" p="xl" className="glass-panel" style={{ borderColor: 'var(--edu-glass-border)' }}>
              {subscribers.length === 0 ? (
                <Text c="dimmed" ta="center">No active service subscribers yet. Use the subscription form on the landing page!</Text>
              ) : (
                <Box style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--edu-glass-border)' }}>
                        <th style={{ padding: '12px 8px', fontSize: '14px', fontWeight: 700 }}>Name (Nama)</th>
                        <th style={{ padding: '12px 8px', fontSize: '14px', fontWeight: 700 }}>Email Address</th>
                        <th style={{ padding: '12px 8px', fontSize: '14px', fontWeight: 700 }}>Phone (No. Tel)</th>
                        <th style={{ padding: '12px 8px', fontSize: '14px', fontWeight: 700 }}>Subscribed Date</th>
                        <th style={{ padding: '12px 8px', fontSize: '14px', fontWeight: 700 }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map(sub => (
                        <tr key={sub.id} style={{ borderBottom: '1px solid var(--edu-glass-border)' }}>
                          <td style={{ padding: '12px 8px', fontSize: '13px', fontWeight: 600 }}>{sub.name || '-'}</td>
                          <td style={{ padding: '12px 8px', fontSize: '13px' }}>{sub.email}</td>
                          <td style={{ padding: '12px 8px', fontSize: '13px' }}>{sub.phone || '-'}</td>
                          <td style={{ padding: '12px 8px', fontSize: '13px', color: 'var(--mantine-color-dimmed)' }}>{sub.date}</td>
                          <td style={{ padding: '12px 8px', fontSize: '13px' }}>
                            <Badge color="teal" variant="light" size="sm">Active</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              )}
            </Paper>
          </Stack>
        </Tabs.Panel>
      </Tabs>

      {/* Gallery Modal */}
      <Modal opened={galleryModalOpened} onClose={closeGalleryModal} title="Add Image to Landing Gallery" radius="lg" size="md">
        <form onSubmit={handleGallerySubmit}>
          <Stack gap="md">
            <Select
              label="Image Category"
              data={['Campus', 'Sports', 'Events', 'Academics']}
              value={galleryCategory}
              onChange={(val) => setGalleryCategory(val as any || 'Campus')}
              radius="md"
            />

            <TextInput
              label="Image URL Address"
              placeholder="e.g. https://images.unsplash.com/photo-..."
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              radius="md"
            />

            {/* Quick Fill presets to help client test */}
            <Box>
              <Text size="xs" c="dimmed" fw={600} mb="xs">Quick Fill Demo Presets:</Text>
              <Group gap="xs">
                {MOCK_UNSPLASH_PRESETS.map(preset => (
                  <Button
                    key={preset.label}
                    size="xs"
                    variant="light"
                    color="violet"
                    radius="md"
                    onClick={() => applyPresetUrl(preset.url)}
                  >
                    {preset.label}
                  </Button>
                ))}
              </Group>
            </Box>

            <Textarea
              label="Image Caption"
              placeholder="Describe the activity or facility..."
              required
              minRows={2}
              value={galleryCaption}
              onChange={(e) => setGalleryCaption(e.target.value)}
              radius="md"
            />

            <Group justify="flex-end" mt="md">
              <Button variant="light" color="gray" onClick={closeGalleryModal} radius="md">Cancel</Button>
              <Button type="submit" variant="gradient" gradient={{ from: 'indigo', to: 'violet', deg: 135 }} radius="md">
                Publish Highlight
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      {/* Post Modal */}
      <Modal opened={postModalOpened} onClose={closePostModal} title="Publish News Announcement" radius="lg" size="md">
        <form onSubmit={handlePostSubmit}>
          <Stack gap="md">
            <TextInput
              label="Announcement Title"
              placeholder="e.g. Mid-term Exam Timetable Out"
              required
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              radius="md"
            />

            <TextInput
              label="Author Name / Designation"
              placeholder="e.g. Office of the Principal"
              required
              value={postAuthor}
              onChange={(e) => setPostAuthor(e.target.value)}
              radius="md"
            />

            <TextInput
              label="Tags (Comma Separated)"
              placeholder="e.g. Announcement, Calendar, Exam"
              value={postTagsRaw}
              onChange={(e) => setPostTagsRaw(e.target.value)}
              radius="md"
            />

            <Textarea
              label="Article / Notice Content"
              placeholder="Type the full announcement context here..."
              required
              minRows={5}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              radius="md"
            />

            <Group justify="flex-end" mt="md">
              <Button variant="light" color="gray" onClick={closePostModal} radius="md">Cancel</Button>
              <Button type="submit" variant="gradient" gradient={{ from: 'indigo', to: 'violet', deg: 135 }} radius="md">
                Publish Article
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Stack>
  );
};
export default LandingEditor;
