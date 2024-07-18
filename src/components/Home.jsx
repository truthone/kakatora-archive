import React from 'react';
import Hero from './Hero';
import moviesData from '../data/moviesData.json';
import filmoData from '../data/filmoData.json'
import filmoDataByYear from '../data/filmoDataByYear.json'
import { Container, Separator, Flex, Card } from '@radix-ui/themes';
import FilmoSection from './FilmoSection';
import TwitterEmbed from './TwitterEmbed';

function Home() {
  return (
    <Container>
      <Hero movie={moviesData.featuredMovie} />
      <Flex>
        <Card style={{ width: '300px', flexShrink: 0 }}><TwitterEmbed  /></Card>
      </Flex>
      <Separator orientation="horizontal" size="4" />
      <FilmoSection data={filmoDataByYear.filmo_data_by_year} />
    </Container>
  );
}

export default Home;