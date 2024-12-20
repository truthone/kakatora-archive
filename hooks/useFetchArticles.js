import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchArticles = ({ filmoId } = {}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true); // 로딩 상태 시작
      setError(null); // 에러 초기화
  
      // Step 1: Fetch data from fetchArticles API
      const articleResponse = await axios.get(`/api/fetchArticles?filmoId=${filmoId}`);
      const articles = articleResponse.data;
  
      // Step 2: Fetch Open Graph data for each article link in parallel
      const enrichedArticles = await Promise.all(
        articles.map(async (article) => {
          try {
            // img가 이미 존재하면 Open Graph 요청을 건너뛰기
            if (article.img) {
              return article;
            }

            // img가 없을 경우 Open Graph 데이터 요청
            const ogResponse = await axios.get(`/api/og-parser?url=${encodeURIComponent(article.link)}`);
            const ogData = ogResponse.data;

            return {
              ...article,
              imgUrl: article.imgUrl || ogData.image, // Open Graph 이미지 추가
              title: article.title || ogData.title, // 제목이 없을 경우 OG 제목 사용
              description: article.description || ogData.description, // 설명이 없을 경우 OG 설명 사용
            };
          } catch (error) {
            console.warn(`Failed to fetch OG data for article: ${article.link}`, error);
            return article; // 실패 시 원본 article 반환
          }
        })
      );

      setArticles(enrichedArticles); // 상태 업데이트
    } catch (err) {
      setError(err); // 에러 처리
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };
  
  useEffect(() => {
    if (!filmoId) {
      console.warn('Invalid filmoId, skipping fetch');
      return;
    }

    setArticles([]);
    fetchData();
  }, [filmoId]);
  
  return { articles, loading, error };
};

export default useFetchArticles;
