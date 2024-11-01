'use client';

import React from 'react';
import FilmoFilterByOTT from '../../components/FilmoFilterByOTT'
import { Container } from '@radix-ui/themes';

export default function FilmoByOTTPage({ }) {
  return (
    <Container p="1">
      <FilmoFilterByOTT />
    </Container>
  )
}