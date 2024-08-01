import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Heading, Text, AspectRatio, Separator, Section } from '@radix-ui/themes';
import liveAloneDetailData from '../data/liveAloneData.json';
import styled from 'styled-components';

function EpisodeDetail() {
  const { ep } = useParams();

  const data = liveAloneDetailData.flatMap(year => year.episode).find(episode => episode.ep == ep)

  if (!data) return <Box p="4">콘텐츠를 찾을 수 없습니다.</Box>;
  
  return (
    <Box className="filmo-detail" p="4" style={{ maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      <Flex direction="row" gap="4">
        <Box style={{ flexBasis: '30%', maxWidth: '200px' }}>
          <AspectRatio ratio={3 / 2}>
            <img 
              src={`${process.env.PUBLIC_URL}${data.imgUrl}`} 
              alt={data.note} 
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </AspectRatio>
        </Box>
        
        <Box style={{ flexBasis: '60%' }}>
          <Heading size="6" mb="2">{data.ep}{data.note}</Heading>
          {data.date && <Text as="p" size="4" mb="2">{data.date}</Text>}
        </Box>
      </Flex>
      <EpisodeList />
      <Separator size="4" my="4" />
    </Box>
  );
}

const EpisodeSection = ({ episode }) => {
  const images = imageList[episode.ep] || [];
  return (
    <Section size="2">
      <Flex direction="column" gap="2">
        <Grid columns={{ initial: '2', sm: '3', md: '4' }} gap="4" border="">
          {images.map((image, index) => (
            <Box align="center" style={{border: "solid 1px #ffffff", shadow: 'var(--shadow-3);'}}>
              <AspectRatio key={index} ratio={1 / 1}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/filmo_liveAlone/${episode.ep}/${image}`}
                  alt={`Episode ${episode.ep} - Image ${index + 1}`}
                  style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '4px' }}
                />
              </AspectRatio>
              <Text size="1">{image}</Text>
            </Box>
          ))}
        </Grid>
      </Flex>
    </Section>
  );
};

const EpisodeList = () => (
  <Flex direction="column" gap="4">
    {episodesData.flatMap(year => 
      year.episode.map(episode => (
        <EpisodeSection key={episode.id} episode={episode} />
      ))
    )}
  </Flex>
);

export default EpisodeDetail;