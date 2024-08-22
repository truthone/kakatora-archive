'use client'
import React from 'react';
import { Box, Heading, Flex, Card, Text, Container, AspectRatio } from '@radix-ui/themes';
import useYoutubeSearch from '../hooks/useYoutubeSearch'
import Image from 'next/image';

const openYouTubeVideo = (videoId) => {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  window.open(youtubeUrl, '_blank');
};

function YouTubeByQueryRow({ SectionTitle, query }) {
  const { videos, isLoading, error } = useYoutubeSearch(query);

  const validVideos = videos?.filter(video => 
    video?.snippet && 
    video.id?.videoId &&
    video.snippet.thumbnails?.medium?.url &&
    video.snippet.title
  ) || [];

  console.log(validVideos)
  if (validVideos.length === 0) {
    return null; // 유효한 비디오가 없으면 아무것도 렌더링하지 않음
  }

  return (
    <Box my="6">
      <Container>
        <Heading size="6" mb="4">{SectionTitle}</Heading>
        <Flex px="4" gap="3" style={{ overflowX: 'auto' }}>
          {validVideos.map((video) => (
            <Card 
              key={video.id.videoId} 
              style={{ width: '250px', flexShrink: 0, cursor: 'pointer' }} 
              onClick={() => openYouTubeVideo(video.id.videoId)}
            >
              <AspectRatio ratio={16/9}>
                <Image
                  src={video.snippet.thumbnails.medium.url} 
                  alt={video.snippet.title} 
                  fill
                  style={{objectFit: 'cover'}}
                />
              </AspectRatio>
              <Box p="2">
                <Text size="2" weight="bold">{video.snippet.title}</Text>
              </Box>
            </Card>
          ))}
        </Flex>
      </Container>
    </Box>
  );
}

export default YouTubeByQueryRow;