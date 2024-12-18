import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Heading,
  Section,
  Grid
} from '@radix-ui/themes';
import useFetchOG from '../hooks/useFetchOG';
import ArticleCard from './ArticleCard';

const 
ArticleSection = ({filmoId}) => {

  const { ogData, loading, error } = useFetchOG(filmoId);

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
        {ogData.map((article) => (
          <ArticleCard key={article.id} article={article} />
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
