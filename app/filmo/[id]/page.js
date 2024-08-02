'use client';

import React from 'react';
import FilmoDetail from '../../../components/FilmoDetail'

export default function FilmoDetailPage({ params }) {
  return <FilmoDetail id={params.id} />;
}