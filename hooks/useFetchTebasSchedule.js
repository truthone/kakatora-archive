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
      const now = new Date('2025-01-27T16:31:00');
  
      // 스케줄 데이터를 Date 객체로 변환
      const parsedSchedule = data.map((item, index, array) => {
        if (item.time) {
          const [hour, minute] = item.time.split(':').map(Number);
          const dateParts = item.date.split('-').map(Number);
  
          const startDateTime = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], hour, minute);
  
          // 스케줄이 하나만 있는 경우: 자정부터 자정까지 유지
          if (array.length === 1) {
            return {
              ...item,
              startDateTime: new Date(dateParts[0], dateParts[1] - 1, dateParts[2], 0, 0, 0),
              endDateTime: new Date(dateParts[0], dateParts[1] - 1, dateParts[2], 23, 59, 59),
            };
          }
  
          // 첫 타임의 종료 시간: 공연 시작 후 2시간 반
          const firstShowEndDateTime = new Date(startDateTime.getTime() + 2.5 * 60 * 60 * 1000);
  
          // 두 번째 타임의 시작 시간: 첫 타임 종료 시간 이후
          const isSecondShow = index === 1;
          const secondShowStartDateTime = isSecondShow
            ? firstShowEndDateTime
            : null;
  
          // 두 번째 타임의 종료 시간: 자정
          const endDateTime = isSecondShow
            ? new Date(dateParts[0], dateParts[1] - 1, dateParts[2], 23, 59, 59)
            : firstShowEndDateTime;
  
          return {
            ...item,
            startDateTime: isSecondShow ? secondShowStartDateTime : new Date(dateParts[0], dateParts[1] - 1, dateParts[2], 0, 0, 0),
            endDateTime,
          };
        }
        return { ...item, startDateTime: null, endDateTime: null };
      }).filter(item => item.startDateTime && item.endDateTime); // 유효한 dateTime만 유지
  
      // 현재 시간에 해당하는 스케줄 찾기
      const currentSchedule = parsedSchedule.find(
        (item) => now >= item.startDateTime && now <= item.endDateTime
      );
  
      // 현재 시간이 지난 스케줄 필터링
      const upcomingSchedule = parsedSchedule.filter(
        (item) => now < item.startDateTime
      );
  
      // 현재 시간에 해당하는 스케줄이 있으면 반환, 아니면 가장 가까운 스케줄 반환
      if (currentSchedule) {
        return currentSchedule;
      }
  
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
