import React from 'react';
import Hero from '../components/Hero'
import moviesData from '../data/moviesData.json';
import { Container, Separator, Section } from '@radix-ui/themes';
import YouTubeRow from '../components/YoutubeRow';
import FilmoByCategory from '../components/FilmoByCategory';

export default async function Home() {
  const playlistIds = [
    'PLS1vtSLNPVeD1OltHrPArmrjRdKWHxMQn',
    'PLWeRTK7abiXjZCfS12Qrn3ZMT6aVvnLbE',
    'PLWeRTK7abiXhLn7gnXxzPk2W5SppS5ZmC'
  ];
  return (
    <>
      <Hero movie={moviesData.featuredMovie} />
      <Container ml="3">
        <Section size="1">
          <YouTubeRow sectionTitle="뽑티슈-이주승편" playlistId={playlistIds[0]} />
          <YouTubeRow sectionTitle="코코 🐕 와 주승" playlistId={playlistIds[1]} />
          <YouTubeRow sectionTitle="드라마 몰아보기" playlistId={playlistIds[2]} />
        </Section>
        <Separator orientation="horizontal" size="4" />
        <FilmoByCategory />
      </Container>
    </>
  );
}