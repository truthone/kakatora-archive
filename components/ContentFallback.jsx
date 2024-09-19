import React from 'react';
import { Flex } from '@radix-ui/themes';

const ContentFallback = () => {
  <Flex
    justify="center"
    align="center"
    style={{
      width: '100%',
      height: '50vh',
      background: 'var(--gray-3)',
    }}
  >
    컨텐츠를 준비중이에요.
  </Flex>;
};

export default ContentFallback;
