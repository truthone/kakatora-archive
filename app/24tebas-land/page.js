'use client';
import React, { useState } from 'react';
import { Flex, Container, Theme } from '@radix-ui/themes';
import CastBoard from '../../components/CastBoard';
import ScheduleBoard from '../../components/ScheduleBoard';
import styled from 'styled-components';

export default function TebasLand({}) {
  return (
    <Theme accentColor='indigo'>
      <Flex direction="column" height="inherit" justify="start">
        <BgBox id="cast-board">
          <CastBoard />
        </BgBox>
        <Container mt="9" id="schedule">
          <ScheduleBoard />
        </Container>
      </Flex>
    </Theme>
  );
}

const BgBox = styled(Flex)`
background-image: url('/tebas/bg-ball.jpg');
background-repeat: no-repeat;
background-size: cover;
width: 100%;
height: auto;
/* 반응형 스타일 */
@media (max-width: 768px) {
  aspect-ratio: 9 / 16; /* 모바일 비율 */
  background-position: top;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-position: center top 90%;
  justify-content: flex-start;
}

@media (min-width: 769px) {
  aspect-ratio: 16 / 9;
  width: 100vw;
  background-position: center top 90%;
  flex-direction: row;
justify-content: center;
}
`;