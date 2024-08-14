'use client'
import React from 'react';
import { Box, Flex, Heading } from '@radix-ui/themes';
import liveAloneDetailData from '../../../data/liveAloneDetailData.json'
import EpisodeSection from '../../../components/EpisodeSection'

export default function LiveAloneAllCapturesPage(){
  const data = liveAloneDetailData.flatMap(year => year.episode);
  console.log(data)

  if (!data) return <Box p="4">콘텐츠를 찾을 수 없습니다.</Box>;
  
  return (
    <Box>
      <Heading as="h1" m="6">나혼산 짤 모음</Heading>
      <Box style={{maxWidth: '1200px', margin: '0 auto'}}>
        <EpisodeSection episodesData={liveAloneDetailData}/>
      </Box>
    </Box>
  );
}