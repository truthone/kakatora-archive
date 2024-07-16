import React from 'react';
import { Box, Heading, Flex, AspectRatio, Card, Text } from '@radix-ui/themes';

function MovieRow({ title, movies }) {
  return (
    <Box my="6">
      <Heading size="6" mb="4" ml="6">{title}</Heading>
      <Flex gap="3" px="6" style={{ overflowX: 'auto' }}>
        {movies.map((movie) => (
          <Card key={movie.id} style={{ minWidth: '150px', maxWidth: '200px', height: 'auto', flexShrink: 0 }}>
            <AspectRatio style={{width: '100%'}} ratio={2/3}>
              <img 
                src={movie.poster} 
                alt={movie.title} 
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </AspectRatio>
            <Box p='3'><Text>{movie.title}</Text></Box>
          </Card>
        ))}
      </Flex>
    </Box>
  );
}

export default MovieRow;