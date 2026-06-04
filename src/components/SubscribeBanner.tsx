import React, { useState } from 'react';
import { Card, Box, Stack, Badge, Title, Text, SimpleGrid, TextInput, Button, Paper } from '@mantine/core';
import { useAppState } from '../context/AppStateContext';

interface SubscribeBannerProps {
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

export const SubscribeBanner: React.FC<SubscribeBannerProps> = ({
  title = "Join PasraisyEdu Center Today",
  subtitle = "Enter your details to subscribe to our portal. Your data will be saved to the demo system log and can be connected directly to your Google Sheets / AppSheet database.",
  compact = false
}) => {
  const { addSubscriber } = useAppState();
  
  // Subscription Form States
  const [subEmail, setSubEmail] = useState('');
  const [subName, setSubName] = useState('');
  const [subPhone, setSubPhone] = useState('');
  const [subLoading, setSubLoading] = useState(false);
  const [subSuccess, setSubSuccess] = useState(false);

  // Paste your Google Apps Script Web App URL here to sync directly with Google Sheets (which serves as AppSheet's Database)
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz0uvIwN4skykvd1LUnjyVFACeZzC5lZdnTEjl2UleUa1HS4GqckH6CRhfU1slwWlt4/exec';

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail) return;

    setSubLoading(true);

    // Save to local storage mock database first so it shows up in Admin Subscribers log tab
    addSubscriber({ email: subEmail, name: subName, phone: subPhone });

    // Optional real-time sync with Google Sheet (AppSheet DB) via Apps Script
    if (GOOGLE_SCRIPT_URL) {
      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: subEmail,
            name: subName,
            phone: subPhone,
            date: new Date().toISOString().split('T')[0]
          })
        });
      } catch (err) {
        console.error('Failed to sync with Google Sheet/AppSheet API', err);
      }
    }

    setSubLoading(false);
    setSubSuccess(true);
    setSubEmail('');
    setSubName('');
    setSubPhone('');

    // Clear success banner after 5 seconds
    setTimeout(() => setSubSuccess(false), 5000);
  };

  return (
    <Card
      p={compact ? "lg" : "xl"}
      radius="24px"
      style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.95) 0%, rgba(168, 85, 247, 0.95) 100%)',
        color: 'white',
        boxShadow: compact ? '0 10px 30px rgba(99, 102, 241, 0.15)' : '0 20px 50px rgba(99, 102, 241, 0.25)',
        position: 'relative',
        overflow: 'hidden',
        border: 'none',
        marginBottom: compact ? '20px' : '0'
      }}
    >
      {/* Background floating glow circles */}
      <Box
        style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: compact ? '120px' : '180px',
          height: compact ? '120px' : '180px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />
      <Box
        style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: compact ? '80px' : '120px',
          height: compact ? '80px' : '120px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }}
      />

      <Stack align="center" gap={compact ? "xs" : "lg"} style={{ textAlign: 'center' }}>
        <Badge variant="white" color="indigo" size={compact ? "xs" : "lg"} radius="md" style={{ fontWeight: 800 }}>
          🚀 Subscribe to Our Services
        </Badge>
        <Title order={compact ? 3 : 2} style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: compact ? '22px' : '32px' }}>
          {title}
        </Title>
        <Text size={compact ? "xs" : "md"} style={{ maxWidth: '500px', opacity: 0.9, lineHeight: '1.6' }}>
          {subtitle}
        </Text>

        {subSuccess ? (
          <Paper p="sm" radius="lg" style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)', width: '100%', maxWidth: '500px', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
            <Text size="sm" fw={700}>
              🎉 Registration Successful!
            </Text>
            <Text size="xs" style={{ opacity: 0.9 }} mt="4px">
              Your details have been registered in the Admin Subscribers log.
            </Text>
          </Paper>
        ) : (
          <form onSubmit={handleSubscribe} style={{ width: '100%', maxWidth: '650px' }}>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xs" mb="xs">
              <TextInput
                placeholder="Your Name"
                value={subName}
                onChange={(e) => setSubName(e.target.value)}
                radius="md"
                size={compact ? "xs" : "md"}
                styles={{
                  input: {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    '&::placeholder': { color: 'rgba(255, 255, 255, 0.7)' }
                  }
                }}
              />
              <TextInput
                placeholder="Phone Number"
                value={subPhone}
                onChange={(e) => setSubPhone(e.target.value)}
                radius="md"
                size={compact ? "xs" : "md"}
                styles={{
                  input: {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    '&::placeholder': { color: 'rgba(255, 255, 255, 0.7)' }
                  }
                }}
              />
              <TextInput
                type="email"
                placeholder="Email Address*"
                required
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                radius="md"
                size={compact ? "xs" : "md"}
                styles={{
                  input: {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    '&::placeholder': { color: 'rgba(255, 255, 255, 0.7)' }
                  }
                }}
              />
            </SimpleGrid>
            <Button
              type="submit"
              loading={subLoading}
              variant="white"
              color="indigo"
              size={compact ? "sm" : "md"}
              radius="md"
              fullWidth
              style={{ fontWeight: 700, fontSize: compact ? '13px' : '15px' }}
            >
              Submit Subscription
            </Button>
          </form>
        )}

      </Stack>
    </Card>
  );
};
export default SubscribeBanner;
