'use client'
import React, { useState } from 'react';
import filmoDataByYear from '../../data/filmoDataByYear.json'
import FilmoSection from '../../components/FilmoSection'
import FilmoFilter from '../../components/FilmoFilter'
import { Container } from '@radix-ui/themes';

export default function FilmographyPage() {
  const [filteredData, setFilteredData] = useState(filmoDataByYear.filmo_data_by_year);

  const handleFilterChange = (year, categories) => {
    let filteredResults = [];
    
    filmoDataByYear.filmo_data_by_year.forEach((data) => {
      const isYearMatch = year === '전체' || data.year === year;
    
      let filteredItemsByCategory = {};
      
      categories.forEach((category) => {
        if (data[category] && data[category].length > 0) {
          filteredItemsByCategory[category] = filteredItemsByCategory[category] 
            ? [...filteredItemsByCategory[category], ...data[category]] 
            : data[category];
        }        
      });
    
      // 연도와 카테고리 모두 매칭되는 경우에만 결과에 추가
      if (isYearMatch && Object.keys(filteredItemsByCategory).length > 0) {
        filteredResults.push({
          year: data.year,
          ...filteredItemsByCategory, // 카테고리별 아이템을 추가
        });
      }
    });
    
    setFilteredData(filteredResults);
    console.log(filteredResults);
  };
  
  return (
    <Container p="4">
      <FilmoFilter onFilterChange={handleFilterChange} />
      {console.log(filteredData)}
      <FilmoSection data={filteredData} />
    </Container>
  )
}