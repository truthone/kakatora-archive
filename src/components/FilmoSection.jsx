import React from 'react';
import { Box, Heading } from '@radix-ui/themes';
import FilmoRow from './FilmoRow';

function FilmoSection({ data }) {
  return (
    <Box>
      {data.map((yearData, index) => (
        <Box key={index} my="6">
          <Heading size="7" mb="4">{yearData?.year}</Heading>
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
    </Box>
  );
}

export default FilmoSection;
