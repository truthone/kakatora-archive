import { useState, useEffect } from 'react';

const useFetchEpisodeImages = (episode) => {
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null); // is_main 데이터 저장
  const [carouselImages, setCarouselImages] = useState([]); // is_carousel 데이터 저장
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

        // 데이터를 처리해 상태 업데이트
        const mappedImages = data.map((obj) => ({
          episode: obj.episode,
          title: obj.title,
          filename: obj.filename,
          url: obj.url,
          is_main: obj.is_main,
          is_carousel: obj.is_carousel,
        }));

        // is_main과 is_carousel 데이터를 분리
        const main = mappedImages.find((item) => item.is_main) || null;
        const carousel = mappedImages.filter((item) => item.is_carousel);

        setImages(mappedImages);
        setMainImage(main);
        setCarouselImages(carousel);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImagesFromSheet();
  }, [episode]);

  return { images, mainImage, carouselImages, error, loading };
};

export default useFetchEpisodeImages;