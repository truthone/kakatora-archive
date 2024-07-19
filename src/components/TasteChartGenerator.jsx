import React, { useState } from 'react';
import { Box, Select, Button, Heading, Text } from '@radix-ui/themes';
import { filmoData } from './dummyData';

function TasteChartGenerator() {
  const [selections, setSelections] = useState({
    favDrama: '',
    favMovie: '',
    favPlay: '',
    favNaHonSan: ''
  });

  const handleSelect = (category, value) => {
    setSelections(prev => ({ ...prev, [category]: value }));
  };

  const generateChart = () => {
    // 선택한 항목들로 차트 생성 로직
    console.log(selections);
  };

  return (
    <Box p="4">
      <Heading size="8" mb="4">필모 취향표 생성기</Heading>
      
      {Object.keys(selections).map(category => (
        <Box key={category} mb="3">
          <Text as="label" size="2" mb="2">{category}</Text>
          <Select.Root onValueChange={(value) => handleSelect(category, value)}>
            <Select.Trigger placeholder={`Select ${category}`} />
            <Select.Content>
              {filmoData
                .filter(item => 
                  (category === 'favDrama' && item.type === '드라마') ||
                  (category === 'favMovie' && item.type === '영화') ||
                  (category === 'favPlay' && item.type === '연극') ||
                  (category === 'favNaHonSan' && item.type === '예능')
                )
                .map(item => (
                  <Select.Item key={item.id} value={item.id.toString()}>
                    {item.title} - {item.character || item.episode}
                  </Select.Item>
                ))
              }
            </Select.Content>
          </Select.Root>
        </Box>
      ))}

      <Button onClick={generateChart} size="3" mt="4">
        취향표 생성하기
      </Button>

      {/* 생성된 취향표 결과 표시 영역 */}
    </Box>
  );
}

export default TasteChartGenerator;