import React from 'react';
import { Flex, Box, Text } from '@radix-ui/themes';

function Header() {
  return (
    <Flex py="4" px="6" align="center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <Box mr="4">
        <img src="/logo.png" alt="OTT Logo" style={{ height: '30px' }} />
      </Box>
      <Flex gap="4">
        <Text as="a" href="#" size="2" weight="bold">홈</Text>
        <Text as="a" href="#" size="2">TV 프로그램</Text>
        <Text as="a" href="#" size="2">영화</Text>
        <Text as="a" href="#" size="2">최신 콘텐츠</Text>
      </Flex>
    </Flex>
  );
}

export default Header;