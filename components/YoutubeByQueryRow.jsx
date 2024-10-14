'use client';
import React from 'react';
import {
  Box,
  Heading,
  Flex,
  Card,
  Text,
  Container,
  AspectRatio,
  Skeleton,
  Section,
} from '@radix-ui/themes';
import useYoutubeSearch from '../hooks/useYoutubeSearch';
import Image from 'next/image';
import { decode } from 'html-entities';
import ScrollArrowWrapper from './ScrollArrowWrapper';

const openYouTubeVideo = (videoId) => {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  window.open(youtubeUrl, '_blank');
};

function YouTubeByQueryRow({ SectionTitle, query }) {
  const { videos, isLoading, error } = useYoutubeSearch(query);

  const validVideos =
    videos?.filter(
      (video) =>
        video?.snippet &&
        video.id?.videoId &&
        video.snippet.thumbnails?.medium?.url &&
        video.snippet.title
    ) || [];

  if (validVideos.length === 0 || error) {
    return null; // 유효한 비디오가 없으면 아무것도 렌더링하지 않음
  }

  if (isLoading) {
    return <Skeleton loading="true" width="100%" height="250px" />;
  }

  return (
    <Section size="1">
      <Heading size="6" mb="4">
        {SectionTitle}
      </Heading>
      <ScrollArrowWrapper itemWidth={300} gap={12}>
        <Flex px="4" gap="3">
          {validVideos.map((video) => (
            <Card
              key={video.id.videoId}
              style={{ width: '300px', flexShrink: 0, cursor: 'pointer' }}
              onClick={() => openYouTubeVideo(video.id.videoId)}
            >
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </AspectRatio>
              <Box p="2">
                <Text size="2" weight="bold">
                  {decode(video.snippet.title)}
                </Text>
              </Box>
            </Card>
          ))}
        </Flex>
      </ScrollArrowWrapper>
    </Section>
  );
}

export default YouTubeByQueryRow;
