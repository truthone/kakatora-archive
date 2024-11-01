'use client';
import { Box, Container } from '@radix-ui/themes'
import React from 'react';
import FilmoDetail from '../../../components/FilmoDetail'

export default function FilmoDetailPage({ params }) {
  const { id } = params;
  return (
    <Container>
      <FilmoDetail id={id} />
    </Container>
  )
}