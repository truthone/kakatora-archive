import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flex, Button, Container, Heading, Dialog } from '@radix-ui/themes';
import { HamburgerMenuIcon, Cross1Icon } from '@radix-ui/react-icons';

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { text: '프로필', path: '/profile' },
    { text: '필모그래피', path: '/filmography' },
    { text: 'OTT 뭘 봐야할까?', path: '/ott-recommendation' },
    { text: '추천 컨텐츠', path: '/recommended' },
  ];

  return (
    <Container style={{margin: '0 20px'}}>
      <Flex justify="between" align="center" py="4">
        <Heading size="5" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>JU.CHIVE</Heading>
        <Flex gap="6" display={{ initial: 'none', md: 'flex' }}>
          {menuItems.map((item, index) => (
            <Button key={index} variant="ghost" as={Link} to={item.path} size="3">
              {item.text}
            </Button>
          ))}
        </Flex>
        <Flex gap="2">
          <Button variant="ghost" size="3" display={{ md: 'none' }} onClick={() => setIsSidebarOpen(true)}>
            <HamburgerMenuIcon />
          </Button>
        </Flex>
      </Flex>

      <Dialog.Root open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <Dialog.Content style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '250px', padding: '16px' }}>
          <Flex direction="column" gap="4">
            <Flex justify="between" align="center">
              <Heading size="4">메뉴</Heading>
              <Button variant="ghost" size="2" onClick={() => setIsSidebarOpen(false)}>
                <Cross1Icon />
              </Button>
            </Flex>
            {menuItems.map((item, index) => (
              <Button 
                key={index}
                variant="ghost"
                as={Link} 
                to={item.path}
                size="3"
                onClick={() => setIsSidebarOpen(false)}
                style={{ justifyContent: 'flex-start' }}
              >
                {item.text}
              </Button>
            ))}
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Container>
  );
}

export default Header;