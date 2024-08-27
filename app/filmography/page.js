import React from 'react';
import filmoDataByYear from '../../data/filmoDataByYear.json'
import FilmoSection from '../../components/FilmoSection'
import { Container } from '@radix-ui/themes';

export default function FilmographyPage() {
  return (
    <Container p="4">
      <FilmoSection data={filmoDataByYear.filmo_data_by_year} />
    </Container>
  )
}