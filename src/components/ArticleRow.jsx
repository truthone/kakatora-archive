import React from 'react';
import { Card, Box, Heading, Text, Flex } from '@radix-ui/themes';
import LinkPreview from 'react-link-preview'


function ArticleRow({ article }) {
  const fallbackImage = '../img/hero.jpg'; // 기본 이미지 경로

  return (
    <Card size="2" style={{ marginBottom: '1rem' }}>
      <LinkPreview 
        url={'https://news.nate.com/view/20240720n00380'}
        width="100%"
        fallback={
          <Flex>
            <Box style={{ width: '200px', flexShrink: 0 }}>
              <img 
                src={article.image || fallbackImage} 
                alt={article.title}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </Box>
            <Box p="3" style={{ flex: 1 }}>
              <Heading as="h3" size="3" mb="1">{article.title}</Heading>
              <Text as="p" size="2" color="gray" mb="2">{article.description}</Text>
              <Flex justify="between">
                <Text as="p" size="1" color="gray">{article.source}</Text>
                <Text as="p" size="1" color="gray">{article.date}</Text>
              </Flex>
            </Box>
          </Flex>
        }
      />
    </Card>
  );
}

export default ArticleRow;