'use client';
import React from 'react';
import {
  Box,
  Flex,
  Section,
  Container,
} from '@radix-ui/themes';
import liveAloneDetailData from '../../data/liveAloneDetailData.json';
import EpisodeRow from '../../components/EpisodeRow';
import FilmoDetail from '../../components/FilmoDetail';
import useStickyHeader from '../../hooks/useStickyHeader';
import StickyHead from '../../components/StickyHead';
import FallbackComponent from '../../components/FallbackComponent';
import useFetchEpisodeImages  from '../../hooks/useFetchEpisodeImages';

export default function LiveAloneEpisodeDetailPage() {
  const DETAIL_ID = 'tv_2024_2';
  const data = liveAloneDetailData.flatMap((year) => year.episode);
  const [headerRef, isSticky] = useStickyHeader();
  const { mainImage } = useFetchEpisodeImages({isMain: 'true'});
  
  if (!data)
    return (
      <Flex p="4" justify="center" align="center" width="auto" height="90vh">
        <FallbackComponent
          message={'콘텐츠를 찾을 수 없습니다.'}
          toggleMark={true}
        />
      </Flex>
    );

  return (
    <Container>
      <FilmoDetail id={DETAIL_ID} />
      <Section p={{ initial: '5', xs: '8' }}>
        {liveAloneDetailData?.map((yearData, index) => (
          <Box key={index} mt="6">
            <StickyHead ref={headerRef} stickyState={isSticky}>
              {yearData?.year}
            </StickyHead>
            {yearData?.episode && yearData.episode.length > 0 && (
              <EpisodeRow title="" contents={yearData?.episode} mainImages = {mainImage} />
            )}
          </Box>
        ))}
      </Section>
    </Container>
  );
}
