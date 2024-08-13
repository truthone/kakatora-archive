import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Heading, Text, Button, Card, Badge, Container, Separator } from '@radix-ui/themes';
import { PlayIcon, PlusIcon, StarFilledIcon } from '@radix-ui/react-icons';
import moviesData from '../data/moviesData.json';
import MovieRow from './MovieRow';
import YouTubeRow from './YoutubeRow';
import Image from 'next/image';

function MovieDetail() {
  const playlistId = 'PLWeRTK7abiXgWIDw-fNcAp-UiPoXFeLPR';
  const { id } = useParams();
  const allMovies = [
    moviesData.featuredMovie,
    ...moviesData.trending,
    ...moviesData.tvSeries,
    ...moviesData.action
  ];
  const movie = allMovies.find(m => m.id === id) || moviesData.featuredMovie;

  return (
    <Container style={{margin: '20px'}}>
      <Box py="6">
        <Flex gap="6" direction={{ initial: 'column', md: 'row' }}>
          <Card style={{ width: '100%', maxWidth: '500px', alignSelf: 'center' }}>
            <Image 
              src={movie.poster} 
              alt={movie.title}
              style={{objectFit: 'cover'}}
              fill />
          </Card>
          <Box>
            <Heading size={{ initial: '6', md: '8' }} mb="2">{movie.title}</Heading>
            <Flex gap="2" mb="4" wrap="wrap">
              <Badge color="blue">{movie.year}</Badge>
              <Badge color="green">{movie.rating}</Badge>
              <Badge color="orange">{movie.duration}</Badge>
            </Flex>
            <Text as="p" size="3" mb="4">{movie.description}</Text>
            <Flex gap="4" mb="4" direction={{ initial: 'column', sm: 'row' }}>
              <Button size="3" variant="solid">
                <PlayIcon />
                재생
              </Button>
              <Button size="3" variant="soft">
                <PlusIcon />
                내 리스트에 추가
              </Button>
            </Flex>
            <Flex align="center" gap="2">
              <StarFilledIcon />
              <Text size="2">{movie.rating}/10</Text>
            </Flex>
            <Text as="p" size="2" mt="2">출연: {movie.cast?.join(', ')}</Text>
            <Text as="p" size="2">장르: {movie.genres?.join(', ')}</Text>
          </Box>
        </Flex>
      </Box>
      <Separator orientation="horizontal" size="4" />
      <MovieRow title="트렌딩 영화" movies={moviesData.trending} />
      <Separator orientation="horizontal" size="4" />
      <YouTubeRow movieTitle="다우렌의 결혼" playlistId={playlistId}/>
    </Container>
  );
}

export default MovieDetail;