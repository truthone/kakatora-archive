'use client';
import { Box } from '@radix-ui/themes'
import React from 'react';
import FilmoDetail from '../../../components/FilmoDetail'

export default function FilmoDetailPage({ params }) {
  const { id } = params;
  return (
    <>
      <FilmoDetail id={id} />
      <Box style={{minHeight: '80vh'}}></Box>
    </>
  )
}