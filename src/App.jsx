import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import Header from './components/Header';
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Theme appearance="dark" accentColor="crimson" radius="large" p={{ sm: '6', lg: '9' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
        <Footer />
      </Theme>
    </Router>
  );
}

export default App;