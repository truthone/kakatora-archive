import React from 'react';
import { Box, Heading, Text, AspectRatio, Flex, Card } from '@radix-ui/themes';
import { specialFeatureData } from './dummyData';

function SpecialFeature() {
  return (
    <Box p="4">
      <Heading size="8" mb="4">{specialFeatureData.title}</Heading>

      <AspectRatio ratio={16/9}>
        <img 
          src={specialFeatureData.image} 
          alt={specialFeatureData.title} 
          style={{objectFit: 'cover', width: '100%', height: '100%'}}
        />
      </AspectRatio>

      <Text size="5" mt="4">{specialFeatureData.intro}</Text>

      <Box my="6">
        <Text>{specialFeatureData.content}</Text>
      </Box>

      <Box>
        <Heading size="6" mb="2">관련 작품</Heading>
        <Flex gap="4" wrap="wrap">
          {specialFeatureData.relatedWorks.map(work => (
            <Card key={work.id} style={{width: '200px'}}>
              <AspectRatio ratio={3/4}>
                <img 
                  src={work.image} 
                  alt={work.title} 
                  style={{objectFit: 'cover', width: '100%', height: '100%'}}
                />
              </AspectRatio>
              <Box p="2">
                <Text as="p" size="2" weight="bold">{work.title}</Text>
              </Box>
            </Card>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}

export default SpecialFeature;