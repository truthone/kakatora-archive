import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import Header from './components/Header';
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import Footer from './components/Footer';
import ActorProfile from './components/ActorProfile';
import TasteChartGenerator from './components/TasteChartGenerator';
import SpecialFeature from './components/SpecialFeature'
import FilmoDetail from './components/FilmoDetail';
import FilmoFilter from './components/FilmoFilter';

function App() {
  return (
    <Router>
      <Theme appearance="dark" accentColor="crimson" radius="large" p={{ sm: '6', lg: '9' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/filmo/:id" element={<FilmoDetail />} />
          <Route path="/profile" element={<ActorProfile />} />
          <Route path="/taste-chart" element={<TasteChartGenerator />} />
          <Route path="/ott-recommendation" element={<FilmoFilter />} />
          <Route path="/recommended" element={<SpecialFeature />} />
        </Routes>
        <Footer />
      </Theme>
    </Router>
  );
}

export default App;