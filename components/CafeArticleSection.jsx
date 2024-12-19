import React, { useEffect } from 'react';
import {
  Heading,
  Section, Flex, Box, Card, Avatar, Text
} from '@radix-ui/themes';
import SpriteAnimation from './SpriteAnimation';
import useFetchCafeArticles from '../hooks/useFetchCafeArticles';

const CafeArticleSection = ({ filmoId }) => {
  const { articles, loading, error } = useFetchCafeArticles({ filmoId });
  const fallbackTexts = ["❤️", "🩷", "🧡", "💛", "💚", "💙", "🤍", "🩶", "🖤", "🤎", "💜", "🩵", "💖", "💗", "💓", "💝", "❤️‍🔥", "💕", "💘"];
  return (
    articles.length > 0 ? (
      <Section>
        <Heading size="6" mb="4">
          관련 카페글
        </Heading>
        {
          <Flex
            my="4"
            p="0"
            direction={{ initial: 'column' }}
            wrap="wrap"
            gap="4"
            width="100%"
            justify={{ initial: 'center' }}
            style={{ cursor: 'pointer' }}
          >
            {
              articles.map((article, index) => (
                <Box maxWidth="640px" key={index}
                  onClick={() => {
                    window.open(
                      `${article.link}`,
                      '_blank',
                      'noopener,noreferrer'
                    );
                  }}
                >
                  <Card>
                    <Flex gap="3" align="center">
                      <Avatar
                        size="3"
                        src=""
                        radius="large"
                        fallback={fallbackTexts[index % fallbackTexts.length]}
                      />
                      <Box>
                        <Text as="div" size="2" weight="bold">
                          {article.title}
                        </Text>
                        <Text as="div" size="2" color="gray">
                          {article.date}
                        </Text>
                      </Box>
                    </Flex>
                  </Card>
                </Box>
              ))
            }
          </Flex>
        }
      </Section>
    ) : null
  );
};
export default CafeArticleSection;
