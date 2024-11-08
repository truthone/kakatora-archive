'use client';

import React, { useEffect, useState } from 'react';
import {
  Heading,
  Section,
  Card,
  Box,
  Flex,
  AspectRatio,
  Text,
} from '@radix-ui/themes';
import Image from 'next/image';
import ScrollArrowWrapper from './ScrollArrowWrapper';
import { decode } from 'html-entities';

const openYouTubeVideo = (videoId) => {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  window.open(youtubeUrl, '_blank');
};

function YoutubeRow({ sectionTitle, playlistId }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch(
          `/api/fetchYoutubeVideos?playlistId=${playlistId}`
        );
        if (response.ok) {
          const data = await response.json();
          setVideos(data); // YouTube API의 결과에서 items 사용
        } else {
          console.error('Failed to fetch videos:', response.status);
        }
      } catch (error) {
        console.error('유튜브 영상 가져오기 오류:', error);
      }
    }

    fetchVideos();
  }, [playlistId]);

  if (!videos.length) {
    return null;
  }

  return (
    <Section size="1">
      <Heading size="6" mb="4">
        {sectionTitle}
      </Heading>
      <Box ml={{ initial: '1', xs: '4' }}>
        <ScrollArrowWrapper itemWidth={300} gap={12}>
          <Flex gap="3">
            {videos.map((video) => (
              <Card
                key={video.snippet.resourceId.videoId}
                style={{ width: '300px', flexShrink: 0, cursor: 'pointer' }}
                my="3"
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

export default YoutubeRow;
