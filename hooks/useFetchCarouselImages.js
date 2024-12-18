import { useState, useEffect } from 'react';

const useFetchCarouselImages = ({ episode } = {}) => {
  const [carouselImages, setCarouselImages] = useState([]); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false); 

  const fetchImagesFromSheet = async () => {
    try {
      setLoading(true);
      let url = '/api/fetchCarouselImages';
      const params = new URLSearchParams();

      if (episode) params.append('episode', episode);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url);

      if (!response.ok) throw new Error('Failed to fetch images');

      const res = await response.json();

      // 데이터를 처리해 상태 업데이트
      const mappedImages = res.map((obj) => ({
        id: obj.id,
        episode_id: obj.episode_id,
        title: obj.title,
        filename: obj.filename,
        url: obj.url,
      }));

      setCarouselImages(mappedImages);

      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // 첫 페이지 데이터를 로드
  useEffect(() => {
    setCarouselImages([]);
    fetchImagesFromSheet();
  }, [episode]);

  return { carouselImages, loading, error };
};

export default useFetchCarouselImages;
