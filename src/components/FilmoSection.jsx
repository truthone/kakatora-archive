import React from 'react';
import { Box, Heading } from '@radix-ui/themes';
import FilmoRow from './FilmoRow';  // FilmoRow 컴포넌트를 import 합니다.

function FilmoSection({ data }) {
  return (
    <Box>
      {data.map((yearData, index) => (
        <Box key={index} my="6">
          <Heading size="7" mb="4">{yearData.year}</Heading>
          <FilmoRow title="드라마" contents={yearData.dramas} />
        </Box>
      ))}
    </Box>
  );
}

export default FilmoSection;