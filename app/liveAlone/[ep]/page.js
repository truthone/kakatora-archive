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
import CoreCarouselSection from '../../../components/CoreCarouselSection';
import YouTubeRow from '../../../components/YoutubeRow';
import FallbackComponent from '../../../components/FallbackComponent';
import useFetchEpisodeImages  from '../../../hooks/useFetchEpisodeImages';

export default function LiveAloneEpisodeDetailPage({ params }) {
  const { ep } = params;
  const { images, mainImage, carouselImages, error, loading } = useFetchEpisodeImages(ep);
  const [imageError, setImageError] = useState(false);
  console.log(carouselImages)
  // 연도별 에피소드 데이터 묶기
  const data = liveAloneDetailData
    .flatMap((year) => year.episode)
    .find((episode) => episode.ep == ep);

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
              {!imageError && mainImage ? (
                <Image
                  src={mainImage.url}
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

      {carouselImages.length >= 1 ? <CoreCarouselSection  title={'나혼산 코어'} carouselImages={carouselImages}/> : null}
      <Separator orientation="horizontal" size="4" />
      <YouTubeRow SectionTitle={'관련 영상'} playlistId={data.playlistId} />
      {images ? <EpisodeSection images={images}/> : null}
    </Container>
  );
}
