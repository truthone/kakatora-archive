'use client';

import React from 'react';
import {
  Container,
  Heading,
  Box,
  Flex,
  Card,
  AspectRatio,
  Text,
  Separator,
  Section,
} from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import filmoData from '../data/filmoDataByYear.json';
import ScrollArrowWrapper from './ScrollArrowWrapper';

function FilmoByCategory() {
  const router = useRouter();

  const handleCardClick = (content) => {
    if (content.url) {
      router.push(`${content.url}`);
    } else {
      router.push(`/filmography/${content.id}`);
    }
  };

  // 모든 연도의 데이터를 하나의 배열로 합치고 역순으로 정렬합니다
  const allData = filmoData?.filmo_data_by_year?.reduce((acc, yearData) => {
    Object.keys(yearData).forEach((key) => {
      if (Array.isArray(yearData[key])) {
        if (!acc[key]) acc[key] = [];
        acc[key] = [...acc[key], ...yearData[key]];
      }
    });
    return acc;
  }, {});

  // 각 카테고리의 데이터를 연도 기준으로 내림차순 정렬합니다
  Object.keys(allData).forEach((category) => {
    allData[category].sort((a, b) => b.year - a.year);
  });

  const categories = ['movies', 'dramas', 'tv_appearances', 'musicals'];

  const getCategoryTitle = (category) => {
    switch (category) {
      case 'movies':
        return '영화';
      case 'dramas':
        return '드라마';
      case 'tv_appearances':
        return 'TV 출연';
      case 'musicals':
        return '연극';
      default:
        return category;
    }
  };

  return (
    <Section size="1">
      {categories.map((category) => (
        <Box key={category} my="7">
          <Heading size="6">
            {getCategoryTitle(category)}
          </Heading>
          <Box ml="6">
            <ScrollArrowWrapper itemWidth={200} gap={12}>
            <Flex gap="3" py="3">
              {allData[category]?.map((item) => (
                <Card
                  key={item.id}
                  style={{ width: '200px', flexShrink: 0, cursor: 'pointer' }}
                  onClick={() => handleCardClick(item)}
                  className="item"
                >
                  <AspectRatio ratio={2 / 3}>
                    <Image
                      src={item.imgUrl}
                      alt={item.title}
                      style={{ objectFit: 'cover' }}
                      sizes={'(max-width: 768px) 100vw, 30vw'}
                      fill
                    />
                  </AspectRatio>
                  <Box p="2">
                    <Text
                      size="2"
                      weight="bold"
                      style={{ whiteSpace: 'break-spaces' }}
                    >
                      {item.title}
                    </Text>
                    <Separator
                      orientation="horizontal"
                      style={{ margin: '4px 0' }}
                    />
                    {item.year && <Text size="2">{item.year}</Text>}
                  </Box>
                </Card>
              ))}
            </Flex>
            </ScrollArrowWrapper>
          </Box>
        </Box>
      ))}
    </Section>
  );
}

export default FilmoByCategory;
