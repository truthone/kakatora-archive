'use client';
import React from 'react';
import { Box, Heading, Flex, AspectRatio, Card, Text } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ScrollArrowWrapper from './ScrollArrowWrapper';

function FilmoRow({ title, contents }) {
  const router = useRouter();

  const handleCardClick = (content) => {
    if (content.url) {
      router.push(`${content.url}`);
    } else {
      router.push(`/filmography/${content.id}`);
    }
  };

  return (
    <Box my="4">
      <Heading size="6" ml="6">
        {title}
      </Heading>
      <ScrollArrowWrapper itemWidth={180} gap={12}>
        <Flex gap="3" px="6" py="3">
          {contents.map((content, id) => (
            <Card
              key={id}
              style={{ width: '180px', flexShrink: 0, cursor: 'pointer' }}
              onClick={() => handleCardClick(content)}
              className="item"
            >
              <AspectRatio ratio={2 / 3} style={{ padding: '0' }}>
                <Image
                  src={content.imgUrl}
                  alt={content.title}
                  fill
                  style={{
                    borderTopLeftRadius: 'var(--radius-2)',
                    borderTopRightRadius: 'var(--radius-2)',
                    objectFit: 'cover',
                  }}
                />
              </AspectRatio>
              <Box p="2">
                <Text size="2" style={{ whiteSpace: 'break-spaces' }}>
                  {content.title}
                </Text>
              </Box>
            </Card>
          ))}
        </Flex>
      </ScrollArrowWrapper>
    </Box>
  );
}

export default FilmoRow;
