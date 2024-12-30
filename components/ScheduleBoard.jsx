'use client';
import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Separator,
  Table,
  Button,
} from '@radix-ui/themes';
import styled, { keyframes } from 'styled-components';
import useFetchTebasSchedule from '../hooks/useFetchTebasSchedule';

const ScheduleBoard = () => {
  const { scheduleData, currentSchedule, loading, error } =
    useFetchTebasSchedule();
  const now = new Date();

  // 스케줄 데이터 나누기
  const pastSchedules = scheduleData.filter(
    (s) => new Date(`${s.date}T${s.time}`) < now
  );
  const upcomingSchedules = scheduleData.filter(
    (s) => new Date(`${s.date}T${s.time}`) >= now
  );

  // 토글 상태 관리
  const [showPastSchedules, setShowPastSchedules] = useState(false);
  const [showUpcomingSchedules, setShowUpcomingSchedules] = useState(true);

  // 이름에서 약어 생성
  const getSrcFromName = (name) => {
    switch (name) {
      case '이석준':
        return 'SEOK';
      case '김남희':
        return 'NAM';
      case '길은성':
        return 'GIL';
      case '정희태':
        return 'HEE';
      case '이주승':
        return 'JU';
      case '손우현':
        return 'SON';
      case '정택운':
        return 'TAEK';
      case '강승호':
        return 'KANG';
      default:
        return 'UNKNOWN'; // 매치되지 않는 경우
    }
  };

  return (
    <Flex
      m={{ initial: '20px', sm: '80px', xs: '100px' }}
      direction="column"
      maxWidth="1000px"
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
    >
      <Heading
        align="center"
        size={{ initial: '5', xs: '8' }}
        style={{ color: 'rgba(175,25,27,255)', fontFamily: 'SBAggroB' }}
      >
        SCHEDULE
      </Heading>
      <Separator size="4" my={{ initial: '2', xs: '4' }} />

      {/* 지난 스케줄 */}
      <Flex direction="column" width="100%">
        <Flex justify="space-between" align="center" mb="2">
          <Text size="4" mr="2">
            지난 스케줄
          </Text>
          <Button
            variant="ghost"
            onClick={() => setShowPastSchedules(!showPastSchedules)}
          >
            {showPastSchedules ? '▲' : '▼'}
          </Button>
        </Flex>
        {showPastSchedules && (
          <Table.Root variant="surface">
            <Table.Header align="center">
              <Table.Row align="center">
                <Table.ColumnHeaderCell>날짜</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>시간</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>S</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  마르틴
                  <br />&<br />
                  페데리코
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body align="center">
              {pastSchedules.map((s) => (
                <Table.Row key={s.date + s.time} align="center">
                  <Table.RowHeaderCell>
                    {`${s.date} ${s.day}`}
                    {s?.note ? (
                      <Text mt="1" style={{fontStyle: "italic"}}>
                        <br /> {s.note}
                      </Text>
                    ) : null}
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    {s?.note !== '공연없음' ? <>{s.time}</> : null}
                  </Table.Cell>
                  <Table.Cell>{s.akaS}</Table.Cell>
                  <Table.Cell>{s.martin}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Flex>
      {/* 다가오는 스케줄 */}
      <Flex direction="column" width="100%" my="5">
        <Flex justify="space-between" align="center" mb="2">
          <Text size="4" mr="2">
            다가오는 스케줄
          </Text>
          <Button
            variant="ghost"
            onClick={() => setShowUpcomingSchedules(!showUpcomingSchedules)}
          >
            {showUpcomingSchedules ? '▲' : '▼'}
          </Button>
        </Flex>
        {showUpcomingSchedules && (
          <Table.Root variant="surface">
            <Table.Header align="center">
              <Table.Row align="center">
                <Table.ColumnHeaderCell>날짜 (비고)</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>시간</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>S</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  마르틴
                  <br />&<br />
                  페데리코
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body align="center">
              {upcomingSchedules.map((s) => (
                <Table.Row key={s.date + s.time} align="center">
                  <Table.RowHeaderCell>
                    {`${s.date} ${s.day}`}
                    {s?.note ? (
                      <Text mt="1" style={{fontStyle: "italic"}}>
                        <br /> {s.note}
                      </Text>
                    ) : null}
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    {s?.note !== '공연없음' ? <>{s.time}</> : null}
                  </Table.Cell>
                  <Table.Cell>{s.akaS}</Table.Cell>
                  <Table.Cell>{s.martin}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Flex>
    </Flex>
  );
};

export default ScheduleBoard;
