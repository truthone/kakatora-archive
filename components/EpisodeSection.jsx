'use client'
import React from 'react';
import { Card, Text, Flex, Grid, AspectRatio, Heading, Box, Section, Container } from '@radix-ui/themes';
import episodesData from '../data/liveAloneDetailData.json';
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
const EpisodeList = ({ episode }) => {
  const [headerRef, isSticky] = useStickyHeader();
  const imagesObj = imageList[episode.ep] || [];
  return (
    <Container px="5" py="3" width={{initial: '100%', lg: '1200px'}}>
      <Flex direction="column" gap="3">
        <StickyHeading size="3" ref={headerRef} className={isSticky ? 'active' : ''} wrap="balance">
          <Text as="div" size="3" weight="bold">{episode.ep}회 | {episode.date}</Text>
          <Text as="div" size="3" weight="bold">{episode.note}</Text>
        </StickyHeading>
        <Grid columns={{ initial: '1', sm: '3', md: '4' }} gap="3" border="">
          {imagesObj.map((obj, index) => (
            <GridImageItem key={index} filename={obj.filename} episode={episode} index={index} title={obj.title}/>
          ))}
        </Grid>
      </Flex>
    </Container>
  );
};

const EpisodeSection = () => (
  <Flex direction="column" gap="4">
    {episodesData.flatMap(year => 
      year.episode.map(episode => (
        <EpisodeList key={episode.id} episode={episode} />
      ))
    )}
  </Flex>
);

export default EpisodeSection;