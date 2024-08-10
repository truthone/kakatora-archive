'use client'
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Heading, Text, AspectRatio, Separator, Section } from '@radix-ui/themes';
import liveAloneDetailData from '../data/liveAloneDetailData.json'
import Image from 'next/image';
import EpisodeSection from './EpisodeSection';

function EpisodeDetail() {
  const { ep } = useParams();

  const data = liveAloneDetailData.flatMap(year => year.episode).find(episode => episode.ep == ep)

  console.log(data)

  if (!data) return <Box p="4">콘텐츠를 찾을 수 없습니다.</Box>;
  
  return (
    <Box className="filmo-detail" p="4" style={{ maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      <Flex direction="row" gap="4">
        <Box style={{ flexBasis: '30%', maxWidth: '200px' }}>
          <AspectRatio ratio={3 / 2}>
            <Image 
              src={encodeURI(data.imgUrl)} 
              alt={data.note} 
              style={{objectFit: 'cover'}}
              fill
            />
          </AspectRatio>
        </Box>
        
        <Box style={{ flexBasis: '60%' }}>
          <Heading size="6" mb="2">{data.ep}{data.note}</Heading>
          {data.date && <Text as="p" size="4" mb="2">{data.date}</Text>}
        </Box>
      </Flex>
      <EpisodeSection />
      <Separator size="4" my="4" />
    </Box>
  );
}

export default EpisodeDetail;