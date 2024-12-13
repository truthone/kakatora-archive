'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  AspectRatio,
  Separator,
} from '@radix-ui/themes';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimationBox = styled(Box)`
  display: block;
  animation: ${fadeInUp} 1s ease forwards;
  animation-delay: 0.3s;
  opacity: 0;
  flex: 1;
`;

const AnimationBox2 = styled(Box)`
  display: block;
  animation: ${fadeInUp} 1s ease forwards;
  animation-delay: 0.6s;
  opacity: 0;
  flex: 1;
`;

const Name = styled(Text)`
  font-family: GowunBatang-Regular;
  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (min-width: 769px) {
    font-size: 20px;
  }
`;

const SName = styled(Text)`
  font-weight: bold;
  margin-top: 10px;
  @media (max-width: 768px) {
    font-size: 10px;
  }

  @media (min-width: 769px) {
    font-size: 20px;
  }
`;

const MartinName = styled(Text)`
  font-weight: bold;
  font-weight: thin;
  margin-top: 10px;
  @media (max-width: 768px) {
    font-size: 9px;
  }

  @media (min-width: 769px) {
    font-size: 18px;
  }
`;

// 타이핑 애니메이션
const typing = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
    max-width: fit-content;
  }
`;

// 커서 깜박임 애니메이션
const blink = keyframes`
  50% {
    border-color: transparent;
  }
`;

// 스타일 정의
const TypingEffect = styled.div`
  display: inline-block;
  font-size: 12px;
  @media (min-width: 769px) {
    font-size: 20px;
  }
  white-space: nowrap; /* 줄바꿈 방지 */
  overflow: hidden; /* 텍스트 잘라내기 */
  border-right: 2px solid black; /* 커서 */
  animation:
    ${typing} 3s steps(30, end) forwards,
    ${blink} 0.8s step-end infinite;
`;
const CastBoard = () => {
  return (
    <Flex
      m={{ initial: '10px', sm: '80px', xs: '100px' }}
      position="relative"
      direction="column"
      p={{ initial: '50px', sm: '80px', xs: '100px' }}
      width="100%"
      maxWidth="600px"
      height="fit-content"
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundImage: `url('/tebas/paper.png')`,
        backgroundRepeat: `no-repeat`,
        backgroundSize: 'contain',
        aspectRatio: '3/4',
        boxSizing: 'border-box',
      }}
    >
      <Heading
        align="center"
        size={{ initial: '5', xs: '8' }}
        style={{ color: 'rgba(175,25,27,255)', fontFamily: 'SBAggroB' }}
      >
        TODAY'S CAST
      </Heading>
      <Separator size="4" my={{ initial: '2', xs: '4' }} />
      <Flex width="100%" justify="center" gap={{ initial: '20px', xs: '50px' }}>
        <AnimationBox
          maxWidth="300px" // 최대 크기 제한
          direction="column"
        >
          <Box my="0" width="100%" position="relative">
            <AspectRatio ratio={2 / 3}>
              <Image
                fill
                src={'/tebas/SEOK.jpg'}
                alt={'S'}
                style={{
                  objectFit: 'cover',
                  boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
                }}
                sizes={'(max-width: 768px) 45vw, 20vw'}
              />
            </AspectRatio>
            <Name
              size={{ initial: '1', xs: '6' }}
              as="div"
              align="center"
              zIndex="1"
              style={{
                position: 'absolute',
                bottom: '5px',
                width: '100%',
                color: 'white',
                paddingBottom: '5px',
              }}
            >
              이석준
            </Name>
          </Box>
          <AnimationBox2>
            <SName as="div" align="center" width="100%" weight="bold">
              S
            </SName>
          </AnimationBox2>
        </AnimationBox>
        <AnimationBox
          maxWidth="300px" // 최대 크기 제한
          direction="column"
        >
          <Box my="0" width="100%" position="relative">
            <AspectRatio ratio={2 / 3}>
              <Image
                fill
                src={'/tebas/SON.jpg'}
                alt={'마페'}
                style={{
                  objectFit: 'cover',
                  boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
                }}
                sizes={'(max-width: 768px) 45vw, 20vw'}
              />
            </AspectRatio>
            <Name
              as="div"
              align="center"
              zIndex="1"
              style={{
                position: 'absolute',
                bottom: '5px',
                width: '100%',
                color: 'white',
                paddingBottom: '5px',
              }}
            >
              손우현
            </Name>
          </Box>
          <AnimationBox2>
            <MartinName as="div" align="center" width="100%" weight="bold">
              마르틴 산토스&페데리코
            </MartinName>
          </AnimationBox2>
        </AnimationBox>
      </Flex>
      <TypingEffect
        style={{
          fontFamily: 'GowunBatang-Regular',
          marginTop: '80px',
          color: 'black',
        }}
      >
        세상에 알려진 나, 오이디푸스가 이렇게 왔노라.
      </TypingEffect>
    </Flex>
  );
};

export default CastBoard;
