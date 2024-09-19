'use client';
import React from 'react';
import { Box, Heading, Section } from '@radix-ui/themes';
import FilmoRow from './FilmoRow';
import StickyHead from '../components/StickyHead';
import useStickyHeader from '../hooks/useStickyHeader';

function FilmoSection({ data }) {
  const [headerRef, isSticky] = useStickyHeader();

  return (
    <Section size="1">
      {data.map((yearData, index) => (
        <Box key={index} mt="6">
          <StickyHead ref={headerRef} stickyState={isSticky}>
            {yearData?.year}
          </StickyHead>
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
