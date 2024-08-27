'use client'
import React from 'react';
import { Box, Section, Heading, Container } from '@radix-ui/themes';
import liveAloneDetailData from '../../../data/liveAloneDetailData.json'
import EpisodeSection from '../../../components/EpisodeSection'

export default function LiveAloneAllCapturesPage(){
  const data = liveAloneDetailData.flatMap(year => year.episode);

  if (!data) return <Box p="4">콘텐츠를 찾을 수 없습니다.</Box>;
  
  return (
    <Container p="4">
      <Section size="1">
        <Heading as="h1" m="6">나혼산 짤 모음</Heading>
          <EpisodeSection episodesData={liveAloneDetailData}/>
      </Section>
    </Container>
  );
}