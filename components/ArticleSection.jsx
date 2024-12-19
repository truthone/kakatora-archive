
import React, { useEffect } from 'react';
import {
  Heading,
  Section,
  Grid
} from '@radix-ui/themes';
import useFetchArticles from '../hooks/useFetchArticles';
import ArticleCard from './ArticleCard';

const ArticleSection = ({filmoId}) => {
  const { articles, loading, error } = useFetchArticles({filmoId});

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error loading articles: {error.message}</p>;

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
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
      ))}
      </Grid>
    </Section>
  );
};
export default ArticleSection;
