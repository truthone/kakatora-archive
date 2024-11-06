'use client';
import React from 'react';
import { Flex, Section, Heading, Container } from '@radix-ui/themes';
import liveAloneDetailData from '../../../data/liveAloneDetailData.json';
import EpisodeSection from '../../../components/EpisodeSection';
import FallbackComponent from '../../../components/FallbackComponent';

export default function LiveAloneAllCapturesPage() {
  const episodesData = liveAloneDetailData.flatMap((year) => year.episode);

  if (!episodesData)
    return (
      <Flex p="4" justify="center" align="center" width="auto" height="90vh">
        <FallbackComponent
          message={'콘텐츠를 찾을 수 없습니다.'}
          toggleMark={true}
        />
      </Flex>
    );

  return (
    <Container p="4">
      <Section size="1">
        <Heading as="h1" m="2">
          나혼산 짤 모음
        </Heading>
        <EpisodeSection episodesData={episodesData} />
      </Section>
    </Container>
  );
}
