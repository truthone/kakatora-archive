import styled, { keyframes } from 'styled-components';

// 애니메이션 키프레임 정의
const playSprite = keyframes`
  from {
    background-position: 0 0; /* 첫 번째 프레임 */
  }
  to {
    background-position: -3300px 0; /* 마지막 프레임 */
  }
`;

// 스타일 정의
const SpriteContainer = styled.div`
  width: 300px;
  height: 300px;
  background: url('/group.png') no-repeat;
  animation: ${playSprite} 1.1s steps(11) infinite; /* 1초 동안 10 프레임 반복 */
`;

const SpriteAnimation = () => {
  return <SpriteContainer />;
};

export default SpriteAnimation;
