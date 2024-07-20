import React from 'react';
import Hero from './Hero';
import moviesData from '../data/moviesData.json';
import filmoDataByYear from '../data/filmoDataByYear.json'
import { Container } from '@radix-ui/themes';
import FilmoSection from './FilmoSection';

function FilmoAll() {
  return (
    <Container>
      <FilmoSection data={filmoDataByYear.filmo_data_by_year} />
    </Container>
  );
}

export default FilmoAll;