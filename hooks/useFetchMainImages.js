import { useState, useEffect } from 'react';

const useFetchMainImages = ({ episode}={}) => {
  const [mainImages, setMainImages] = useState([]); // 메인 이미지
  const [error, setError] = useState(null); // 에러 상태
  const [loading, setLoading] = useState(false); // 로딩 상태

  const fetchImagesFromSheet = async () => {
    try {
      setLoading(true);
      let url = '/api/fetchMainImages';
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
        url: obj.url
      }));

      setMainImages(mappedImages);

      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // 첫 페이지 데이터를 로드
  useEffect(() => {
    setMainImages([]);
    fetchImagesFromSheet();
  }, [episode]);

  return { mainImages, loading, error };
};

export default useFetchMainImages;
