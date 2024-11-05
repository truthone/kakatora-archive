import React, { useState, useEffect } from 'react';
import { Box, Heading, Section } from '@radix-ui/themes';
import FilmoRow from './FilmoRow';

function FilmoSection({ data }) {
  const [isClickable, setIsClickable] = useState(false);

  useEffect(() => {
    // 데이터가 변경될 때마다 클릭 방지 설정
    setIsClickable(false); // 클릭 불가 상태로 초기화
    const timer = setTimeout(() => {
      setIsClickable(true); // 2초 후 클릭 가능
    }, 1000);

    return () => clearTimeout(timer); // 타이머 정리
  }, [data]); // data가 변경될 때마다 useEffect 실행

  return (
    <Section size="1">
      {data.map((yearData, index) => (
        <Box key={`${index}-${yearData.id}`} mt="6">
          <Heading>{yearData?.year}</Heading>
          <Box mx="6">
            {yearData?.movies && yearData.movies.length > 0 && (
              <FilmoRow title="영화" contents={yearData?.movies} isClickable={isClickable} />
            )}
            {yearData?.dramas && yearData.dramas.length > 0 && (
              <FilmoRow title="드라마" contents={yearData?.dramas} isClickable={isClickable} />
            )}
            {yearData?.musicals && yearData.musicals.length > 0 && (
              <FilmoRow title="연극" contents={yearData?.musicals} isClickable={isClickable} />
            )}
            {yearData?.tv_appearances && yearData.tv_appearances.length > 0 && (
              <FilmoRow title="예능" contents={yearData?.tv_appearances} isClickable={isClickable} />
            )}
          </Box>
        </Box>
      ))}
    </Section>
  );
}

export default FilmoSection;
