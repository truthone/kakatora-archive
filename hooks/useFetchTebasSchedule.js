import { useState, useEffect } from 'react';

const useFetchTebasSchedule = () => {
  const [scheduleData, setScheduleData] = useState([]); // 전체 스케줄 데이터
  const [currentSchedule, setCurrentSchedule] = useState(null); // 현재 시간에 해당하는 스케줄
  const [error, setError] = useState(null); // 에러 상태
  const [loading, setLoading] = useState(false); // 로딩 상태

  const fetchData = async () => {
    try {
      setLoading(true);
      let url = '/api/fetchTebasSchedule';
      const params = new URLSearchParams();

      // if (episode) params.append('episode', episode);
      // if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url);

      if (!response.ok) throw new Error('Failed to data');
     

      const { data } = await response.json();
      const result = filterNowSchedule(data)

      // // 데이터를 처리해 상태 업데이트
      // const mappedData = res.map((obj) => ({
      //   date: obj.data,
      //   day: obj.day,
      //   time: obj.time,
      //   S: obj.S,
      //   martin: obj.martin,
      //   note: obj.note
      // }));

      setScheduleData(result);

      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const filterNowSchedule = () => {
    if (scheduleData.length > 0) {
      // 현재 시간 가져오기
      const now = new Date();

      // 스케줄 데이터를 Date 객체로 변환
      const parsedSchedule = scheduleData.map((item) => {
        const [hour, minute] = item.time.split(':').map(Number); // 시간 파싱
        const dateParts = item.date.split('-').map(Number); // 날짜 파싱

        return {
          ...item,
          dateTime: new Date(dateParts[0], dateParts[1] - 1, dateParts[2], hour, minute),
        };
      });

      // 현재 시간 이후의 스케줄 필터링
      const upcomingSchedule = parsedSchedule.filter(
        (item) => now <= item.dateTime
      );

      // 가장 가까운 스케줄 선택
      if (upcomingSchedule.length > 0) {
        setCurrentSchedule(upcomingSchedule[0]);
      } else {
        setCurrentSchedule(null); // 스케줄이 없으면 null
      }
    }
  }

  // 첫 페이지 데이터를 로드
  useEffect(() => {
    setScheduleData([]);
    fetchData();
    filterNowSchedule();
  }, [scheduleData]);

  return { currentSchedule, loading, error };
};

export default useFetchTebasSchedule;
