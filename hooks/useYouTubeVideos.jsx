// useYouTubeVideos.js
'use client';
import { useState, useEffect } from 'react';

const useYouTubeVideos = (playlistId) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const API_KEY = process.env.YOUTUBE_API_KEY;
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=10&key=${API_KEY}`
      );
      const data = await response.json();
      setVideos(data.items);
    };

    fetchVideos();
  }, [playlistId]);

  if (!videos) return <div>Loading...</div>;

  return videos;
};

export default useYouTubeVideos;