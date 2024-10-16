import React from 'react';
import styled from 'styled-components';
import { Box, Heading } from '@radix-ui/themes';

const StickyHeading = styled(Heading)`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 55px;
  z-index: 100;
  background-color: var(--gray-1);
  padding: 20px 0;
`;

function StickyHead({ forwardedRef, stickyState, children }) {
  return (
    <StickyHeading
      ref={forwardedRef}
      className={stickyState ? 'active' : ''}
      size="7"
      p="4"
      mb="4"
      wrap="balance"
      color="crimson"
    >
      {children}
    </StickyHeading>
  );
}
export default React.forwardRef((props, ref) => (
  <StickyHead {...props} forwardedRef={ref} />
));
