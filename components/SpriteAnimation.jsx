'use client'
import styled, { keyframes, css} from 'styled-components';
import { Theme, Box, Flex } from '@radix-ui/themes';

const jelloMotion = keyframes`
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
  display: ${(props) => (props.$logoVisible ? 'block' : 'none')};
  width: ${(props) => props.$logoWidth || '200px'};
  height: ${(props) => props.$logoHeight || '200px'};
  background: url('/one.png') no-repeat center;
  background-size: contain;
  ${(props) =>
    props.$logoMove
      ? css`
          animation: ${jelloMotion} 2s 1s infinite;
        `
      : css`
          animation: none;
        `}
  transform-origin: center;
`;

const SpriteText = styled.div`
  display: ${(props) => (props.$textVisible ? 'block' : 'none')};
  font-size: ${(props) => props.$textSize || '24px'};
  margin-top: 20px;
  font-family: 'GmarketSansMedium';
   ${(props) =>
    props.$textMove
      ? css`
          animation: ${trackingMotion} 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
        `
      : css`
          animation: none;
        `}
`;
const SpriteAnimation = ({ logoWidth, logoHeight, logoVisible = true, textVisible = true, message="loading", textSize, textMove = false, logoMove = true }) => {
  return (
    <Flex justify="center" align="center" direction="column" style={{ backgroundColor: 'black', borderRadius: '20px'}} p="3">
      <SpriteLogo $logoWidth={logoWidth} $logoHeight={logoHeight} $logoVisible={logoVisible} $logoMove={logoMove} />
      <SpriteText $textVisible={textVisible} $textSize={textSize} $textMove={textMove}>{message}</SpriteText>
    </Flex>
  )
};

export default SpriteAnimation;
