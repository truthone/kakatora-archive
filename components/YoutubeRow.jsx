'use client';
import React from 'react';
import {
  Heading,
  Flex,
  AspectRatio,
  Card,
  Text,
  Section,
  Box,
} from '@radix-ui/themes';
import Image from 'next/image';
import ScrollArrowWrapper from './ScrollArrowWrapper';
import { decode } from 'html-entities';

function YouTubeRow({ SectionTitle, videos }) {
  const openYouTubeVideo = (videoId) => {
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(youtubeUrl, '_blank');
  };

  const validVideos =
    videos?.filter(
      (video) =>
        video?.snippet &&
        video.snippet.resourceId?.videoId &&
        video.snippet.thumbnails?.medium?.url &&
        video.snippet.title
    ) || [];

  if (validVideos.length === 0) {
    return null;
  }

  return (
    <Section size="1">
      <Heading size="6" mb="2">
        {SectionTitle}
      </Heading>
      <Box px="6">
        <ScrollArrowWrapper itemWidth={300} gap={12}>
          <Flex gap="3">
            {validVideos.map((video) => (
              <Card
                key={video.snippet.resourceId.videoId}
                my="3"
                style={{ width: '300px', flexShrink: 0, cursor: 'pointer' }}
                onClick={() =>
                  openYouTubeVideo(video.snippet.resourceId.videoId)
                }
                className="item"
              >
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    fill
                    sizes={'30vw'}
                    style={{ objectFit: 'cover' }}
                  />
                </AspectRatio>
                <Box p="2">
                  <Text
                    as="p"
                    size="2"
                    weight="bold"
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                      lineHeight: '1.2em',
                      maxHeight: '2.4em', // lineHeight * 2
                    }}
                  >
                    {decode(video.snippet.title)}
                  </Text>
                </Box>
              </Card>
            ))}
          </Flex>
        </ScrollArrowWrapper>
      </Box>
    </Section>
  );
}

export default YouTubeRow;
