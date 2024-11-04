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
  Blockquote,
} from '@radix-ui/themes';
import styled from 'styled-components';
import filmoDataByYear from '../data/filmoDataByYear.json';
import OttLogo from './OttLogo';
import BlurBackgroundComponent from '../components/BlurBackgroundComponent';
import Image from 'next/image';
import YoutubeRow from './YoutubeRow';
import ArticleSection from './ArticleSection';

const BlurContainer = styled(Box)`
  position: relative;
  overflow: hidden;
  height: auto;
  width: 100%;
`;

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
  if (!filmo) return <Box p="4">콘텐츠를 찾을 수 없습니다.</Box>;
  return (
    <Section p="0" className="filmo-detail">
      <BlurContainer>
        <BlurBackgroundComponent imageUrl={filmo.imgUrl} />
        <Flex
          direction="row"
          gap="4"
          justify="start"
          position="relative"
          p={{ initial: '4', xs: '8' }}
        >
          <Box style={{ flexBasis: '50%', maxWidth: '300px', zIndex: '1' }}>
            <AspectRatio ratio={2 / 3}>
              <Image
                fill
                src={filmo.imgUrl}
                alt={filmo.title}
                style={{ objectFit: 'cover' }}
                sizes={'(max-width: 768px) 100vw, 30vw'}
              />
            </AspectRatio>
          </Box>
          <Box style={{ flexBasis: '60%' }}>
            <Heading size={{ md: '9', initial: '8' }} mb="3">
              <Flex>
                {filmo?.title}&nbsp;{filmo?.year}
              </Flex>
            </Heading>
            <Separator size="4" my="2" />
            <Flex gap="3" align="center">
              <Text as="p" my="2" size={{ sm: '7', initial: '5' }}>
                {filmo?.role}
              </Text>
              <Separator size="2" orientation="vertical" />
              <Text as="p" my="2" size={{ sm: '7', initial: '5' }}>
                {filmo?.note}
              </Text>
            </Flex>
            <Text as="p" my="2" size={{ sm: '6', initial: '3' }}>
              {filmo?.broadcaster}
            </Text>
            <Blockquote as="p" my="2" size={{ sm: '6', initial: '3' }}>
              {filmo?.desc}
            </Blockquote>
          </Box>
        </Flex>
      </BlurContainer>
      {/* <Separator size="4" my="4" /> */}
      <Box p={{ initial: '4', xs: '8' }}>
        {filmo.id.split('_')[0] !== 'musical' && (
          <Section size="1">
            <Heading size="6" mb="4">
              시청 가능한 곳
            </Heading>
            <Tabs.Root defaultValue="subscribe">
              <Tabs.List size="2">
                <Tabs.Trigger value="subscribe">구독•구매•대여</Tabs.Trigger>
                {/* <Tabs.Trigger value="purchase">구매 또는 대여</Tabs.Trigger> */}
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
                    {filmo.ott_subscribe ? (
                      filmo.ott_subscribe?.map((ott, index) =>
                        ott.link ? (
                          <a
                            key={index}
                            href={ott.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <OttLogo ott={ott.platform} />
                          </a>
                        ) : (
                          <OttLogo key={index} ott={ott.platform} />
                        )
                      )
                    ) : (
                      <Text weight="light"> 시청 가능한 곳이 없어요..😭 </Text>
                    )}
                  </Flex>
                </Tabs.Content>
                {/* <Tabs.Content value="purchase">
                  <Flex
                    display="box"
                    justify="start"
                    align="start"
                    wrap="wrap"
                    gap="2"
                    mb="4"
                  >
                    {filmo.ott_purchase ? (
                      filmo.ott_purchase?.map((ott, index) =>
                        ott.link ? (
                          <a
                            key={index}
                            href={ott.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <OttLogo ott={ott.platform} />
                          </a>
                        ) : (
                          <OttLogo key={index} ott={ott.platform} />
                        )
                      )
                    ) : (
                      <Text weight="light"> 시청 가능한 곳이 없어요..😭 </Text>
                    )}
                  </Flex>
                </Tabs.Content> */}
              </Box>
            </Tabs.Root>
            <Separator size="4" my="4" />
          </Section>
        )}
        <ArticleSection />
        <Separator size="4" my="4" />
      </Box>
      <Box pl={{ initial: '4', xs: '8' }}>
        <YoutubeRow SectionTitle={'관련 영상'} playlistId={filmo.playlistId} />
      </Box>
    </Section>
  );
}

export default FilmoDetail;
