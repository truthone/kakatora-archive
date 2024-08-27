'use client'
import React from 'react';
import { Box, Heading, Section } from '@radix-ui/themes';
import FilmoRow from './FilmoRow';
import styled from 'styled-components';
import useStickyHeader from '../hooks/useStickyHeader';

const StickyHeading = styled(Heading)`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 55px;
  z-index: 1; /* 헤더가 컨텐츠 위에 있도록 */
  background-color: var(--gray-1);
  padding: 10px 20px;
`;

function FilmoSection({ data }) {
  const [headerRef, isSticky] = useStickyHeader();

  return (
    <Section size="1">
      {data.map((yearData, index) => (
        <Box key={index} mt="6">
          <StickyHeading color="crimson" ref={headerRef} className={isSticky ? 'active' : ''} size="7" p="4" mb="4">{yearData?.year}</StickyHeading>
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
    </Section>
  );
}

export default FilmoSection;
