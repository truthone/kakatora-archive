'use client';
import React from 'react';
import { Flex, Section, Heading, Container } from '@radix-ui/themes';
import EpisodeSection from '../../../components/EpisodeSection';
import FallbackComponent from '../../../components/FallbackComponent';
import useFetchEpisodeImages from '../../../hooks/useFetchEpisodeImages';

export default function LiveAloneAllCapturesPage() {
  const { images, error, loading } = useFetchEpisodeImages({});

  if (error)
    return (
      <Flex p="4" justify="center" align="center" width="auto" height="90vh">
        <FallbackComponent
          message={'이미지를 준비중이에요.'}
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
        <EpisodeSection images={images} />
      </Section>
    </Container>
  );
}
