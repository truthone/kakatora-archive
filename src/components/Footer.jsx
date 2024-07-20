import React from 'react';
import { Box, Text, Flex, Container } from '@radix-ui/themes';

function Footer() {
  return (
    <Box py="6" style={{ backgroundColor: 'var(--color-panel-solid)' }}>
      <Container>
        <Flex direction="column" align="center" gap="2">
          <Text size="2" color="gray">© 2024 HBD ju-seung</Text>
          <Flex gap="4" wrap="wrap" justify="center">
            <Text as="a" href="#" size="1" color="gray"></Text>
            <Text as="a" href="#" size="1" color="gray"></Text>
            <Text as="a" href="#" size="1" color="gray"></Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Footer;
