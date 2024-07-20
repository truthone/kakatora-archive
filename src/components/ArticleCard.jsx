import React from 'react';
import LinkPreview from 'react-link-preview';
import { Card, Flex, Box, Heading, Text, AspectRatio, Link } from '@radix-ui/themes';

const ArticleCard = () => {
  const url = "https://news.nate.com/view/20240720n00380";

  return (
    <LinkPreview
      url={url}
      render={({ title, description, image, favicon }) => (
        <Card style={{ maxWidth: '400px', width: '100%' }}>
          <Link href={url} target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Flex direction="column">
              {image && (
                <AspectRatio ratio={16/9}>
                  <img 
                    src={image} 
                    alt={title} 
                    style={{ 
                      objectFit: 'cover', 
                      width: '100%', 
                      height: '100%',
                      borderTopLeftRadius: 'var(--radius-2)',
                      borderTopRightRadius: 'var(--radius-2)'
                    }}
                  />
                </AspectRatio>
              )}
              <Box p="3">
                <Flex align="center" gap="2" mb="2">
                  {favicon && (
                    <img 
                      src={favicon} 
                      alt="favicon" 
                      style={{ width: '16px', height: '16px' }} 
                    />
                  )}
                  <Text size="1" style={{ color: 'var(--gray-11)' }}>
                    news.nate.com
                  </Text>
                </Flex>
                <Heading size="3" mb="1">{title}</Heading>
                <Text size="2" style={{ color: 'var(--gray-11)' }}>
                  {description}
                </Text>
              </Box>
            </Flex>
          </Link>
        </Card>
      )}
    />
  );
};

export default ArticleCard;