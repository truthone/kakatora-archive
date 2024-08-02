import React from 'react';
import { Card, Text, Flex, Grid, AspectRatio, Heading, Box, Section, Container } from '@radix-ui/themes';
import episodesData from '../data/liveAloneData.json';
import imageList from '../data/imageList.json';
import useStickyHeader from '../hooks/useStickyHeader';
import styled from 'styled-components';
import GridItem from './GridItem';

const formatImageTitle = (filename) => {
  // '.png' 제거
  let title = filename.replace('.png', '');
  
  // 언더스코어나 대시를 공백으로 변경 (선택사항)
  title = title.replace(/[_]/g, ' ');
  
  return title;
};
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
  const images = imageList[episode.ep] || [];
  return (
    <Container px="5" py="3" width={{initial: '100%', lg: '1200px'}}>
      <Flex direction="column" gap="3">
        <StickyHeading size="3" ref={headerRef} className={isSticky ? 'active' : ''} wrap="balance">
          <Text as="div" size="3" weight="bold">{episode.ep}회 | {episode.date}</Text>
          <Text as="div" size="3" weight="bold">{episode.note}</Text>
        </StickyHeading>
        <Grid columns={{ initial: '2', sm: '3', md: '4' }} gap="3" border="">
          {images.map((image, index) => (
            <GridItem image={image} episode={episode} index={index} formatImageTitle={formatImageTitle}/>
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