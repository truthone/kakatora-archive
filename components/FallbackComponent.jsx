import styled from 'styled-components';
import Image from 'next/image';
import { Box,Text } from '@radix-ui/themes';
const FallbackComponent = ({ message, toggleMark }) => {
  return (
    <Fallback>
      <Box width="100%" height="80%" maxHeight="300px" position="relative">
        <Image
          src={'/fallback.avif'}
          alt="비어있어요"
          fill
          sizes={'30vw'}
          style={{
            display: toggleMark ? 'block' : 'none',
            objectFit: 'contain',
          }}
        />
      </Box>
      <Text>{message}</Text>
    </Fallback>
  );
};

const Fallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #1c1c1c;
  border-radius: 8px;
  color: #666;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
`;

export default FallbackComponent;
