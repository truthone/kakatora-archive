import React from 'react';
import Hero from './Hero';
import moviesData from '../data/moviesData.json';
import filmoDataByYear from '../data/filmoDataByYear.json'
import { Container, Separator } from '@radix-ui/themes';
import FilmoSection from './FilmoSection';
import YouTubeRow from './YoutubeRow';
import FilmoByCategory from './FilmoByCategory';

function Home() {
  const playlistId = 'PLWeRTK7abiXgWIDw-fNcAp-UiPoXFeLPR';
  return (
    <Container>
      <Hero movie={moviesData.featuredMovie} />
      {/* <Flex>
        <Card style={{ width: '300px', flexShrink: 0 }}><TwitterEmbed  /></Card>
      </Flex> */}
      <YouTubeRow SectionTitle="다우렌의 결혼" playlistId={'PLWeRTK7abiXiV1ChOOtNqoZNDvmKELstF'}/>
      <YouTubeRow SectionTitle="재밌는거 몰아보기" playlistId={'PLWeRTK7abiXjPBf9GgjJ_ma67JlJ5ldfQ'}/>
      <YouTubeRow SectionTitle="드라마 몰아보기" playlistId={'PLWeRTK7abiXhLn7gnXxzPk2W5SppS5ZmC'}/>
      <Separator orientation="horizontal" size="4" />
      <FilmoByCategory />
    </Container>
  );
}

export default Home;