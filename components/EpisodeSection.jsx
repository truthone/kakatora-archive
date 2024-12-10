'use client';
import React, { useState } from 'react';
import { Button, Flex, Grid, Section, Separator, Text } from '@radix-ui/themes';
import GridImageItem from './GridImageItem';
import ContentFallback from './ContentFallback';
import SpriteAnimation from './SpriteAnimation';

const INITIAL_IMAGE_COUNT = 8;
const LOAD_MORE_COUNT = 8;

const EpisodeImageGridList = ({ images = [] }) => {
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
            {images
              .slice(0, visibleCount) // url이 존재하는 항목만 남기기
              .map((obj, index) => (
                <GridImageItem
                  key={index}
                  url={obj.url}
                  episode={obj.episode}
                  index={index}
                  title={obj.title}
                />
              ))}
          </Grid>
          {visibleCount < images.length && (
            <Flex justify="center">
              <Button
                onClick={handleLoadMore}
                variant="ghost"
                radius="full"
                size="4"
                my="7"
                mx="auto"
              >
                <Text size="7" mx="4">더보기</Text>
              </Button>
            </Flex>
          )}
        </>
      ) : (
        <ContentFallback />
      )}
    </Flex>
  );
};

const EpisodeSection = ({ images, loading }) => {
  if(loading) return <SpriteAnimation />
  return (
    <>
      <Separator size="4" />
      <Section size="1">
        <Flex direction="column" gap="4">
          <EpisodeImageGridList images={images} />
        </Flex>
      </Section>
    </>
  );
};

export default EpisodeSection;
