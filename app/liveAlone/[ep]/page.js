'use client'
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Heading, Text, AspectRatio, Separator, Section } from '@radix-ui/themes';
import liveAloneDetailData from '../../../data/liveAloneDetailData.json'
import Image from 'next/image';
import EpisodeSection from '../../../components/EpisodeSection'

export default function LiveAloneEpisodeDetailPage({ params }) {
  const { ep } = params;

  const data = liveAloneDetailData.flatMap(year => year.episode).find(episode => episode.ep == ep)

  if (!data) return <Box p="4">콘텐츠를 찾을 수 없습니다.</Box>;
  
  return (
    <Box className="filmo-detail" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Flex direction={{initial: 'column', xs: 'row'}} gap="4">
        <Box style={{ flex: '2 1 50%', maxWidth: '600px', minWidth: '200px' }}>
          <AspectRatio ratio={3 / 2}>
            <Image 
              src={data.imgUrl} 
              alt={data.note} 
              style={{objectFit: 'cover'}}
              fill
            />
          </AspectRatio>
        </Box>
        
        <Box style={{ flex: '1 2 40%', minWidth: '200px' }}>
          <Heading size="6" mb="2">{data.ep}{data.note}</Heading>
          {data.date && <Text as="p" size="4" mb="2">{data.date}</Text>}
        </Box>
      </Flex>
      <EpisodeSection year={data.year} episodesData={data} />
    </Box>
  );
}