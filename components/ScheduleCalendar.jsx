'use client';

import React, { useState } from 'react';
import { Box, Grid, Text, Button, Flex } from '@radix-ui/themes';
import useFetchTebasSchedule from '../hooks/useFetchTebasSchedule';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

export default function AudienceRecordPage() {
  const startYear = 2024;
  const startMonth = 10; // 11월 (0부터 시작)
  const endYear = 2025;
  const endMonth = 1; // 2월 (0부터 시작)

  const [currentDate, setCurrentDate] = useState(new Date(startYear, startMonth, 1));

  const { scheduleData, loading } = useFetchTebasSchedule();

  const performanceDates = scheduleData
    .filter((item) => item.note !== '공연없음')
    .map((item) => item.date);

  console.log(performanceDates)
  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonth = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
      return prevMonth.getFullYear() === startYear && prevMonth.getMonth() < startMonth
        ? prevDate
        : prevMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonth = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
      return nextMonth.getFullYear() === endYear && nextMonth.getMonth() > endMonth
        ? prevDate
        : nextMonth;
    });
  };

    // // 🔥 요일별 색상 적용 함수
    // const tileClassName = ({ date }) => {
    //   const day = date.getDay(); // 0: 일요일, 6: 토요일
    //   if (day === 0) return 'sunday'; // 일요일
    //   if (day === 6) return 'saturday'; // 토요일
    //   const dateString = date.toISOString().split('T')[0]; // "YYYY-MM-DD" 형식 변환

    //   return performanceDates.includes(dateString) ? 'performance-day' : null;
    // };

// 🎭 공연 날짜에 스타일 적용 (performanceDates 활용)
const tileClassName = ({ date }) => {
  const dateString = date.toISOString().split('T')[0]; // "YYYY-MM-DD" 형식 변환

  return performanceDates.includes(dateString) ? 'performance-day' : null;
};




return (
  <CalendarContainer>
  {/* 현재 월 표시 */}
  <Text size="5" weight="bold" color="white">
    {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
  </Text>

  <Flex gap="2" mt="2">
    <Button onClick={handlePrevMonth} disabled={currentDate.getFullYear() === startYear && currentDate.getMonth() === startMonth}>
      이전 달
    </Button>
    <Button onClick={handleNextMonth} disabled={currentDate.getFullYear() === endYear && currentDate.getMonth() === endMonth}>
      다음 달
    </Button>
  </Flex>

  <StyledCalendar
    key={currentDate} // 강제 리렌더링
    value={currentDate}
    onActiveStartDateChange={({ activeStartDate }) => setCurrentDate(activeStartDate)}
    minDate={new Date(startYear, startMonth, 1)}
    maxDate={new Date(endYear, endMonth, 28)}
    locale="ko-KR"
    calendarType="gregory" 
    showNavigation={false} // 기본 네비게이션 제거
    showNeighboringMonth={false}
    tileClassName={tileClassName}
  />
</CalendarContainer>
);
}


// 🔹 스타일 적용 (다크 모드 & 정확한 요일별 색상)
const CalendarContainer = styled(Flex)`
  flex-direction: column;
  align-items: center;
  background: black;
  padding: 20px;
  border-radius: 10px;
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  max-width: 350px;
  background: black;
  border: 1px solid gray;
  border-radius: 10px;
  color: white;

  /* 헤더 네비게이션 스타일 */
  .react-calendar__navigation {
    background: black;
    color: white;
  }

  /* 요일 스타일 */
  .react-calendar__month-view__weekdays {
    text-transform: uppercase;
    color: gray;
  }

  /* 날짜 기본 스타일 */
  .react-calendar__tile {
    color: white;
  }

  /* ✅ 일요일만 빨간색 */
  .sunday {
    color: #f77 !important;
  }

  /* ✅ 토요일만 파란색 */
  .saturday {
    color: #77f !important;
  }

  /* 선택된 날짜 */
  .react-calendar__tile--active {
    background: gray;
    color: black;
  }

    /* 🎭 공연이 있는 날짜 스타일 (강조) */
  .performance-day {
    background: #ffcc00 !important;
    color: black !important;
    font-weight: bold;
    border-radius: 50%;
  }
`;
