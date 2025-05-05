import React from 'react';
import styled from 'styled-components';
import { Heading } from '@radix-ui/themes';

const StickyHeading = styled(Heading)`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  z-index: 100;
  background-color: var(--gray-1);
  padding: 20px 0;
`;

function StickyHead({ forwardedRef, stickyState, children, top = 50 }) {
  return (
    <StickyHeading
      ref={forwardedRef}
      className={stickyState ? 'active' : ''}
      size="7"
      p="4"
      mb="4"
      wrap="balance"
      color="crimson"
      style={{ top: `${top}px` }}
    >
      {children}
    </StickyHeading>
  );
}

const StickyHeadWrapper = React.forwardRef((props, ref) => (
  <StickyHead {...props} forwardedRef={ref} />
));

StickyHeadWrapper.displayName = 'StickyHead';

export default StickyHeadWrapper;
