import React from 'react';
import { Flex, Box, Text, Button, Container } from '@radix-ui/themes';
import { PersonIcon, MagnifyingGlassIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';

function Header() {
  return (
    <Container style={{margin: '0 20px'}}>
      <Flex justify="between" align="center" py="4">
        <Text size="5" weight="bold">JU.CHIVE</Text>
        <Flex gap="6" display={{ initial: 'none', md: 'flex' }}>
          <Text as="a" href="#" size="4">프로필</Text>
          <Text as="a" href="#" size="4">필모그래피</Text>
          <Text as="a" href="#" size="4">OTT 뭘 봐야할까?</Text>
          <Text as="a" href="#" size="4">추천 컨텐츠</Text>
        </Flex>
        <Flex gap="2">
          <Button variant="ghost" size="3" display={{ md: 'none' }}>
            <HamburgerMenuIcon />
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}

export default Header;