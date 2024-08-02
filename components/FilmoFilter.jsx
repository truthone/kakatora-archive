import React, { useState, useEffect, useRef } from 'react';
import { Theme, Flex, Button, Heading, Text, Card, Box, AspectRatio, Container, Separator, TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import '@radix-ui/themes/styles.css';
import filmoData from '../data/filmoDataByYear.json';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function FilmoFilter() {
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

  const filterData = () => {
    let allWorks = filmoData.filmo_data_by_year.flatMap(yearData => [
      ...(yearData.movies || []),
      ...(yearData.dramas || []),
      ...(yearData.tv_appearances || [])
    ]);

    let filtered = allWorks.filter(work => 
      (selectedOtts.length === 0 || (work.ott && work.ott.some(ott => selectedOtts.includes(ott)))) &&
      (searchTerm === '' || work.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredData(filtered);
  };

  const toggleOtt = (ott) => {
    setSelectedOtts(prev => 
      prev.includes(ott) ? prev.filter(o => o !== ott) : [...prev, ott]
    );
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };

  const router = useRouter();

  const handleCardClick = (content) => {
    navigate(`/filmo/${content.id}`);
  };

  const otts = ['tving', 'watcha', 'wavve', 'netflix', '네이버시리즈','유투브', '카카오TV'];

  return (
    <Container>
      <Theme appearance="dark" accentColor="crimson" grayColor="slate" radius="medium" scaling="100%">
          <Box style={{
            position: 'sticky',
            top: "50px",
            zIndex: 1,
            backgroundColor: 'var(--color-background)',
            paddingTop: 'var(--space-3)',
            paddingBottom: 'var(--space-3)',
          }}>
            <Flex direction="column" gap="4" my="4" mx="2" style={{alignItems:"center"}}>
              <Box width={{initial: "100%", xs:"70%"}}>
                <TextField.Root placeholder="작품 검색" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}>
                  <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
              </Box>
              <Flex gap="2" wrap="wrap" justify="center" style={{alignItems:"center"}}>
                {otts.map(ott => (
                  <Button 
                    key={ott} 
                    onClick={() => toggleOtt(ott)}
                    variant={selectedOtts.includes(ott) ? 'solid' : 'outline'}
                  >
                    {ott}
                  </Button>
                ))}
              </Flex>           
            </Flex>     
          </Box>
          <Box p="1" my="auto" mx="0" ref={contentRef} style={{height: "fit-content", minHeight: "70vh"}}>
            <Flex direction="row" wrap="wrap" gap="3" justify="center" style={{width: "100%"}}>
              {filteredData.map(content => (
                <Box key={content.id} width={{initial: '45%', xs: '180px'}}>
                  <Card 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleCardClick(content)}
                  >
                    <AspectRatio ratio={2/3}>
                      <Image 
                        src={`/${content.imgUrl}`} 
                        alt={content.title}
                        fill
                        style={{ 
                          borderTopLeftRadius: 'var(--radius-2)',
                          borderTopRightRadius: 'var(--radius-2)',
                          objectFit: 'cover'
                        }}
                      />
                    </AspectRatio>
                    <Flex mt="2" gap="1" direction="column">
                      <Text size="2" style={{ whiteSpace: 'break-spaces' }}>
                        {content.title}
                      </Text>
                      {content.year && <><Separator orientation="horizontal" style={{ margin: '4px 0' }} /><Text size="2">{content.year}</Text></>}
                    </Flex>
                  </Card>
                </Box>
              ))}
            </Flex>
          </Box>
      </Theme>
    </Container>
  );
}

export default FilmoFilter;