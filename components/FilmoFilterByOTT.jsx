'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  Theme,
  Flex,
  Button,
  Box,
  AspectRatio,
  TextField,
  Section,
  Card,
  Separator,
  Text,
} from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import '@radix-ui/themes/styles.css';
import filmoData from '../data/filmoDataByYear.json';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getChoseong } from 'es-hangul';

function FilmoFilterByOTT() {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedOtts, setSelectedOtts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [filteredData]);

  useEffect(() => {
    filterData();
  }, [selectedOtts, searchTerm]);

  const searchWord = '라면';
  const userInput = 'ㄹㅁ';

  const result = getChoseong(searchWord); // ㄹㅁ

  if (result === userInput) {
    // 일치한다면 if문이 실행
  }
  const filterData = () => {
    let allWorks = filmoData.filmo_data_by_year.flatMap((yearData) => [
      ...(yearData.movies || []),
      ...(yearData.dramas || []),
      ...(yearData.tv_appearances || []),
    ]);

    const normalizedSearchTerm = searchTerm.replace(/\s+/g, '').toLowerCase(); // 검색어에서 공백 제거
    const searchChoseong = getChoseong(normalizedSearchTerm); // 검색어의 초성 추출

    let filtered = allWorks.filter((work) => {
      const normalizedTitle = work.title.replace(/\s+/g, '').toLowerCase(); // 제목에서 공백 제거
      const titleChoseong = getChoseong(normalizedTitle); // 제목의 초성 추출

      return (
        (selectedOtts.length === 0 ||
          (work.ott_subscribe &&
            work.ott_subscribe.some((ott) =>
              selectedOtts.some(
                (selectedOtt) =>
                  ott.toLowerCase().includes(selectedOtt.toLowerCase()) ||
                  selectedOtt.toLowerCase().includes(ott.toLowerCase())
              )
            ))) &&
        (normalizedSearchTerm === '' ||
          normalizedTitle.includes(normalizedSearchTerm) ||
          titleChoseong.includes(searchChoseong)) // 제목과 초성 모두 포함 검색
      );
    });

    setFilteredData(filtered);
  };

  const toggleOtt = (ott) => {
    setSelectedOtts((prev) =>
      prev.includes(ott) ? prev.filter((o) => o !== ott) : [...prev, ott]
    );
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };

  const router = useRouter();

  const handleCardClick = (content) => {
    if (content.url) {
      router.push(`${content.url}`);
    } else {
      router.push(`/filmography/${content.id}`);
    }
  };

  const otts = [
    '티빙',
    '왓챠',
    '웨이브',
    '넷플릭스',
    '네이버시리즈',
    '유튜브',
    '카카오TV',
  ];

  return (
    <Section size="1">
      <Theme
        appearance="dark"
        accentColor="crimson"
        grayColor="slate"
        radius="medium"
        scaling="100%"
      >
        <Box
          style={{
            position: 'sticky',
            top: '50px',
            zIndex: 1,
            backgroundColor: 'var(--color-background)',
            paddingTop: 'var(--space-3)',
            paddingBottom: 'var(--space-3)',
          }}
        >
          <Flex
            direction="column"
            gap="4"
            my="4"
            mx="2"
            style={{ alignItems: 'center' }}
          >
            <Box width={{ initial: '100%', xs: '70%' }}>
              <TextField.Root
                placeholder="콘텐츠를 검색해보세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              >
                <TextField.Slot>
                  <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
              </TextField.Root>
            </Box>
            <Flex
              gap="2"
              wrap="wrap"
              justify="center"
              style={{ alignItems: 'center' }}
            >
              {otts.map((ott) => (
                <Button
                  key={ott}
                  onClick={() => toggleOtt(ott)}
                  variant={selectedOtts.includes(ott) ? 'solid' : 'outline'}
                  style={{ cursor: 'pointer' }}
                >
                  {ott}
                </Button>
              ))}
            </Flex>
          </Flex>
        </Box>
        <Box
          p="1"
          my="auto"
          mx="0"
          ref={contentRef}
          style={{ height: 'fit-content', minHeight: '70vh' }}
        >
          <Flex
            direction="row"
            wrap="wrap"
            gap="3"
            justify="center"
            style={{ width: '100%' }}
          >
            {filteredData.map((content) => (
              <Box key={content.id} width={{ initial: '45%', xs: '180px' }}>
                <Card
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleCardClick(content)}
                  className="item"
                >
                  <AspectRatio ratio={2 / 3}>
                    <Image
                      src={content.imgUrl}
                      alt={content.title}
                      fill
                      sizes={'(max-width: 768px) 100vw, 30vw'}
                      style={{
                        borderTopLeftRadius: 'var(--radius-2)',
                        borderTopRightRadius: 'var(--radius-2)',
                        objectFit: 'cover',
                      }}
                    />
                  </AspectRatio>
                  <Flex mt="2" gap="1" direction="column">
                    <Text size="2" style={{ whiteSpace: 'break-spaces' }}>
                      {content.title}
                    </Text>
                    {content.year && (
                      <>
                        <Separator
                          orientation="horizontal"
                          style={{ margin: '4px 0' }}
                        />
                        <Text size="2">{content.year}</Text>
                      </>
                    )}
                  </Flex>
                </Card>
              </Box>
            ))}
          </Flex>
        </Box>
      </Theme>
    </Section>
  );
}

export default FilmoFilterByOTT;
