'use client';
import React, { useState } from 'react';
import filmoDataByYear from '../../data/filmoDataByYear.json';
import FilmoSection from '../../components/FilmoSection';
import FilmoFilter from '../../components/FilmoFilter';
import { Container, Flex } from '@radix-ui/themes';
import Image from 'next/image';
import CastBoard from '../../components/CastBoard';
import styled, { keyframes } from 'styled-components';

export default function TebasLand({}) {
  const BgBox = styled(Flex)`
    background-image: url('/tebas/bg-ball.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: auto;
    justify-content: center;
    /* 반응형 스타일 */
    @media (max-width: 768px) {
      aspect-ratio: 9 / 16; /* 모바일 비율 */
      background-position: top;
    }

    @media (min-width: 769px) {
      aspect-ratio: 16 / 9; /* 데스크탑 비율 */
      background-position: center top 50%;
    }
  `;

  return (
    <Container p={{ initial: '0', md: '0' }} height="80vh" position="relative">
      <BgBox >
        <CastBoard />
      </BgBox>
    </Container>
  );
}
