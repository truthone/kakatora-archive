import React from 'react';
import Hero from '../components/Hero'
import moviesData from '../data/moviesData.json';
import { Container, Separator } from '@radix-ui/themes';
import YouTubeRow from '../components/YoutubeRow';
import FilmoByCategory from '../components/FilmoByCategory';
import { getYouTubeVideos } from '../lib/getYouTubeVideos';

export default async function Home() {
  const playlistIds = [
    'PLWeRTK7abiXiV1ChOOtNqoZNDvmKELstF',
    'PLWeRTK7abiXjPBf9GgjJ_ma67JlJ5ldfQ',
    'PLWeRTK7abiXhLn7gnXxzPk2W5SppS5ZmC'
  ];

  const youtubeDataPromises = playlistIds.map(id => getYouTubeVideos(id));
  const youtubeData = await Promise.all(youtubeDataPromises);

  return (
    <>
      <Hero movie={moviesData.featuredMovie} />
      <Container mx="3">
        <YouTubeRow SectionTitle="다우렌의 결혼" videos={youtubeData[0]} />
        <YouTubeRow SectionTitle="재밌는거 몰아보기" videos={youtubeData[1]} />
        <YouTubeRow SectionTitle="드라마 몰아보기" videos={youtubeData[2]} />
        <Separator orientation="horizontal" size="4" />
        <FilmoByCategory />
      </Container>
    </>
  );
}