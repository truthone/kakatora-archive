import React from 'react';
import { Box, Heading, Flex, AspectRatio, Card, Text } from '@radix-ui/themes';

function FilmoRow({ title, contents }) {
  return (
    <Box my="4">
      <Heading size="6" mb="4" ml="6">{title}</Heading>
      <Flex gap="3" px="6" style={{ overflowX: 'auto' }}>
        {contents.map((content, id) => (
          <Card key={id} style={{ width: '180px', flexShrink: 0 }}>
            <AspectRatio ratio={2/3} style={{padding: '0'}}>
              <img 
                src={`${process.env.PUBLIC_URL}${content.imgUrl}`} 
                alt={content.title} 
                style={{ 
                  objectFit: 'cover', 
                  width: '100%', 
                  height: '100%',
                  borderTopLeftRadius: 'var(--radius-2)',
                  borderTopRightRadius: 'var(--radius-2)'
                }}
              />
            </AspectRatio>
            <Box p='2'>
              <Text size="2" style={{ whiteSpace: 'break-spaces' }}>
                {content.title}
              </Text>
            </Box>
          </Card>
        ))}
      </Flex>
    </Box>
  );
}

export default FilmoRow;
