'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Flex, Button, Heading, Dialog, Box, Text } from '@radix-ui/themes';
import { HamburgerMenuIcon, CaretLeftIcon } from '@radix-ui/react-icons';

function HeaderOfTebas() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { text: '필모그래피', path: '/filmography' },
    { text: '사이트별 출연작', path: '/filmo-by-ott' },
    { text: '나혼산 에피소드', path: '/liveAlone/' },
    { text: '나혼산 짤 모음집', path: '/liveAlone/captures' },
    { text: `24테베랜드`, path: '/24tebas-land' },
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
        <Flex justify="center" align="center" display={{ md: 'none' }}>
        {
          pathname !== "/" && 
          ( 
            <Button
              variant="ghost"
              size="4"
              style={{ cursor: 'pointer' }}
              onClick={() => router.back()}
            >
              <CaretLeftIcon style={{ transform: 'scale(2.0)' }} />
            </Button>
          )
        }
          </Flex>
          <Heading
            size={{ initial: '5', md: '7' }}
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
                <Heading size="3">{item.text}</Heading>
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
          aria-describedby={'메뉴'}
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
          <Dialog.Description asChild>
            <VisuallyHidden.Root>''</VisuallyHidden.Root>
          </Dialog.Description>
          <VisuallyHidden.Root asChild>
            <Dialog.Title></Dialog.Title>
          </VisuallyHidden.Root>
          <Flex direction="column" gap="4" my="8">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => handleNavigate(item.path)}
                size="3"
                style={{ justifyContent: 'flex-start', cursor: 'pointer' }}
              >
                <Text weight="bold">{item.text}</Text>
              </Button>
            ))}
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Box>
  );
}

export default HeaderOfTebas;
