import React from 'react';
import Hero from './Hero';
import MovieRow from './MovieRow';
import moviesData from '../data/moviesData.json';
import { Container, Separator } from '@radix-ui/themes';

function Home() {
  return (
    <Container>
      <Hero movie={moviesData.featuredMovie} />
      <MovieRow title="트렌딩 영화" movies={moviesData.trending} />
      <MovieRow title="인기 TV 시리즈" movies={moviesData.tvSeries} />
      <MovieRow title="액션 영화" movies={moviesData.action} />
    </Container>
  );
}

export default Home;