import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button } from '@radix-ui/themes';
import Skeleton from './Skeleton';

function Hero({ movie }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = movie.backdrop;
  }, [movie.backdrop]);

  return (
    <Box position="relative" height="80vh">
      {!imageLoaded ? (
        <Skeleton width="100%" height="100%" />
      ) : (
        <img 
          src={movie.backdrop} 
          alt={movie.title} 
          style={{ objectFit: 'cover', width: '100%', height: '100%' }} 
        />
      )}
      <Box 
        position="absolute" 
        bottom="100px" 
        left="50px" 
        maxWidth="500px"
      >
        <Heading size="8" mb="4">{movie.title}</Heading>
        <Text size="4" mb="4">{movie.description}</Text>
        <Button size="3">재생</Button>
      </Box>
    </Box>
  );
}

export default Hero;