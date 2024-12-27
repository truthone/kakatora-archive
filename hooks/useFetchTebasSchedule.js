import { useState, useEffect, useCallback } from 'react';
import tebasSchedule from '../data/tebasSchedule.json'

const useFetchTebasSchedule = () => {
  const [scheduleData, setScheduleData] = useState([]); // 전체 스케줄 데이터
  const [currentSchedule, setCurrentSchedule] = useState(null); // 현재 시간에 해당하는 스케줄
  const [error, setError] = useState(null); // 에러 상태
  const [loading, setLoading] = useState(false); // 로딩 상태

  // 스케줄 필터링 함수
  const filterNowSchedule = useCallback((data) => {
    if (data.length > 0) {
      const now = new Date();

      // 스케줄 데이터를 Date 객체로 변환
      const parsedSchedule = data.map((item) => {
        if (item.time) {
          const [hour, minute] = item.time.split(':').map(Number);
          const dateParts = item.date.split('-').map(Number);

          return {
            ...item,
            dateTime: new Date(dateParts[0], dateParts[1] - 1, dateParts[2], hour, minute),
          };
        }
        return { ...item, dateTime: null };
      }).filter(item => item.dateTime); // 유효한 dateTime만 유지

      // 현재 시간 이후의 스케줄 필터링
      const upcomingSchedule = parsedSchedule.filter(
        (item) => now <= item.dateTime
      );

      // 가장 가까운 스케줄 반환
      return upcomingSchedule.length > 0 ? upcomingSchedule[0] : null;
    }
    return null;
  }, []);

  // 데이터 로드 함수
  const loadData = useCallback(() => {
    try {
      setLoading(true);
      // JSON 파일에서 데이터 로드
      const data = tebasSchedule;

      // 전체 데이터 상태 업데이트
      setScheduleData(data);

      // 현재 스케줄 필터링 및 상태 업데이트
      const filteredSchedule = filterNowSchedule(data);
      setCurrentSchedule(filteredSchedule);

      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [filterNowSchedule]);

  // 첫 데이터 로드
  useEffect(() => {
    loadData();
  }, [loadData]);

  return { scheduleData, currentSchedule, loading, error };
};

export default useFetchTebasSchedule;
