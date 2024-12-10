'use client';

import React from 'react';
import { Button, Flex, Grid, Section, Separator, Text } from '@radix-ui/themes';
import GridImageItem from './GridImageItem';
import ContentFallback from './ContentFallback';
import SpriteAnimation from './SpriteAnimation';

const EpisodeImageGridList = ({ images = [], fetchMore, hasMore, loading }) => {
  return (
    <Flex direction="column" gap="3">
      {images.length !== 0 ? (
        <>
          <Grid
            columns={{ initial: '2', xs: '2', sm: '3', md: '4' }}
            gap="3"
            border=""
          >
            {images.map((obj, index) => (
              <GridImageItem
                key={index}
                url={obj.url}
                episode={obj.episode_id}
                index={index}
                title={obj.title}
              />
            ))}
          </Grid>
          {hasMore && (
            <Flex justify="center">
              <Button
                onClick={fetchMore}
                variant="ghost"
                radius="full"
                size="4"
                my="7"
                mx="auto"
                disabled={loading} // 로딩 중이면 버튼 비활성화
              >
                <Text size="7" mx="4">{loading ? (<SpriteAnimation />) : '더보기'}</Text>
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


const EpisodeSection = ({ images, loading, fetchMore, hasMore }) => {
  if (loading && images.length === 0) return <SpriteAnimation />; // 첫 로딩

  return (
    <>
      <Separator size="4" />
      <Section size="1">
        <Flex direction="column" gap="4">
          <EpisodeImageGridList
            images={images}
            fetchMore={fetchMore}
            hasMore={hasMore}
            loading={loading}
          />
        </Flex>
      </Section>
    </>
  );
};

export default EpisodeSection;
