import React from 'react';
import {
  Heading,
  Section,
} from '@radix-ui/themes';
import { getYouTubeVideos } from '../lib/getYouTubeVideos';
import { VideoListRow } from './VideoListRow'

async function YouTubeRow({ SectionTitle, playlistId }) {
  const videos = await getYouTubeVideos(playlistId);
  console.log(videos)
  const validVideos = 
    videos?.filter(
      (video) =>
        video?.snippet &&
        video.id?.videoId &&
        video.snippet.thumbnails?.high?.url &&
        video.snippet.title
    ) || [];

  if (validVideos.length === 0 || !videos) {
    return null; 
  }
  return (
    <Section size="1">
      <Heading size="6" mb="4">
        {SectionTitle}
      </Heading>
      <VideoListRow videos={validVideos}/>
    </Section>
  );
}

export default YouTubeRow;
