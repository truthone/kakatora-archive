'use client';

import React, { useState } from 'react';
import { Box, Grid, Text, Button, Flex } from '@radix-ui/themes';
import useFetchTebasSchedule from '../hooks/useFetchTebasSchedule';

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

export default function AudienceRecordPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const { scheduleData } = useFetchTebasSchedule();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 해당 월의 첫날과 마지막 날 구하기
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstDayIndex = firstDay.getDay(); // 첫날 요일 (0: 일요일 ~ 6: 토요일)
  const daysInMonth = lastDay.getDate(); // 해당 월의 총 일수

  // 공연이 있는 날짜 리스트 추출
  const availableDates = new Set(scheduleData.map(s => s.date));

  return (
    <Box>
      <Text size="5" align="center" weight="bold">
        {year}년 {month + 1}월
      </Text>
      <Grid columns="7" gap="2" justify="start" width="500px">
        {daysOfWeek.map(day => (
          <Box key={day} align="center">
            <Text weight="bold">{day}</Text>
          </Box>
        ))}
      </Grid>
      <Grid columns="7" gap="2" justify="center">
        {/* 첫째 날 전의 빈 칸 채우기 */}
        {Array(firstDayIndex).fill(null).map((_, i) => (
          <Box key={`empty-${i}`} />
        ))}
        {/* 날짜 렌더링 */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
          const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isAvailable = availableDates.has(dateString);
          return (
            <Box key={dateString} align="center" width="100%">
              <Button
                variant={isAvailable ? 'solid' : 'soft'}
                color={isAvailable ? 'indigo' : 'gray'}
                disabled={!isAvailable}
                onClick={() => setSelectedDate(dateString)}s
              >
                {day}
              </Button>
            </Box>
          );
        })}
      </Grid>
      {selectedDate && (
        <Text align="center" mt="4">선택한 날짜: {selectedDate}</Text>
      )}
    </Box>
  );
}
