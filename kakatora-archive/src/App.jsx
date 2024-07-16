import React from 'react';
import { Theme } from '@radix-ui/themes';
import Header from './components/Header';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import Footer from './components/Footer';
import moviesData from './data/moviesData.json'
import '@radix-ui/themes/styles.css';

function App() {
  return (
    <Theme appearance="dark" accentColor="red">
      <Header />
      <Hero movie={moviesData.featuredMovie} />
      <MovieRow title="트렌딩 영화" movies={moviesData.trending} />
      <MovieRow title="인기 TV 시리즈" movies={moviesData.tvSeries} />
      <MovieRow title="액션 영화" movies={moviesData.action} />
      <Footer />
    </Theme>
  );
}

export default App;