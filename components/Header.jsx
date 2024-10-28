'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Flex, Button, Heading, Dialog, Box } from '@radix-ui/themes';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const menuItems = [
    { text: '필모그래피', path: '/filmography' },
    { text: '사이트별 출연작', path: '/filmo-by-ott' },
    { text: '나혼산 짤 모음집', path: '/liveAlone/captures' },
  ];

  const handleNavigate = (path) => {
    router.push(path);
    setIsSidebarOpen(false);
  };

  return (
    <Box
      style={{
        position: 'sticky',
        top: 0,
        backgroundColor: 'var(--gray-1)',
        borderBottom: '1px solid var(--gray-6)',
        zIndex: 1000,
      }}
    >
      <Box style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <Flex justify="between" align="center" py="4">
          <Heading
            size="5"
            onClick={() => router.push(`/`)}
            style={{ cursor: 'pointer' }}
          >
            JU.CHIVE
          </Heading>
          <Flex gap="6" display={{ initial: 'none', md: 'flex' }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                style={{ cursor: 'pointer' }}
                onClick={() => handleNavigate(item.path)}
                size="2"
              >
                {item.text}
              </Button>
            ))}
          </Flex>
          <Flex justify="center" align="center" display={{ md: 'none' }}>
            <Button
              variant="ghost"
              size="4"
              style={{ cursor: 'pointer' }}
              onClick={() => setIsSidebarOpen(true)}
            >
              <HamburgerMenuIcon style={{ transform: 'scale(2.0)' }} />
            </Button>
          </Flex>
        </Flex>
      </Box>

      <Dialog.Root open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <Dialog.Content
          aria-describedby={undefined}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '200px',
            padding: '16px',
            backgroundColor: 'var(--gray-1)',
            borderRadius: '10px 0 0 10px',
          }}
        >
          <VisuallyHidden.Root asChild>
            <Dialog.Title></Dialog.Title>
          </VisuallyHidden.Root>
          <Flex direction="column" gap="4">
            <Flex justify="between" align="center">
              <Button
                variant="ghost"
                size="1"
                onClick={() => setIsSidebarOpen(false)}
                style={{ cursor: 'pointer' }}
              >
                <Cross1Icon />
              </Button>
            </Flex>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => handleNavigate(item.path)}
                size="2"
                style={{ justifyContent: 'flex-start', cursor: 'pointer' }}
              >
                {item.text}
              </Button>
            ))}
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Box>
  );
}

export default Header;
