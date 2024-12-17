'use client';
import React, { useMemo } from 'react';
import { Flex, Section, Heading, Container } from '@radix-ui/themes';
import EpisodeSection from '../../../components/EpisodeSection';
import FallbackComponent from '../../../components/FallbackComponent';
import useFetchEpisodeImages from '../../../hooks/useFetchEpisodeImages';
import ImageFallback from '../../../components/ImageFallback';
import ImageWithFallback from '../../../components/ImageWithFallback';

export default function LiveAloneAllCapturesPage() {
  const { images, error, loading, fetchMore, hasMore } = useFetchEpisodeImages({ limit: 8, shuffle: true });

  if (error)
    return (
      <Flex p="4" justify="center" align="center" width="auto" height="90vh">
        <FallbackComponent
          message={'이미지를 준비중이에요.'}
          toggleMark={true}
        />
      </Flex>
    );

      console.log(`hasMore ${hasMore}`)
  return (
    <Container p="4">
      <Section size="1">
        <ImageWithFallback />
        <Heading as="h1" m="2">
          나혼산 짤 모음 🔀
        </Heading>
        {loading ? <ImageFallback /> : <EpisodeSection images={images} loading={loading} fetchMore={fetchMore} hasMore={hasMore} />}
      </Section>
    </Container>
  );
}
