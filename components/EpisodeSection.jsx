'use client'
import React from 'react';
import { Card, Text, Flex, Grid, AspectRatio, Heading, Box, Section, Container } from '@radix-ui/themes';
import imageList from '../data/imageList.json';
import useStickyHeader from '../hooks/useStickyHeader';
import styled from 'styled-components';
import GridImageItem from './GridImageItem';

const StickyHeading = styled(Box)`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 55px;
  z-index: 1;
  background-color: var(--gray-1);
  padding: 20px 0;
`;
const EpisodeList = ({ episode, hasHeader }) => {
  const [headerRef, isSticky] = useStickyHeader();
  const imagesObj = imageList[episode.ep] || [];
  return (
    <Container px="5" py="3" width={{initial: '100%', lg: '1200px'}}>
      <Flex direction="column" gap="3">
        { 
          hasHeader ? 
            <StickyHeading size="3" ref={headerRef} className={isSticky ? 'active' : ''} wrap="balance">
              <Text as="div" size="3" weight="bold">{episode.ep}회 | {episode.date}</Text>
              <Text as="div" size="3" weight="bold">{episode.note}</Text>
            </StickyHeading>
          : <></>
        }
        <Grid columns={{ initial: '1', xs:'2', sm: '3', md: '4' }} gap="3" border="">
          {imagesObj.map((obj, index) => (
            <GridImageItem key={index} filename={obj.filename} episode={episode} index={index} title={obj.title}/>
          ))}
        </Grid>
      </Flex>
    </Container>
  );
};

const EpisodeSection = ({ year, episodesData }) => {
  const isArray = Array.isArray(episodesData);

  // 배열이 아니면 배열로 변환
  const episodesArray = isArray ? episodesData : [episodesData].filter(Boolean);

  // year로 필터링
  const filteredEpisodes = year
    ? episodesArray.filter(episode => episode && episode.year === parseInt(year))
    : episodesArray;

  if (filteredEpisodes.length === 0) {
    return <Box>{year ? `${year}년도의 에피소드를 찾을 수 없습니다.` : '에피소드를 찾을 수 없습니다.'}</Box>;
  }

  return (
    <Flex direction="column" gap="4">
        { filteredEpisodes.map(data => (
            <Flex key={data.year} direction="column" gap="4">
              { 
                  Object.hasOwn(data, "episode") ? 
                  (
                    data.episode.map(episode => (
                      <EpisodeList key={episode.id} episode={episode} />
                    ))
                  )             
                  : <EpisodeList key={data.id} episode={data} /> 
              }
            </Flex>
          ))
        }
    </Flex>
  );
};

export default EpisodeSection;