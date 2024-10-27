'use client';
import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  AspectRatio,
  Separator,
  Tabs,
  Section,
} from '@radix-ui/themes';
import filmoDataByYear from '../data/filmoDataByYear.json';
import OttLogo from './OttLogo';
import styled from 'styled-components';
import Image from 'next/image';
import YouTubeByQueryRow from './YoutubeByQueryRow';
import ArticleSection from './ArticleSection';

function FilmoDetail({ id }) {
  // filmoDataByYear에서 해당 id를 가진 작품 찾기
  const filmo = filmoDataByYear.filmo_data_by_year
    .flatMap((year) => [
      ...(year.movies || []),
      ...(year.dramas || []),
      ...(year.musicals || []),
      ...(year.tv_appearances || []),
    ])
    .find((item) => item.id === id);
  if (!filmo) return <Box p="4">필모그래피를 찾을 수 없습니다.</Box>;

  return (
    <Section size="1" className="filmo-detail">
      <Flex direction="row" gap="4" justify="start">
        <Box style={{ flexBasis: '30%', maxWidth: '200px' }}>
          <AspectRatio ratio={2 / 3}>
            <Image
              src={filmo.imgUrl}
              alt={filmo.title}
              style={{ objectFit: 'cover' }}
              sizes={'(max-width: 768px) 100vw, 30vw'}
              fill
            />
          </AspectRatio>
        </Box>
        <Box style={{ flexBasis: '60%' }}>
          <Heading size="6" mb="2">
            {filmo?.title}
          </Heading>
          <Text as="p" size="4" mb="2">
            역할: {filmo?.note}
            {filmo.role && filmo.note && <>,</>}
            {filmo?.role}
          </Text>
          {filmo.broadcaster && (
            <Text as="p" size="4" mb="2">
              방송사: {filmo?.broadcaster}
            </Text>
          )}
          <Text as="p" size="4" mb="2">
            연도: {filmo?.year}
          </Text>
        </Box>
      </Flex>
      <Separator size="4" my="4" />
      <Section size="1">
        <Heading size="6" mb="4">
          시청 가능한 곳
        </Heading>
        <Tabs.Root defaultValue="subscribe">
          <Tabs.List size="2">
            <Tabs.Trigger value="subscribe">구독</Tabs.Trigger>
            <Tabs.Trigger value="purchase">구매 또는 대여</Tabs.Trigger>
          </Tabs.List>
          <Box pt="3">
            <Tabs.Content value="subscribe">
              <Flex
                display="box"
                justify="start"
                align="start"
                wrap="wrap"
                gap="2"
                mb="4"
              >
                {filmo.ott_subscribe?.map((ottName) => (
                  <OttLogo key={ottName} ott={ottName} />
                ))}
              </Flex>
            </Tabs.Content>
            <Tabs.Content value="purchase">
              <Flex
                display="box"
                justify="start"
                align="start"
                wrap="wrap"
                gap="2"
                mb="4"
              >
                {filmo.ott_purchase?.map((ottName) => (
                  <OttLogo key={ottName} ott={ottName} />
                ))}
              </Flex>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Section>
      <ArticleSection />
      <YouTubeByQueryRow
        SectionTitle={'관련 영상'}
        query={`이주승 ${filmo?.title}`}
      />
    </Section>
  );
}

export default FilmoDetail;
