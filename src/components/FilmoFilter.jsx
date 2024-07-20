import React, { useState, useEffect } from 'react';
import { Theme, Flex, Button, Heading, Text, Card, Box, AspectRatio, Container } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import filmoData from '../data/filmoDataByYear.json';
import { useNavigate } from 'react-router-dom';

function FilmoFilter() {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedOtts, setSelectedOtts] = useState([]);

  useEffect(() => {
    filterData();
  }, [selectedOtts]);

  const filterData = () => {
    let allWorks = filmoData.filmo_data_by_year.flatMap(yearData => [
      ...(yearData.movies || []),
      ...(yearData.dramas || []),
      ...(yearData.tv_appearances || [])
    ]);

    let filtered = allWorks.filter(work => 
      selectedOtts.length === 0 || (work.ott && work.ott.some(ott => selectedOtts.includes(ott)))
    );

    setFilteredData(filtered);
  };

  const toggleOtt = (ott) => {
    setSelectedOtts(prev => 
      prev.includes(ott) ? prev.filter(o => o !== ott) : [...prev, ott]
    );
  };

  const navigate = useNavigate();

  const handleCardClick = (content) => {
    navigate(`/filmo/${content.id}`);
  };

  const otts = ['tving', 'watcha', 'wavve', 'netflix', '네이버시리즈', '유투브 프리미엄', '유투브'];

  return (
    <Container>
      <Theme appearance="dark" accentColor="crimson" grayColor="slate" radius="medium" scaling="100%">
        <Box p="4" style={{minHeight: "80vh", margin: "auto 0"}}>
          <Heading size="6" mb="4"></Heading>
          <Flex gap="2" wrap="wrap" mb="4" style={{alignItems:"center"}}>
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
          <Flex direction="row" wrap="wrap" gap="3" justify="start" style={{width: "100%"}}>
            {filteredData.map(content => (
              <Box 
                key={content.id}
              >
                <Card 
                  style={{ maxWidth: '180px', minWidth: '100px%', width: '180px', cursor: 'pointer' }}
                  onClick={() => handleCardClick(content)}
                >
                  <AspectRatio ratio={2/3}>
                    <img 
                      src={`${process.env.PUBLIC_URL}${content.imgUrl}`} 
                      alt={content.title} 
                      style={{ 
                        objectFit: 'cover', 
                        width: '100%', 
                        height: '100%',
                        borderTopLeftRadius: 'var(--radius-2)',
                        borderTopRightRadius: 'var(--radius-2)'
                      }}
                    />
                  </AspectRatio>
                  <Box p='2'>
                    <Text size="2" style={{ whiteSpace: 'break-spaces' }}>
                      {content.title}
                    </Text>
                  </Box>
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