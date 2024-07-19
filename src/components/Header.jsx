import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Button, Heading, Dialog, Box } from '@radix-ui/themes';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { text: '프로필', path: '/profile' },
    { text: '필모그래피', path: '/filmography' },
    { text: 'OTT 뭘 봐야할까?', path: '/ott-recommendation' },
    { text: '추천 컨텐츠', path: '/recommended' },
    { text: '취향표 만들기', path: '/taste-chart' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
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
          <Heading size="5" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>JU.CHIVE</Heading>
          <Flex gap="6" display={{ initial: 'none', md: 'flex' }}>
            {menuItems.map((item, index) => (
              <Button key={index} variant="ghost" onClick={() => handleNavigate(item.path)} size="2">
                {item.text}
              </Button>
            ))}
          </Flex>
          <Box display={{ md: 'none' }}>
            <Button variant="ghost" size="4" onClick={() => setIsSidebarOpen(true)}>
              <HamburgerMenuIcon style={{ transform: 'scale(2.0)' }}/>
            </Button>
          </Box>
        </Flex>
      </Box>

      <Dialog.Root open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <Dialog.Content style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '250px', padding: '16px', backgroundColor: 'var(--gray-1)' }}>
          <Flex direction="column" gap="4">
            <Flex justify="between" align="center">
              <Button variant="ghost" size="1" onClick={() => setIsSidebarOpen(false)}>
                <Cross1Icon />
              </Button>
            </Flex>
            {menuItems.map((item, index) => (
              <Button 
                key={index}
                variant="ghost"
                onClick={() => handleNavigate(item.path)}
                size="2"
                style={{ justifyContent: 'flex-start' }}
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