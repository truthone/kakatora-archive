'use client';
import React, { useMemo } from 'react';
import {
  Flex,
  Section,
  Heading,
  Container,
  Box,
  IconButton,
  Callout,
} from '@radix-ui/themes';
import EpisodeSection from '../../../components/EpisodeSection';
import FallbackComponent from '../../../components/FallbackComponent';
import useFetchEpisodeImages from '../../../hooks/useFetchEpisodeImages';
import ImageFallback from '../../../components/ImageFallback';
import ImageWithFallback from '../../../components/ImageWithFallback';
import { ShuffleIcon } from '@radix-ui/react-icons';

export default function LiveAloneAllCapturesPage() {
  const { images, error, loading, fetchMore, hasMore } = useFetchEpisodeImages({
    limit: 8,
    shuffle: true,
  });

  if (error)
    return (
      <Flex p="4" justify="center" align="center" width="auto" height="90vh">
        <FallbackComponent
          message={'이미지를 준비중이에요.'}
          toggleMark={true}
        />
      </Flex>
    );

  console.log(`hasMore ${hasMore}`);
  return (
    <Container p="4">
      <Section size="1">
        <Flex justify="start" align="center">
          <Heading as="h1" m="2">
            나혼산 짤 모음
          </Heading>
        </Flex>
        <Callout.Root size="1" variant="soft" color="gray" style={{ width:"fit-content", transform:"scale(0.7)", transformOrigin: "left center" }} mb="3">
          <Callout.Icon>
            <ShuffleIcon />
          </Callout.Icon>
          <Callout.Text>새로고침할때마다 랜덤으로 나와요.</Callout.Text>
        </Callout.Root>

        {loading ? (
          <ImageFallback />
        ) : (
          <EpisodeSection
            images={images}
            loading={loading}
            fetchMore={fetchMore}
            hasMore={hasMore}
            linkToggle={true}
          />
        )}
      </Section>
    </Container>
  );
}
