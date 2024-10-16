import React from 'react';
import { Box, Text, Flex, Section } from '@radix-ui/themes';

function Footer() {
  return (
    <Section style={{ backgroundColor: 'var(--color-panel-solid)' }}>
      <Flex direction="column" align="center" gap="2">
        <Text size="2" color="gray">
          &copy; 2024 HBD ju-seung
        </Text>
        <Flex gap="4" wrap="wrap" justify="center">
          <Text as="a" href="#" size="1" color="gray"></Text>
          <Text as="a" href="#" size="1" color="gray"></Text>
          <Text as="a" href="#" size="1" color="gray"></Text>
        </Flex>
      </Flex>
    </Section>
  );
}

export default Footer;
