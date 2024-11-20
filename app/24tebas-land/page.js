'use client';

import React from 'react';
import Image from 'next/image';
import { Container, Box } from '@radix-ui/themes';

export default function TebasLand({}) {
  return (
    <Container p="1">
      <Box width="auto" height="80vh" position="relative">
        <Image
          fill
          src={'/images/24tebas_poster.jpg'}
          alt={'테베랜드'}
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>
    </Container>
  );
}
