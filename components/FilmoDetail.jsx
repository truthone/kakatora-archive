'use client'
import React from 'react';
import { Box, Flex, Heading, Text, AspectRatio, Separator, Section } from '@radix-ui/themes';
import ArticleRow from './ArticleRow';
import filmoDataByYear from '../data/filmoDataByYear.json';
import liveAloneDetailData from '../data/liveAloneDetailData.json';
import OttLogo from './OttLogo';
import styled from 'styled-components';
import EpisodeRow from './EpisodeRow';
import Image from 'next/image';

const FilmoRowContainer = styled(Box)`
  position: relative;
  margin-bottom: 20px; /* 로우 간의 간격 */
  flexBasis: '60%' 
`;

function FilmoDetail({ id }) {

  // filmoDataByYear에서 해당 id를 가진 작품 찾기
  const filmo = filmoDataByYear.filmo_data_by_year.flatMap(year => 
    [...(year.movies || []), ...(year.dramas || []), ...(year.musicals || []), ...(year.tv_appearances || [])]
  ).find(item => item.id === id);
  if (!filmo) return <Box p="4">필모그래피를 찾을 수 없습니다.</Box>;

  return (
    <Box className="filmo-detail" p="4" style={{ maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      <Flex direction="row" gap="4" justify="start">
        <Box style={{ flexBasis: '30%', maxWidth: '200px' }}>
          <AspectRatio ratio={2 / 3}>
            <Image 
              src={filmo.imgUrl} 
              alt={filmo.title} 
              style={{objectFit: 'cover'}}
              fill
            />
          </AspectRatio>
        </Box>
        
        <Box style={{ flexBasis: '60%' }}>
          <Heading size="6" mb="2">{filmo.title}</Heading>
          <Text as="p" size="4" mb="2">역할: {filmo.role}</Text>
          {filmo.note && <Text as="p" size="4" mb="2">비고: {filmo.note}</Text>}
          {filmo.broadcaster && <Text as="p" size="4" mb="2">방송사: {filmo.broadcaster}</Text>}
          {filmo.year && <Text as="p" size="4" mb="2">연도: {filmo.year}</Text>}
          {filmo.ott && ( 
            <Flex display="box" justify="start" align="start" wrap="wrap" gap="2" mb="4">
              <Text as="p" size="3">시청 가능한 곳:</Text>
              {filmo.ott.map((ottName) => (
              <OttLogo key={ottName} ott={ottName} />
              ))}
            </Flex>)}
        </Box>
      </Flex>

      <Separator size="4" my="4" />

      {filmo.title === "나 혼자 산다" && (
        <Box>
        {
          liveAloneDetailData?.map((yearData, index) => (
            <Box key={index} mt="6">
              <Heading size="6" p="4" mb="4">{yearData?.year}</Heading>
              {yearData?.episode && yearData.episode.length > 0 && (
                <EpisodeRow title="" contents={yearData?.episode} />
              )}
            </Box>
        ))}
        </Box>
      )}
    </Box>
  );
}

export default FilmoDetail;