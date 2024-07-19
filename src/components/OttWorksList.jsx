import React, { useState } from 'react';
import { Box, Heading, Flex, Button, Grid, Card, Text, AspectRatio } from '@radix-ui/themes';
import { ottWorksData } from './dummyData';

function OttWorksList() {
  const [selectedOtt, setSelectedOtt] = useState('all');

  const ottOptions = ['all', 'netflix', 'watcha', 'wavve', 'disney'];

  const filterWorks = (ott) => {
    setSelectedOtt(ott);
  };

  const filteredWorks = selectedOtt === 'all' 
    ? ottWorksData 
    : ottWorksData.filter(work => work.ott === selectedOtt);

  return (
    <Box p="4">
      <Heading size="8" mb="4">OTT별 작품 리스트</Heading>

      <Flex gap="2" wrap="wrap" mb="4">
        {ottOptions.map(ott => (
          <Button 
            key={ott} 
            variant={selectedOtt === ott ? 'solid' : 'outline'}
            onClick={() => filterWorks(ott)}
          >
            {ott.toUpperCase()}
          </Button>
        ))}
      </Flex>

      <Grid columns={{initial: "1", sm: "2", md: "3"}} gap="4">
        {filteredWorks.map(work => (
          <Card key={work.id}>
            <AspectRatio ratio={16/9}>
              <img 
                src={work.image} 
                alt={work.title} 
                style={{objectFit: 'cover', width: '100%', height: '100%'}}
              />
            </AspectRatio>
            <Box p="3">
              <Text as="p" size="3" weight="bold">{work.title}</Text>
              <Text as="p" size="2" color="gray">{work.ott.toUpperCase()}</Text>
            </Box>
          </Card>
        ))}
      </Grid>
    </Box>
  );
}

export default OttWorksList;