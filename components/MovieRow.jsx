import React from 'react';
import { Box, Heading, Flex, AspectRatio, Card, Text } from '@radix-ui/themes';
import Image from 'next/image';

function MovieRow({ title, movies }) {
  return (
    <Box my="6">
      <Heading size="6" mb="4" ml="6">{title}</Heading>
      <Flex gap="3" px="6" style={{ overflowX: 'auto' }}>
        {movies.map((movie) => (
          <Card key={movie.id} style={{ width: '180px', flexShrink: 0 }}>
            <AspectRatio ratio={2/3} style={{padding: '0'}}>
              <Image 
                src={movie.poster} 
                alt={movie.title} 
                style={{ 
                  borderTopLeftRadius: 'var(--radius-2)',
                  borderTopRightRadius: 'var(--radius-2)',
                  objectFit: 'cover'
                }}
                fill
              />
            </AspectRatio>
            <Box p='2'>
              <Text size="1" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {movie.title}
              </Text>
            </Box>
          </Card>
        ))}
      </Flex>
    </Box>
  );
}

export default MovieRow;