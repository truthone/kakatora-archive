'use client';
import React from 'react';
import { Text, Flex, Grid, Box, Section } from '@radix-ui/themes';
import imageList from '../data/imageList.json';
import useStickyHeader from '../hooks/useStickyHeader';
import GridImageItem from './GridImageItem';
import ContentFallback from './ContentFallback';
import StickyHead from './StickyHead';

const EpisodeList = ({ episode, hasHeader }) => {
  const [headerRef, isSticky] = useStickyHeader();
  const imagesObj = imageList[episode.ep] || [];

  return (
    <Flex direction="column" gap="3">
      {hasHeader ? (
        <StickyHead size="3" ref={headerRef}>
          <Text as="div" size="3" weight="bold">
            {episode.ep}회 | {episode.date}
          </Text>
          <Text as="div" size="3" weight="bold">
            {episode.note}
          </Text>
        </StickyHead>
      ) : (
        <></>
      )}
      {imagesObj.length != 0 ? (
        <Grid
          columns={{ initial: '2', xs: '2', sm: '3', md: '4' }}
          gap="3"
          border=""
        >
          {imagesObj.map((obj, index) => (
            <GridImageItem
              key={index}
              filename={obj.filename}
              episode={episode}
              index={index}
              title={obj.title}
            />
          ))}
        </Grid>
      ) : (
        <ContentFallback />
      )}
    </Flex>
  );
};

const EpisodeSection = ({ year, episodesData }) => {
  const isArray = Array.isArray(episodesData);

  // 배열이 아니면 배열로 변환
  const episodesArray = isArray ? episodesData : [episodesData].filter(Boolean);

  // year로 필터링
  const filteredEpisodes = year
    ? episodesArray.filter(
        (episode) => episode && episode.year === parseInt(year)
      )
    : episodesArray;

  if (filteredEpisodes.length === 0) {
    return (
      <Box>
        {year
          ? `${year}년도의 에피소드를 찾을 수 없습니다.`
          : '에피소드를 찾을 수 없습니다.'}
      </Box>
    );
  }

  return (
    <Section size="1">
      <Flex direction="column" gap="4">
        {filteredEpisodes.map((data) => (
          <Flex key={data.year} direction="column" gap="4">
            {Object.hasOwn(data, 'episode') ? (
              data.episode.map((episode) => (
                <EpisodeList key={episode.id} episode={episode} />
              ))
            ) : (
              <EpisodeList key={data.id} episode={data} />
            )}
          </Flex>
        ))}
      </Flex>
    </Section>
  );
};

export default EpisodeSection;
