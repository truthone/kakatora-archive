'use client';
import React, { useState } from 'react';
import { Button, Flex, Grid, Box, Section } from '@radix-ui/themes';
import imageList from '../data/imageList.json';
import GridImageItem from './GridImageItem';
import ContentFallback from './ContentFallback';

const INITIAL_IMAGE_COUNT = 8; 
const LOAD_MORE_COUNT = 8; 

const EpisodeImageGridList = ({ images }) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_IMAGE_COUNT);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + LOAD_MORE_COUNT);
  };

  return (
    <Flex direction="column" gap="3">
      {images.length !== 0 ? (
        <>
          <Grid
            columns={{ initial: '2', xs: '2', sm: '3', md: '4' }}
            gap="3"
            border=""
          >
            {images.slice(0, visibleCount).map((obj, index) => (
              <GridImageItem
                key={index}
                filename={obj.filename}
                episode={obj.episode}
                index={index}
                title={obj.title}
              />
            ))}
          </Grid>
          {visibleCount < images.length && (
            <Button
              onClick={handleLoadMore}
              variant="ghost"
              width="30vw"
              my="3"
              mx="auto"
            >
              더보기
            </Button>
          )}
        </>
      ) : (
        <ContentFallback />
      )}
    </Flex>
  );
};

const EpisodeSection = ({ year, episodesData }) => {
  const isArray = Array.isArray(episodesData);
  const episodesArray = isArray ? episodesData : [episodesData].filter(Boolean);

  if (episodesArray.length === 0) {
    return (
      <Box>
        {year
          ? `${year}년도의 에피소드를 찾을 수 없습니다.`
          : '에피소드를 찾을 수 없습니다.'}
      </Box>
    );
  }
  
  const allImages = episodesArray.flatMap((data) => {
    const imagesObj = imageList[data.ep] || [];
    return imagesObj.map((obj) => ({
      ...obj,
      episode: data,
    }));
  });

  return (
    <Section size="1">
      <Flex direction="column" gap="4">
        <EpisodeImageGridList images={allImages} />
      </Flex>
    </Section>
  );
};

export default EpisodeSection;
