import React from 'react';
import Hero from './Hero';
import moviesData from '../data/moviesData.json';
import filmoDataByYear from '../data/filmoDataByYear.json'
import { Container, Separator } from '@radix-ui/themes';
import FilmoSection from './FilmoSection';

function Home() {
  return (
    <Container>
      <Hero movie={moviesData.featuredMovie} />
      {/* <Flex>
        <Card style={{ width: '300px', flexShrink: 0 }}><TwitterEmbed  /></Card>
      </Flex> */}
      {/* <Separator orientation="horizontal" size="4" /> */}
      <FilmoSection data={filmoDataByYear.filmo_data_by_year} />
    </Container>
  );
}

export default Home;