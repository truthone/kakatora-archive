import { useState, useEffect } from 'react';

const useFetchEpisodeImages = ({ episode, isMain = false, isCarousel = false, limit }) => {
  const [images, setImages] = useState([]); // 전체 이미지 목록
  const [mainImage, setMainImage] = useState([]); // 메인 이미지
  const [carouselImages, setCarouselImages] = useState([]); // 캐러셀 이미지
  const [error, setError] = useState(null); // 에러 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [page, setPage] = useState(0); // 현재 페이지
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부

  const fetchImagesFromSheet = async (currentPage) => {
    try {
      setLoading(true);
      const offset = currentPage * limit; // 현재 페이지에 따른 시작점
      let url = '/api/fetchEpisodeImages';
      const params = new URLSearchParams();

      if (limit) params.append('limit', limit);
      if (offset) params.append('offset', offset);
      if (episode) params.append('episode', episode);
      if (isMain) params.append('isMain', isMain);
      if (isCarousel) params.append('isMain', isMain);
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
        is_main: obj.is_main,
        is_carousel: obj.is_carousel,
      }));

      // 기존 데이터에 추가
      setImages((prevImages) => [...prevImages, ...mappedImages]);

      // 추가 데이터 여부 확인
      if (mappedImages.length < limit) {
        setHasMore(false); // 가져온 데이터가 limit보다 적으면 더 이상 데이터 없음
      }

      // 첫 페이지에만 메인 및 캐러셀 이미지 처리
      if (currentPage === 0) {
        const mainImages = mappedImages.filter(
          (item) =>
            item.is_main === 'TRUE' || item.is_main === true || item.is_main === 'true'
        );

        const carouselImages = mappedImages.filter(
          (item) =>
            item.is_carousel === 'TRUE' || item.is_carousel === true || item.is_carousel === 'true'
        );

        setMainImage(mainImages);
        setCarouselImages(carouselImages);
      }

      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // 첫 페이지 데이터를 로드
  useEffect(() => {
    setPage(0); // 페이지 초기화
    setImages([]); // 기존 데이터 초기화
    setHasMore(true); // 추가 데이터 여부 초기화
    setMainImages([]);
    setCarouselImages([]);
    fetchImagesFromSheet(0); // 첫 페이지 데이터 가져오기
  }, [episode, isMain, isCarousel, limit]);

  // 다음 페이지 데이터 로드
  const fetchMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchImagesFromSheet(nextPage);
    }
  };

  return { images, mainImage, carouselImages, error, loading, fetchMore, hasMore };
};

export default useFetchEpisodeImages;
