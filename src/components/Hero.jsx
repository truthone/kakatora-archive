import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Button, Flex, Container, Skeleton } from '@radix-ui/themes';
import { PlayIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import heroImg from '../img/hero.jpg'

function Hero({ movie }) {
  const navigate = useNavigate();
  const handleDetailClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Box position="relative" height={{ initial: '70vh' }}>
        <img 
          src={heroImg} 
          alt={movie.title} 
          style={{ objectFit: 'cover', width: '100%', height: '100%' }} 
        />
      <Container>
        <Box 
          position="absolute" 
          bottom={{ initial: '10px', md: '70px' }}
          left={{ initial: '20px', md: '50px' }}
          right={{ initial: '20px', md: 'auto' }}
          maxWidth={{ initial: 'auto', md: '500px' }}
        >
          <Heading size={{ initial: '7', md: '9' }} mb="2">{movie.title}</Heading>
          <Text size={{ initial: '3', md: '4' }} mb="2">{movie.description}</Text>
          <Flex gap="4" >
            <Button size={{ initial: '2', md: '3' }} variant="solid">
              <PlayIcon />
              재생
            </Button>
            <Button size={{ initial: '2', md: '3' }} variant="solid" onClick={handleDetailClick}>
              <InfoCircledIcon />
              상세 정보
            </Button>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}

export default Hero;