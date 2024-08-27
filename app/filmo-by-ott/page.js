'use client';

import React from 'react';
import FilmoFilter from '../../components/FilmoFilter'
import { Container } from '@radix-ui/themes';

export default function FilmoByOTTPage({ }) {
  return (
    <Container p="4">
      <FilmoFilter />
    </Container>
  )
}