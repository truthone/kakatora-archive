import React, { useState } from 'react';
import { Box, Heading, Flex } from '@radix-ui/themes';
import Skeleton from './Skeleton';

function MovieItem({ movie }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Box flexShrink="0" width="200px">
      {!imageLoaded && <Skeleton width="100%" height="300px" />}
      <img 
        src={movie.poster} 
        alt={movie.title} 
        style={{ 
          objectFit: 'cover', 
          width: '100%', 
          aspectRatio: '2/3',
          cursor: 'pointer',
          transition: 'transform 0.3s',
          display: imageLoaded ? 'block' : 'none',
        }}
        onLoad={() => setImageLoaded(true)}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      />
    </Box>
  );
}

function MovieRow({ title, movies }) {
  return (
    <Box my="6">
      <Heading size="6" mb="4" ml="6">{title}</Heading>
      <Flex gap="3" px="6" style={{ overflowX: 'auto' }}>
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </Flex>
    </Box>
  );
}

export default MovieRow;