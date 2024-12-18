import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Card, Inset, AspectRatio, Flex, Text } from '@radix-ui/themes';

const ArticleCard = ({ article }) => {
  const { og, title, description } = article;
  return (
    <Box width={{ initial: '100%' }}>
      <Card asChild>
        <a href={og.url} target="_blank">
          <Inset clip="padding-box" side="top" pb="current">
            <AspectRatio ratio={16 / 9} style={{ padding: '0' }}>
              <Image
                src={og.image || '/fallback.jpg'}
                alt={og.title || 'Article Image'}
                fill
                sizes={'100vw'}
                style={{ objectFit: 'cover' }}
              />
            </AspectRatio>
          </Inset>
          <Flex p="2" direction="column" wrap="wrap">
            <Text weight="bold" size="4" mb="3">
              {og.title || title}
            </Text>
            <Text
              weight="light"
              size="2"
              style={{
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis',
              }}
            >
              {og.description || description}
            </Text>
          </Flex>
        </a>
      </Card>
    </Box>
  );
};

export default ArticleCard;
