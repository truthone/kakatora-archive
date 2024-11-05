import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Box,
  Card,
  Inset,
  Text,
  Link,
  Flex,
  AspectRatio,
  Heading,
  Section,
  Grid
} from '@radix-ui/themes';
import Image from 'next/image';
import articleData from '../data/articleData.json';

const ArticleSection = () => {
  const [contents, setContent] = useState([]);

  useEffect(() => {
    setContent(articleData);
  }, []);

  return (
    <Section>
      <Heading size="6" mb="4">
        관련 포스트
      </Heading>
      <Grid
       
        my="4"
        p="0"
        columns={{initial: "1", xs: '2'}}
        // direction={{initial: 'column', xs: 'row'}}
        wrap="wrap"
        gap="6"
        width="100%"
        justify={{initial: 'center', xs: 'start'}}
      >
        {contents.map((content, id) => (
          <Box key={id} width={{ initial: '100%' }}>
            <Card key={id} asChild>
              <a href={content.link} target="_blank">
                <Inset clip="padding-box" side="top" pb="current">
                  <AspectRatio ratio={16 / 9} style={{ padding: '0' }}>
                    <Image
                      src={content.imgUrl}
                      alt={`${content.title}`}
                      fill
                      sizes={'100vw'}
                      style={{
                        objectFit: 'cover'
                      }}
                    />
                  </AspectRatio>
                </Inset>
                <Flex p="2" direction="column" wrap="wrap">
                  <Text weight="bold" size="4" mb="3">
                    {content.title}
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
                    {content.desc}
                  </Text>
                </Flex>
              </a>
            </Card>
          </Box>
        ))}
      </Grid>
    </Section>
  );
};

// Styled Components (기존 코드와 동일)
const SectionWrapper = styled.section`
  margin: 40px 0;
`;
export default ArticleSection;
