'use client';
import React, { useState } from 'react';
import { Button, Flex, Grid, Box, Section } from '@radix-ui/themes';
import imageList from '../data/imageList.json';
import GridImageItem from './GridImageItem';
import ContentFallback from './ContentFallback';

const INITIAL_IMAGE_COUNT = 8; // 초기 로드할 이미지 개수
const LOAD_MORE_COUNT = 8; // 더보기 버튼 클릭 시 추가 로드할 이미지 개수

const EpisodeImageGridList = ({ images }) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_IMAGE_COUNT);

  // 더보기 클릭 시 현재 보이는 이미지 개수를 LOAD_MORE_COUNT만큼 증가시킴
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

  const filteredEpisodes = year
    ? episodesArray.filter(
        (episode) => episode && episode.year === parseInt(year)
      )
    : episodesArray;
  console.log('filteredEpisodes');
  console.log(filteredEpisodes);
  if (filteredEpisodes.length === 0) {
    return (
      <Box>
        {year
          ? `${year}년도의 에피소드를 찾을 수 없습니다.`
          : '에피소드를 찾을 수 없습니다.'}
      </Box>
    );
  }

  const allImages = [];

  if (year) {
    //한개의 에피소드에 대한 이미지만 뽑을때
    filteredEpisodes.flatMap((data) => {
      const imagesObj = imageList[data.ep] || [];
      return imagesObj.map((obj) => ({
        ...obj,
        episode: episode,
      }));
    });
  } else {
    //해당 연도의 여러개 에피소드
    filteredEpisodes.flatMap((dataByYear) => {
      const imagesObj = imageList[dataByYear.ep] || [];
      return imagesObj.map((obj) => ({
        ...obj,
        episode: episode,
      }));
    });
  }

  return (
    <Section size="1">
      <Flex direction="column" gap="4">
        <EpisodeImageGridList images={allImages} />
      </Flex>
    </Section>
  );
};

export default EpisodeSection;
