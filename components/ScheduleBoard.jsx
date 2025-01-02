'use client';
import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Text,
  Separator,
  Table,
  Button,
  Box,
  ScrollArea,
} from '@radix-ui/themes';
import useFetchTebasSchedule from '../hooks/useFetchTebasSchedule';

// 필터 UI 컴포넌트
const FilterGroup = ({ title, options, selected, setSelected }) => {
  const toggleOption = (option) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  return (
    <Flex direction="column" mb="4">
      <Text size="4" mb="2">
        {title}
      </Text>
      <Flex gap="2" wrap="wrap">
        {options.map((option) => (
          <Button
            key={option}
            variant={'solid'}
            style={{
              color: selected.includes(option)
                ? 'white'
                : 'rgba(175,25,27,255)',
              backgroundColor: selected.includes(option)
                ? 'rgba(175,25,27,255)'
                : 'transparent',
            }}
            onClick={() => toggleOption(option)}
          >
            {option}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};

const ScheduleBoard = () => {
  const { scheduleData, loading, error } = useFetchTebasSchedule();
  const now = new Date();

  // 필터 상태 관리
  const daysOptions = ['월', '화', '수', '목', '금', '토', '일'];
  const sOptions = ['이석준', '길은성', '정희태', '김남희'];
  const martinOptions = ['이주승', '손우현', '정택운', '강승호'];

  const [selectedDays, setSelectedDays] = useState([...daysOptions]);
  const [selectedS, setSelectedS] = useState([...sOptions]);
  const [selectedMartin, setSelectedMartin] = useState([...martinOptions]);

  // 필터링 로직
  const applyFilters = (schedules) => {
    return schedules.filter((s) => {
      const matchesDay =
        selectedDays.length === 0 || selectedDays.includes(s.day);
      const matchesS = selectedS.length === 0 || selectedS.includes(s.akaS);
      const matchesMartin =
        selectedMartin.length === 0 || selectedMartin.includes(s.martin);
      return matchesDay && matchesS && matchesMartin;
    });
  };

  // 스케줄 데이터 나누기
  const pastSchedules = scheduleData.filter(
    (s) => new Date(`${s.date}T${s.time}`) < now
  );
  const upcomingSchedules = scheduleData.filter(
    (s) => new Date(`${s.date}T${s.time}`) >= now
  );

  const filteredPastSchedules = applyFilters(pastSchedules);
  const filteredUpcomingSchedules = applyFilters(upcomingSchedules);

  // 토글 상태 관리
  const [showPastSchedules, setShowPastSchedules] = useState(false);
  const [showUpcomingSchedules, setShowUpcomingSchedules] = useState(true);

  return (
    <Flex
      m={{ initial: '20px', sm: '80px', xs: '100px' }}
      direction="column"
      maxWidth="1000px"
    >
      <Flex
        direction="column"
        p="3"
        mb="6"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          boxSizing: 'border-box',
          position: 'sticky',
          top: '60px',
          backgroundColor: 'var(--gray-1)',
          borderBottom: '1px solid var(--gray-6)',
          zIndex: 100,
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

        {/* 필터 그룹 */}
        <Box style={{}}>
          <FilterGroup
            title="요일"
            options={daysOptions}
            selected={selectedDays}
            setSelected={setSelectedDays}
          />
          <FilterGroup
            title="S"
            options={sOptions}
            selected={selectedS}
            setSelected={setSelectedS}
          />
          <FilterGroup
            title="마르틴 & 페데리코"
            options={martinOptions}
            selected={selectedMartin}
            setSelected={setSelectedMartin}
          />
        </Box>
      </Flex>
      {/* 지난 스케줄 */}

      <Flex
        direction="column"
        my="4"
        
        width="100%"
        px="2"
        py="3"
        style={{ backgroundColor: 'var(--gray-3)', 
          borderRadius: '10px', }}
      >
        <Flex justify="space-between" align="center" mb="2" py="4"width="100%">
          <Text size="4" mr="2">
            지난 스케줄
          </Text>
          <Button
            variant="ghost"
            style={{cursor: 'pointer'}}
            onClick={() => setShowPastSchedules(!showPastSchedules)}
          >
            {showPastSchedules ? '▲' : '▼'}
          </Button>
        </Flex>
        {showPastSchedules && (
          <Table.Root
            variant="surface"width="fit-content"style={{margin:"0 auto"}}
          >
            <ScrollArea scrollbars="vertical" style={{ maxHeight: '450px' }}>
              <Table.Header
                align="center"
                style={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 100,
                  backgroundColor: 'var(--gray-2)',
                }}
              >
                <Table.Row align="center">
                  <Table.ColumnHeaderCell>날짜</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>시간</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>S</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell minWidth="80px">
                    마르틴
                    <br />&<br />
                    페데리코
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body align="center">
                {filteredPastSchedules.map((s) => (
                  <Table.Row key={s.date + s.time} align="center">
                    <Table.RowHeaderCell>
                      {`${s.date} ${s.day}`}
                      {s?.note && (
                        <Text mt="1" style={{ fontStyle: 'italic' }}>
                          <br /> {s.note}
                        </Text>
                      )}
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      {s?.note !== '공연없음' ? <>{s.time}</> : null}
                    </Table.Cell>
                    <Table.Cell>{s.akaS}</Table.Cell>
                    <Table.Cell>{s.martin}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </ScrollArea>
          </Table.Root>
        )}
      </Flex>

      {/* 다가오는 스케줄 */}
      <Flex
        direction="column"
        width="100%"
        my="4"
        px="2"
        py="3"
        style={{
          backgroundColor: 'var(--gray-3)',
          borderRadius: '10px',
        }}
      >
        <Flex justify="space-between" align="center" mb="2" py="4">
          <Text size="4" mr="2">
            다가오는 스케줄
          </Text>
          <Button
            variant="ghost"
            
            style={{cursor: 'pointer'}}
            onClick={() => setShowUpcomingSchedules(!showUpcomingSchedules)}
          >
            {showUpcomingSchedules ? '▲' : '▼'}
          </Button>
        </Flex>
        {showUpcomingSchedules && (
          <Table.Root variant="surface">
            <ScrollArea scrollbars="vertical" style={{ maxHeight: '450px' }}>
              <Table.Header
                align="center"
                style={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 100,
                  backgroundColor: 'var(--gray-2)',
                }}
              >
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
                {filteredUpcomingSchedules.map((s) => (
                  <Table.Row key={s.date + s.time} align="center">
                    <Table.RowHeaderCell>
                      {`${s.date} ${s.day}`}
                      {s?.note && (
                        <Text mt="1" style={{ fontStyle: 'italic' }}>
                          <br /> {s.note}
                        </Text>
                      )}
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      {s?.note !== '공연없음' ? <>{s.time}</> : null}
                    </Table.Cell>
                    <Table.Cell>{s.akaS}</Table.Cell>
                    <Table.Cell>{s.martin}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </ScrollArea>
          </Table.Root>
        )}
      </Flex>
    </Flex>
  );
};

export default ScheduleBoard;
