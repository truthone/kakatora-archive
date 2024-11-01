import React from 'react';
import styled from 'styled-components';
import { Box, Heading } from '@radix-ui/themes';

const StickyHeading = styled(Heading)`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  z-index: 100;
  background-color: var(--gray-1);
  padding: 20px 0;
`;

function StickyHead({ forwardedRef, stickyState, children, top = 50 }) { // top의 기본값 설정
  return (
    <StickyHeading
      ref={forwardedRef}
      className={stickyState ? 'active' : ''}
      size="7"
      p="4"
      mb="4"
      wrap="balance"
      color="crimson"
      style={{ top: `${top}px` }} // 객체 문법으로 style 적용
    >
      {children}
    </StickyHeading>
  );
}

export default React.forwardRef((props, ref) => (
  <StickyHead {...props} forwardedRef={ref} />
));
