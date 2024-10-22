// ArticleSection.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Box, Card, Inset, Text, Link } from '@radix-ui/themes';
import Image from 'next/image';
import articleData from '../data/articleData.json';  // 로컬 JSON 파일을 가져옴

const ArticleSection = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        setArticles(articleData);  // 로컬 JSON 데이터를 상태에 설정
    }, []);

    return (
        <SectionWrapper>
            <h2>Related Articles</h2>
            {/* <ArticleList>
                {articles.map((article, index) => (
                    <Box maxWidth="240px" key={index}>
                        <Card size="2" style={{ width: "100%", height: "140px" }}>
                            <Inset clip="padding-box" side="top" pb="current">
                                <ImageWrapper>
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        width={240}  // 고정된 가로 크기
                                        height={140} // 고정된 세로 크기
                                        style={{
                                            objectFit: "cover",
                                            backgroundColor: "var(--gray-5)"
                                        }}
                                    />
                                </ImageWrapper>
                            </Inset>
                            <Text as="p" size="3">
                                {article.title}
                            </Text>
                            <Link>{article.link}</Link>
                        </Card>
                    </Box>
                ))}
            </ArticleList> */}
        </SectionWrapper>

    );
};

// Styled Components (기존 코드와 동일)
const SectionWrapper = styled.section`
  margin: 40px 0;
`;
export default ArticleSection;
ㅊ