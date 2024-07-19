import React from 'react';
import { Box, Heading } from '@radix-ui/themes';
import FilmoRow from './FilmoRow';
import styled from 'styled-components';
import useStickyHeader from '../hooks/useStickyHeader';

const FilmoRowContainer = styled(Box)`
  position: relative;
  margin-bottom: 20px; /* 로우 간의 간격 */
`;

const StickyHeading = styled(Heading)`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  z-index: 1; /* 헤더가 컨텐츠 위에 있도록 */
  border-bottom: 1px solid #ccc; /* 아래쪽 경계선 */
  transition: background-color 0.3s;

  &.active {
    background-color: lightgray; /* 활성화된 헤더의 백그라운드 색상 변경 */
  }
`;

function FilmoSection({ data }) {
  const [headerRef, isSticky] = useStickyHeader();

  return (
    <FilmoRowContainer>
      {data.map((yearData, index) => (
        <Box key={index} mt="6">
          <StickyHeading ref={headerRef} className={isSticky ? 'active' : ''} size="7" mb="4">{yearData?.year}</StickyHeading>
          {yearData?.movies && yearData.movies.length > 0 && (
            <FilmoRow title="영화" contents={yearData?.movies} />
          )}
          {yearData?.dramas && yearData.dramas.length > 0 && (
            <FilmoRow title="드라마" contents={yearData?.dramas} />
          )}
          {yearData?.musicals && yearData.musicals.length > 0 && (
            <FilmoRow title="연극" contents={yearData?.musicals} />
          )}
          {yearData?.tv_appearances && yearData.tv_appearances.length > 0 && (
            <FilmoRow title="예능" contents={yearData?.tv_appearances} />
          )}
        </Box>
      ))}
    </FilmoRowContainer>
  );
}

export default FilmoSection;
