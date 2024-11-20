import { useState, useEffect } from 'react';

const useFetchEpisodeImages = ({ episode, isMain= false }) => {
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchImagesFromSheet = async () => {
      try {
        setLoading(true);
        let url = '/api/fetchEpisodeImages';
        const params = new URLSearchParams();

        if (episode) {
          params.append('episode', episode);
        }
        if (isMain) {
          params.append('isMain', isMain);
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        console.log('API 호출 URL:', url); // 디버깅을 위해 추가

        const response = await fetch(url);

        if (!response.ok) throw new Error('Failed to fetch images');

        const data = await response.json();

        // 데이터를 처리해 상태 업데이트
        const mappedImages = data.map((obj) => ({
          id: obj.id,
          episode_id: obj.episode_id,
          title: obj.title,
          filename: obj.filename,
          url: obj.url,
          is_main: obj.is_main,
          is_carousel: obj.is_carousel,
        }));
        // is_main과 is_carousel 데이터를 분리
        const main = mappedImages.filter(
          (item) =>
            item.is_main === 'TRUE' || item.is_main === true || item.is_main === 'true'
        ) || null;

        const carousel = mappedImages.filter(
          (item) =>
            item.is_carousel === 'TRUE' || item.is_carousel === true || item.is_carousel === 'true'
        );

        
console.log(main)

        setImages(mappedImages);
        setMainImage(main);
        setCarouselImages(carousel);
        setError(null);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImagesFromSheet();
  }, [episode, isMain]);

  return { images, mainImage, carouselImages, error, loading };
};

export default useFetchEpisodeImages;
