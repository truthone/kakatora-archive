'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  AspectRatio,
  Separator,
  Theme,
  Skeleton,
} from '@radix-ui/themes';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import useFetchTebasSchedule from '../hooks/useFetchTebasSchedule';

const CastBoard = () => {
  const { scheduleData, currentSchedule, loading, error } =
    useFetchTebasSchedule();
  console.log(currentSchedule);

  const getSrcFromName = (name) => {
    switch (name) {
      case '이석준':
        return 'SEOK';
      case '김남희':
        return 'NAM';
      case '길은성':
        return 'GIL';
      case '정희태':
        return 'HEE';
      case '이주승':
        return 'JU';
      case '손우현':
        return 'SON';
      case '정택운':
        return 'TAEK';
      case '강승호':
        return 'KANG';
      default:
        return null; // 매치되지 않는 경우
    }
  };
  const S_SRC = getSrcFromName(currentSchedule?.akaS);
  const MARTIN_SRC = getSrcFromName(currentSchedule?.martin);

  return (
    <Flex
      m={{ initial: '10px', sm: '80px', xs: '100px' }}
      position="relative"
      direction="column"
      p={{ initial: '30px 50px', sm: '50px 80px', xs: '100px' }}
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
      <Flex justify="flex-start" align="flex-start" width="100%">
        <Heading
          align="center"
          size={{ initial: '1', xs: '3' }}
          mb="0.5rem"
          style={{
            color: 'rgba(43,59,63,0.68)',
            fontFamily: 'GowunBatang-Regular',
            fontWeight: '500',
            fontStyle: 'italic'
          }}
        >
          {currentSchedule?.date},{currentSchedule?.day}{' '}
          {currentSchedule?.note !== '공연없음' && currentSchedule?.time}{' '}{currentSchedule?.note}
        </Heading>
      </Flex>
      <Heading
        align="center"
        size={{ initial: '5', xs: '8' }}
        style={{ color: 'rgba(175,25,27,255)', fontFamily: 'SBAggroB' }}
      >
        TODAY'S CAST
      </Heading>
      <Separator size="4" my={{ initial: '2', xs: '4' }} />
      {currentSchedule?.note === '공연없음' ? (
        <Flex
          width="100%"
          justify="center"
          align="center"
          height="40%"
          gap={{ initial: '20px', xs: '50px' }}
        >
          <AnimationBox>
            <Text
              size="7"
              align="center"
              as="div"
              style={{ color: '#2b3b3f', fontFamily: 'GowunBatang-Regular' }}
            >
              공연 없음
            </Text>
          </AnimationBox>
        </Flex>
      ) : (
        <Flex
          width="100%"
          justify="center"
          gap={{ initial: '20px', xs: '50px' }}
        >
          <AnimationBox
            maxWidth="300px" // 최대 크기 제한
            direction="column"
          >
            <Box my="0" width="100%" position="relative">
              <Skeleton loading={(S_SRC === null ? true: false)}>
              <AspectRatio ratio={2 / 3}>
                <Image
                  fill
                  src={`/tebas/${S_SRC}.jpg`}
                  alt={'S'}
                  style={{
                    objectFit: 'cover',
                    boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
                  }}
                  sizes={'(max-width: 768px) 45vw, 20vw'}
                />
              </AspectRatio>
              </Skeleton>
              <Name
                size={{ initial: '1', xs: '6' }}
                as="div"
                align="center"
                style={{
                  zIndex: '1',
                  position: 'absolute',
                  bottom: '5px',
                  width: '100%',
                  color: 'white',
                  paddingBottom: '5px',
                }}
              >
                {currentSchedule?.akaS}
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
                <Skeleton loading={MARTIN_SRC === null ? true : false}>
              <AspectRatio ratio={2 / 3}>
                <Image
                  fill
                  src={`/tebas/${MARTIN_SRC}.jpg`}
                  alt={'마페'}
                  style={{
                    objectFit: 'cover',
                    boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
                  }}
                  sizes={'(max-width: 768px) 45vw, 20vw'}
                />
              </AspectRatio>
              </Skeleton>
              <Name
                as="div"
                align="center"
                style={{
                  zIndex: '1',
                  position: 'absolute',
                  bottom: '5px',
                  width: '100%',
                  color: 'white',
                  paddingBottom: '5px',
                }}
              >
                {currentSchedule?.martin}
              </Name>
            </Box>
            <AnimationBox2>
              <MartinName as="div" align="center" width="100%" weight="bold">
                마르틴 산토스&페데리코
              </MartinName>
            </AnimationBox2>
          </AnimationBox>
        </Flex>
      )}
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

export default CastBoard;
