'use client';
import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Text,
  AspectRatio,
  Separator,
  Section,
} from '@radix-ui/themes';
import liveAloneDetailData from '../data/liveAloneDetailData.json';
import Image from 'next/image';
import ImageWithFallback from './ImageWithFallback';
import EpisodeSection from './EpisodeSection';
import FallbackComponent from '../components/FallbackComponent'

export default function EpisodeDetail() {
  const { ep } = useParams();

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
    <Box
      className="filmo-detail"
      p="4"
      style={{ maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}
    >
      <Flex direction="row" gap="4">
        <Box style={{ flexBasis: '30%', maxWidth: '200px' }}>
          <AspectRatio ratio={3 / 2}>
            <ImageWithFallback
              src={data.imgUrl}
              alt={data.note}
              style={{ objectFit: 'cover' }}
              sizes={'100vw'}
              fill
              priority
            />
          </AspectRatio>
        </Box>

        <Box style={{ flexBasis: '60%' }}>
          <Heading size="6" mb="2">
            {data.ep}회 {data.note}
          </Heading>
          {data.date && (
            <Text as="p" size="4" mb="2">
              {data.date}
            </Text>
          )}
        </Box>
      </Flex>
      <EpisodeSection />
      <Separator size="4" my="4" />
    </Box>
  );
}
