import React from 'react';
import { Box, Text } from '@radix-ui/themes';

function Footer() {
  return (
    <Box py="6" style={{ backgroundColor: '#000' }}>
      <Text size="2" align="center" color="gray">
        &copy; 2024 OTT Demo. All rights reserved.
      </Text>
    </Box>
  );
}

export default Footer;