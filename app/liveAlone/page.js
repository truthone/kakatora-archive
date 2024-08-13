'use client'
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Heading, Text, AspectRatio, Separator, Section } from '@radix-ui/themes';
import liveAloneDetailData from '../../data/liveAloneDetailData.json'
import EpisodeRow from '../../components/EpisodeRow';
import FilmoDetail from '../../components/FilmoDetail';

export default function LiveAloneEpisodeDetailPage() {
  const DETAIL_ID = 'tv_2024_2';
  const data = liveAloneDetailData.flatMap(year => year.episode);

  if (!data) return <Box p="4">콘텐츠를 찾을 수 없습니다.</Box>;
  
  return (
    <Box>
      <FilmoDetail id={DETAIL_ID} />
      <Box style={{maxWidth: '1200px', margin: '0 auto'}}>
        {
          liveAloneDetailData?.map((yearData, index) => (
            <Box key={index} mt="6">
              <Heading size="6" p="4" mb="4">{yearData?.year}</Heading>
              {yearData?.episode && yearData.episode.length > 0 && (
                <EpisodeRow title="" contents={yearData?.episode} />
              )}
            </Box>
        ))}
      </Box>
    </Box>
  );
}