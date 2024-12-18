'use client'
import styled, { keyframes } from 'styled-components';
import { Theme, Box, Flex } from '@radix-ui/themes';

const jelloMotion= keyframes`
  0% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
            transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
            transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
            transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
            transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
            transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
}
@keyframes jello-horizontal {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
            transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
            transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
            transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
            transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
            transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
`

const trackingMotion = keyframes`
0% {
  letter-spacing: -0.5em;
  opacity: 0;
}
40% {
  opacity: 0.6;
}
100% {
  opacity: 1;
}
`;

// 스타일 정의
const SpriteLogo = styled.div`
  width: 200px;
  height: 200px;
  background: url('/one.png') no-repeat center;

  background-size: contain;
  animation: ${jelloMotion} 2s 1s infinite;
  transform-origin: center;
`;

const SpriteText = styled.div`
  font-size: 24px;
  margin-top: 20px;
  font-family: 'GmarketSansMedium';
  animation: ${trackingMotion} 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;

`;
const SpriteAnimation = () => {
  return <Flex justify="center" align="center" direction="column" width="100%" height="100vh" style={{backgroundColor: 'black'}}>
    <SpriteLogo />
    <SpriteText>LEE JU SEUNG ARCHIVE</SpriteText>
    </Flex>;
};

export default SpriteAnimation;
