import { useState, useEffect } from 'react';

const useYouTubeSearch = (query) => {
  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY; 

  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}&type=video&maxResults=5`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch YouTube videos');
        }
        const data = await response.json();
        setVideos(data.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchYouTubeVideos();
  }, [query]);
  console.log(videos)
  return { videos, isLoading, error };
};

export default useYouTubeSearch;