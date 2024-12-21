import { useState, useEffect } from 'react';

const useFetchLiveAloneYoutubePlaylist = ({ ep }={}) => {
  const [playlist, setPlaylist] = useState([]); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false); 

  const fetchData = async () => {
    try {
      setLoading(true);
      let url = '/api/fetchLiveAloneYoutubePlaylist';
      const params = new URLSearchParams();

      if (ep) params.append('ep', ep);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url);

      if (!response.ok) throw new Error('Failed to fetch images');

      const res = await response.json();

      // 데이터를 처리해 상태 업데이트
      // const mappedData = res.map((obj) => ({
      //   id: obj.id,
      //   fk: obj.fk,
      //   title: obj.title,
      //   playlistId: obj.playlistId
      // }));

      setPlaylist(res);

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
  }, [ep]);

  return { playlist, loading, error };
};

export default useFetchLiveAloneYoutubePlaylist;
