'use client'
import React from 'react';
import { Box, Heading, Flex, AspectRatio, Card, Text } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function EpisodeRow({ title, contents }) {
  const router = useRouter();

  const handleCardClick = (content) => {
    router.push(`/liveAlone/${content.ep}`);
  };

  return (
    <Box>
      <Heading size="6" mb="4">{title}</Heading>
      <Flex my="4" p="0" direction={{initial: "column", xs: "row"}} wrap="wrap" gap="3" width="100%" justify="start">
        {contents.map((content, id) => (
          <Box key={id} width={{initial: "100%", xs: "280px"}}>
            <Card 
              key={id}
              style={{ flexShrink: 0, cursor: 'pointer'}}
              onClick={() => handleCardClick(content)}
            >
              <AspectRatio ratio={3/2} style={{padding: '0'}}>
                <Image 
                  src={encodeURI(content.imgUrl)} 
                  alt={`${content.title}${content.note}`}
                  fill
                  style={{ 
                    borderRadius: 'var(--radius-2)',
                    objectFit: 'cover'
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