import { useState, useEffect } from 'react';

export const useFetchImages = (episode) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImagesFromSheet = async () => {
      try {
        setLoading(true);
        const url = episode ? `/api/fetchEpisodeImages?episode=${episode}` : '/api/fetchEpisodeImages';
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch images');

        const data = await response.json();
        const images = data.map((obj) => ({
          episode: obj.episode,
          title: obj.title,
          filename: obj.filename,
          url: obj.url,
        }));

        setImages(images); // 성공적으로 데이터를 받아오면 images 상태 업데이트
        setError(null);
      } catch (error) {
        setError(error); // 에러 발생 시 error 상태 업데이트
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchImagesFromSheet();
  }, [episode]);

  return { images, error, loading };
};
