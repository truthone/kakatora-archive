'use client';

import React, { useState } from 'react';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Flex, Button, Heading, Dialog, Box, Text, Theme } from '@radix-ui/themes';
import { HamburgerMenuIcon, CaretLeftIcon } from '@radix-ui/react-icons';

function HeaderOfTebas() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 메뉴 아이템과 id 정의
  const menuItems = [
    { text: '오늘의 캐스트', id: 'cast-board' },
    { text: `전체 스케줄`, id: 'schedule' },
  ];

  // 섹션으로 스크롤
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsSidebarOpen(false);
  };
// LeftIcon 클릭 시 히스토리가 없으면 홈으로 라우팅
  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.push('/');
    }
  };

  return (
    // <Theme accentColor="indigo">
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
            <Button
              variant="ghost"
              size="4"
              style={{ cursor: 'pointer' }}
              onClick={() => window.history.back()}
            >
              <CaretLeftIcon style={{ transform: 'scale(2.0)' }} />
            </Button>
          </Flex>
          <Heading
            size={{ initial: '5', md: '7' }}
            onClick={handleBackNavigation}
            style={{ cursor: 'pointer' }}
          >
            테베랜드
          </Heading>
          <Flex gap="6" display={{ initial: 'none', md: 'flex' }}>
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                style={{ cursor: 'pointer' }}
                onClick={() => handleScrollTo(item.id)}
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
                onClick={() => handleScrollTo(item.id)}
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
  // </Theme>
  );
}

export default HeaderOfTebas;
