import React, { useState, useEffect } from 'react';
import { Box, Heading, Section } from '@radix-ui/themes';
import FilmoRow from './FilmoRow';

function FilmoSection({ data }) {
  const [isClickable, setIsClickable] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClickable(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
