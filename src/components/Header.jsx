import React from 'react';
import { Flex, Box, Text, Button, Container } from '@radix-ui/themes';
import { PersonIcon, MagnifyingGlassIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';

function Header() {
  return (
    <Container style={{margin: '0 20px'}}>
      <Flex justify="between" align="center" py="4">
        <Text size="5" weight="bold">OTT Logo</Text>
        <Flex gap="6" display={{ initial: 'none', md: 'flex' }}>
          <Text as="a" href="#" size="2">홈</Text>
          <Text as="a" href="#" size="2">TV 프로그램</Text>
          <Text as="a" href="#" size="2">영화</Text>
          <Text as="a" href="#" size="2">최신 콘텐츠</Text>
        </Flex>
        <Flex gap="2">
          <Button variant="ghost" size="2">
            <MagnifyingGlassIcon />
          </Button>
          <Button variant="ghost" size="2" display={{ initial: 'none', md: 'flex' }}>
            <PersonIcon />
          </Button>
          <Button variant="ghost" size="2" display={{ md: 'none' }}>
            <HamburgerMenuIcon />
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}

export default Header;