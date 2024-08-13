import React from 'react';
import { Box, Heading, Text, AspectRatio, Flex, Card, Container } from '@radix-ui/themes';
import { specialFeatureData } from './dummyData';
import moviesData from '../data/moviesData.json'
import ArticleRow from '../components/ArticleRow'
import data from '../data/moviesData.json'
import LinkPreview from 'react-link-preview'
import ArticleCard from './ArticleCard';
import Image from 'next/image';

function SpecialFeature() {
  const article = moviesData;

  const fallbackImage = '../img/hero.jpg'; // 기본 이미지 경로
  return (
    <Container>
      <Box p="4">
        <Heading size="8" mb="4">{moviesData.featuredMovie.title}</Heading>

        <AspectRatio ratio={16/9}>
          <Image 
            src={specialFeatureData.image} 
            alt={specialFeatureData.title} 
            fill
            style={{objectFit: 'cover'}}
          />
        </AspectRatio>

        <Text size="5" mt="4">{specialFeatureData.intro}</Text>

        <Box my="6">
          <Text>{specialFeatureData.content}</Text>
        </Box>

        <Box>
          <Heading size="6" mb="2">관련 작품</Heading>
          <ArticleRow article={data}/>
          <Card size="2" style={{ marginBottom: '1rem' }}>
          <ArticleCard />
    </Card>
        </Box>
      </Box>
    </Container>
  );
}

export default SpecialFeature;