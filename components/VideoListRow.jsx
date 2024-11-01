'use client';
import React from 'react';
import { Card, Box, Flex, AspectRatio, Text } from '@radix-ui/themes';
import Image from 'next/image';
import ScrollArrowWrapper from './ScrollArrowWrapper';
import { decode } from 'html-entities';

const openYouTubeVideo = (videoId) => {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  window.open(youtubeUrl, '_blank');
};

function VideoListRow({ videos }) {
  return (
    <Box ml={{ initial: '1', xs: '4' }}>
      <ScrollArrowWrapper itemWidth={300} gap={12}>
        <Flex gap="3">
          {videos.map((video) => (
            <Card
              key={video.id.videoId}
              style={{ width: '300px', flexShrink: 0, cursor: 'pointer' }}
              my="3"
              onClick={() => openYouTubeVideo(video.id.videoId)}
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
  );
}

export default VideoListRow;