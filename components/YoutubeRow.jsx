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
import { getYouTubeVideos } from '../lib/getYouTubeVideos';

const openYouTubeVideo = (videoId) => {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  window.open(youtubeUrl, '_blank');
};

function YouTubeRow({ SectionTitle, playlistId }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      const response = await getYouTubeVideos(playlistId);

      // 유효한 비디오 필터링
      const validVideos =
        response.filter(
          (video) =>
            video?.snippet &&
            video?.snippet?.resourceId?.videoId &&
            video?.snippet?.thumbnails?.standard?.url &&
            video?.snippet?.title
        ) || [];

      setVideos(validVideos);
    }

    fetchVideos();
  }, [playlistId]);

  if (videos.length === 0) {
    return null; // 비디오가 없을 경우 아무 것도 렌더링하지 않음
  }

  return (
    <Section size="1">
      <Heading size="6" mb="4">
        {SectionTitle}
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
                    src={video.snippet.thumbnails.standard.url}
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
