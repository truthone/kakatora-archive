import React from 'react';
import { Container, Heading, Box, Flex, Card, AspectRatio, Text } from '@radix-ui/themes';

// 데이터 import (실제 환경에서는 이 부분을 적절히 수정해야 합니다)
import filmoData from '../data/filmoDataByYear.json';

function FilmoByCategory() {
  // 모든 연도의 데이터를 하나의 배열로 합칩니다
  const allData = filmoData.filmo_data_by_year.reduce((acc, yearData) => {
    Object.keys(yearData).forEach(key => {
      if (Array.isArray(yearData[key])) {
        if (!acc[key]) acc[key] = [];
        acc[key] = [...acc[key], ...yearData[key]];
      }
    });
    return acc;
  }, {});

  const categories = ['movies', 'dramas', 'tv_appearances', 'musicals'];

  const getCategoryTitle = (category) => {
    switch (category) {
      case 'movies': return '영화';
      case 'dramas': return '드라마';
      case 'tv_appearances': return 'TV 출연';
      case 'musicals': return '연극';
      default: return category;
    }
  };

  return (
    <Container>
      {categories.map((category) => (
        <Box key={category} my="6">
          <Heading size="6" mb="4">
            {getCategoryTitle(category)}
          </Heading>
          <Flex gap="3" style={{ overflowX: 'auto' }}>
            {allData[category]?.map((item) => (
              <Card 
                key={item.id} 
                style={{ width: '200px', flexShrink: 0 }}
              >
                <AspectRatio ratio={2/3}>
                  <img 
                    src={item.imgUrl} 
                    alt={item.title} 
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </AspectRatio>
                <Box p="2">
                  <Text size="2" weight="bold">{item.title}</Text>
                  <Text size="1">{item.role}</Text>
                  {item.year && <Text size="1">{item.year}</Text>}
                </Box>
              </Card>
            ))}
          </Flex>
        </Box>
      ))}
    </Container>
  );
}

export default FilmoByCategory;