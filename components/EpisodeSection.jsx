'use client';
import React, { useState, useEffect } from 'react';
import { Button, Flex, Grid, Box, Section } from '@radix-ui/themes';
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
                url={obj.url}
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
  const [allImages, setAllImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Google Sheets API에서 이미지 데이터 가져오기
    const fetchImagesFromSheet = async () => {
      try {
        const response = await fetch('/api/fetchImages'); // App Router API 경로
        if (!response.ok) throw new Error('Failed to fetch images');
        
        const data = await response.json();

        // 데이터 확인을 위한 콘솔 로그 추가
        console.log('Fetched data:', data);

        // 필요한 형식으로 데이터 매핑
        const images = data.map((obj) => ({
          episode: obj.Episode,
          title: obj.Title,
          filename: obj.Filename,
          url: obj.Url,
        }));

        setAllImages(images);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImagesFromSheet();
  }, [year, episodesData]);

  if (isLoading) {
    return <ContentFallback />;
  }

  if (allImages.length === 0) {
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
        <EpisodeImageGridList images={allImages} />
      </Flex>
    </Section>
  );
};

export default EpisodeSection;
