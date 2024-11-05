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
          src={`https://i.namu.wiki/i/UtlPpyEnoH59LCwCcPgmi4VoHuMBXDOM3EJDnoH5xLGS_DQwyf3HTmBLRzMbKwPY_bTY-ynLe_hKZZzqTCo5hQ.webp`}
          alt={'테베랜드'}
          style={{
            objectFit: 'contain',
          }}
        />
      </Box>
    </Container>
  );
}
