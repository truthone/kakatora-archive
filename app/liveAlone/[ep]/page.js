'use client'
import React, { useState } from 'react';
import { Box, Flex, Heading, Text, AspectRatio, Container, Section } from '@radix-ui/themes';
import liveAloneDetailData from '../../../data/liveAloneDetailData.json'
import Image from 'next/image';
import EpisodeSection from '../../../components/EpisodeSection'

export default function LiveAloneEpisodeDetailPage({ params }) {
  const { ep } = params;
  const [imageError, setImageError] = useState(false);

  const data = liveAloneDetailData.flatMap(year => year.episode).find(episode => episode.ep == ep)

  if (!data) return <Box p="4">콘텐츠를 찾을 수 없습니다.</Box>;

  return (
    <Container p="4" className="filmo-detail">
      <Section size="1">
        <Flex direction={{initial: 'column', xs: 'row'}} gap="4">
          <Box style={{ flex: '2 1 50%', maxWidth: '600px', minWidth: '200px' }}>
            <AspectRatio ratio={3 / 2}>
              {!imageError ? (
                <Image 
                  src={data.imgUrl} 
                  alt={data.note} 
                  style={{objectFit: 'cover'}}
                  fill
                  onError={() => setImageError(true)}
                />
              ) : (
                <Flex justify="center" align="center" style={{width: '100%', height: '100%', background: 'var(--gray-3)'}}>
                  이미지를 추가할 예정이에요.
                </Flex>
              )}
            </AspectRatio>
          </Box>
          <Box style={{ flex: '1 2 40%', minWidth: '200px' }}>
            <Heading size="6" mb="2">{data.title} {data.ep}회</Heading>
            <Heading size="4" mb="2">{data.note}</Heading>
            <Text as="p" size="4" mb="2">{data.year}년 {data.date}</Text>
          </Box>
        </Flex>
      </Section>
      <EpisodeSection year={data.year} episodesData={data} />
    </Container>
  );
}