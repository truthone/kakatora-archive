import React from 'react';
import { Box } from '@radix-ui/themes';

function Skeleton({ width, height, borderRadius }) {
  return (
    <Box
      width={width}
      height={height}
      style={{
        backgroundColor: 'var(--gray-a5)',
        borderRadius: borderRadius || '4px',
        animation: 'pulse 1.5s infinite',
      }}
    />
  );
}

// 애니메이션을 위한 전역 스타일을 추가합니다.
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

export default Skeleton;