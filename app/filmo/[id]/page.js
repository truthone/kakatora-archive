'use client';

import React from 'react';
import FilmoDetail from '../../../components/FilmoDetail'

export default function FilmoDetailPage({ params }) {
  const { id } = params;
  return <FilmoDetail id={id} />;
}