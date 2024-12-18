'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Container,
  Skeleton,
} from '@radix-ui/themes';
import {
  HeartFilledIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';
import heroImg from '../img/hero.jpg';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimationBox = styled(Box)`
  animation: ${fadeInUp} 1s ease forwards;
  animation-delay: 0.5s; // Optional delay for a staggered effect
  opacity: 0; // Start hidden, animation will bring it in
`;

const AnimationBox2 = styled(Box)`
  animation: ${fadeInUp} 1s ease forwards;
  animation-delay: 1s; // Optional delay for a staggered effect
  opacity: 0; // Start hidden, animation will bring it in
`;

function Hero({ movie }) {
  const router = useRouter();
  const handleDetailClick = () => {
    router.push(`/movie/${movie.id}`);
  };

  const handleInstagramClick = () => {
    window.open(
      'https://www.instagram.com/kakatora/',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleCafeClick = () => {
    window.open(
      'https://cafe.daum.net/lee890720?q=%EC%9D%B4%EC%A3%BC%EC%8A%B9%EC%8A%B9%EC%9E%A5%EA%B5%AC',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleTwitterClick = () => {
    window.open('https://x.com/kakatorafan', '_blank', 'noopener,noreferrer');
  };

  return (
    <Box
      position="relative"
      width="100%"
      height={{ initial: '70vh', md: '60vh' }}
      minHeight="500px"
    >
      <Skeleton style={{ borderRadius: '0' }}>
        <Image
          src={heroImg}
          alt={movie.title}
          style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
          fill
          sizes={'(max-width: 600px) 150vw,120vw'}
          priority={true}
          quality={100}
        />
      </Skeleton>
      <Box
        position="absolute"
        bottom={{ initial: '10px', md: '70px' }}
        left={{ initial: '20px', md: '50px' }}
        right={{ initial: '20px', md: 'auto' }}
        maxWidth={{ initial: 'auto', md: '500px' }}
        style={{ zIndex: '1' }}
      >
        <AnimationBox>
          <Heading size={{ initial: '7', md: '9' }} mb="1">
            {movie.title}
          </Heading>
        </AnimationBox>
        <AnimationBox2>
          <Text size={{ initial: '3', md: '4' }}>{movie.description}</Text>
        </AnimationBox2>
        <Flex gap="2" direction="row" wrap="wrap" mt="5">
          <Button
            size={{ initial: '2', xs: '3' }}
            variant="solid"
            style={{ cursor: 'pointer' }}
            onClick={handleInstagramClick}
          >
            <InstagramLogoIcon />
            인스타그램
          </Button>
          <Button
            size={{ initial: '2', xs: '3' }}
            variant="solid"
            style={{ cursor: 'pointer' }}
            onClick={handleCafeClick}
          >
            <HeartFilledIcon />
            공식 카페
          </Button>
          <Button
            size={{ initial: '2', xs: '3' }}
            variant="solid"
            style={{ cursor: 'pointer' }}
            onClick={handleTwitterClick}
          >
            <TwitterLogoIcon />
            공식 카페 트위터
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default Hero;
