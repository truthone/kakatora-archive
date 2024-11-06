'use client';
import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  AspectRatio,
  Container,
  Section,
  Separator,
} from '@radix-ui/themes';
import liveAloneDetailData from '../../../data/liveAloneDetailData.json';
import Image from 'next/image';
import EpisodeSection from '../../../components/EpisodeSection';
import ImageFallback from '../../../components/ImageFallback';
import Carousel from '../../../components/Carousel';
import YouTubeRow from '../../../components/YoutubeRow';

export default function LiveAloneEpisodeDetailPage({ params }) {
  const { ep } = params;
  const [imageError, setImageError] = useState(false);

  // 연도별 에피소드 데이터 묶기
  const data = liveAloneDetailData
    .flatMap((year) => year.episode)
    .find((episode) => episode.ep == ep);

  if (!data) return <Box p="4">콘텐츠를 찾을 수 없습니다.</Box>;

  return (
    <Container p="4" className="filmo-detail">
      <Section size="1">
        <Flex direction={{ initial: 'column', xs: 'row' }} gap="4">
          <Box
            style={{
              flex: '2 1 50%',
              maxWidth: '600px',
              minWidth: '200px',
              maxHeight: '400px',
            }}
          >
            <AspectRatio ratio={3 / 2}>
              {!imageError ? (
                <Image
                  src={data.imgUrl}
                  alt={data.note}
                  style={{ objectFit: 'cover' }}
                  fill
                  sizes={'100vw'}
                  onError={() => setImageError(true)}
                />
              ) : (
                <ImageFallback />
              )}
            </AspectRatio>
          </Box>
          <Box style={{ flex: '1 2 40%', minWidth: '200px' }}>
            <Heading size="6" mb="2">
              {data.title} {data.ep}회
            </Heading>
            <Heading size="4" mb="2">
              {data.note}
            </Heading>
            <Text as="p" size="4" mb="2">
              {data.year}년 {data.date}
            </Text>
          </Box>
        </Flex>
      </Section>
      <Separator orientation="horizontal" size="4" />
      <Section>
        <Heading size="6" mb="4">
          나혼산 코어
        </Heading>
        <Carousel data={data} prefix={`/images/tv-liveAlone/${data.ep}/`} />
      </Section>
      <Separator orientation="horizontal" size="4" />
      <YouTubeRow SectionTitle={'관련 영상'} playlistId={data.playlistId} />
      <Separator orientation="horizontal" size="4" />
      <EpisodeSection year={data.year} episodesData={data} />
    </Container>
  );
}
