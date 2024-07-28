import React from 'react';
import { Box, Heading, Flex, AspectRatio, Card, Text } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';

function EpisodeRow({ title, contents }) {
  const navigate = useNavigate();

  const handleCardClick = (content) => {
    navigate(`/filmo/${content.id}`);
  };

  return (
    <Box my="4">
      <Heading size="6" mb="4" ml="6">{title}</Heading>
      <Flex gap="3" px="6" style={{ overflowX: 'auto' }}>
        {contents.map((content, id) => (
          <Card 
            key={id}
            style={{ flexShrink: 0, cursor: 'pointer', width: "280px" }}
            onClick={() => handleCardClick(content)}
          >
            <AspectRatio ratio={16/9} style={{padding: '0'}}>
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
              <Text weight="bold" size="3" wrap="pretty">
                {content.note}
              </Text> 
            </Flex>
          </Card>
        ))}
      </Flex>
    </Box>
  );
}

export default EpisodeRow;