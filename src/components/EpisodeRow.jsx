import React from 'react';
import { Box, Heading, Flex, AspectRatio, Card, Text } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';

function EpisodeRow({ title, contents }) {
  const navigate = useNavigate();

  const handleCardClick = (content) => {
    navigate(`/liveAlone/ep/${content.ep}`);
  };

  return (
    <Box>
      <Heading size="6" mb="4">{title}</Heading>
      <Flex my="4" direction={{initial: "column", xs: "row"}} wrap="wrap" gap="3" width="100%" justify="start">
        {contents.map((content, id) => (
          <Box width={{initial: "100%", xs: "280px"}}>
            <Card 
              key={id}
              style={{ flexShrink: 0, cursor: 'pointer'}}
              onClick={() => handleCardClick(content)}
            >
              <AspectRatio ratio={3/2} style={{padding: '0'}}>
                <img 
                  src={`${process.env.PUBLIC_URL}${content.imgUrl}`} 
                  alt={`${content.title}${content.note}`}
                  style={{ 
                    objectFit: 'cover', 
                    width: '100%', 
                    height: '100%',
                    borderRadius: 'var(--radius-2)'
                  }}
                />
              </AspectRatio>
              <Flex p='2' direction="column" wrap="wrap">
                <Text weight="medium" size="3">{content.date} | {content.ep}회 </Text>
                <Text weight="bold" size="3" wrap="pretty">{content.note}</Text> 
              </Flex>
            </Card>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export default EpisodeRow;