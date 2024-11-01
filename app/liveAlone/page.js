'use client'
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Heading, Text, AspectRatio, Separator, Section, Container } from '@radix-ui/themes';
import liveAloneDetailData from '../../data/liveAloneDetailData.json'
import EpisodeRow from '../../components/EpisodeRow';
import FilmoDetail from '../../components/FilmoDetail';
import useStickyHeader from '../../hooks/useStickyHeader';
import StickyHead from '../../components/StickyHead';

export default function LiveAloneEpisodeDetailPage() {
  const DETAIL_ID = 'tv_2024_2';
  const data = liveAloneDetailData.flatMap(year => year.episode);
  const [headerRef, isSticky] = useStickyHeader();

  if (!data) return <Box p="4">콘텐츠를 찾을 수 없습니다.</Box>;
  
  return (
    <Container>
      <FilmoDetail id={DETAIL_ID} />
      <Section p={{ initial: '4', xs: '8' }}>
        {
          liveAloneDetailData?.map((yearData, index) => (
            
            <Box key={index} mt="6">
              <StickyHead ref={headerRef} stickyState={isSticky}>{yearData?.year}</StickyHead>
              { yearData?.episode && yearData.episode.length > 0 && (
                <EpisodeRow title="" contents={yearData?.episode} />
              )}
            </Box>
        ))}
      </Section>
    </Container>
  );
}