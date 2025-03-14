import { useState, useEffect } from 'react';


const parsePlaylist = (data) => {
  try {
    if (!data) return []; // 데이터가 없을 경우 빈 배열 반환

    // 이미 배열이면 그대로 반환
    if (Array.isArray(data)) return data;

    // JSON 형태로 저장된 배열이라면 JSON.parse() 시도
    if (typeof data === "string" && data.startsWith("[")) {
      return JSON.parse(data);
    }

    // 단일 문자열이면 배열로 변환
    return [data];
  } catch (error) {
    console.error("JSON 변환 오류:", error);
    return [data]; // 오류 발생 시 원본 데이터를 배열로 감싸서 반환
  }
};

const useFetchYoutubePlaylist = ({ id }={}) => {
  const [playlist, setPlaylist] = useState([]); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false); 

  const fetchData = async () => {
    try {
      setLoading(true);
      let url = '/api/fetchYoutubePlaylist';
      const params = new URLSearchParams();

      if (id) params.append('filmoId', id);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url);

      if (!response.ok) throw new Error('Failed to fetch images');

      const res = await response.json();
      const result = parsePlaylist(res);


      setPlaylist(result);

      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // 첫 페이지 데이터를 로드
  useEffect(() => {
    setPlaylist([]);
    fetchData();
  }, [id]);

  return { playlist, loading, error };
};

export default useFetchYoutubePlaylist;
