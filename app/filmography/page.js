'use client'
import React, { useState } from 'react';
import filmoDataByYear from '../../data/filmoDataByYear.json'
import FilmoSection from '../../components/FilmoSection'
import FilmoFilter from '../../components/FilmoFilter'
import { Container } from '@radix-ui/themes';

export default function FilmographyPage() {
  const [filteredData, setFilteredData] = useState(filmoDataByYear.filmo_data_by_year);

  const handleFilterChange = (year, categories) => {
    let filtered = filmoDataByYear.filmo_data_by_year.filter((yearData) => {
      const isYearMatch = year === '전체' || yearData.year === year;
      const isCategoryMatch = categories.some((category) => yearData[category.toLowerCase()]);
      return isYearMatch && isCategoryMatch;
    });
    setFilteredData(filtered);
    console.log('filtered', filtered)
  };

  return (
    <Container p="4">
      <FilmoFilter onFilterChange={handleFilterChange} />
      <FilmoSection data={filteredData} />
    </Container>
  )
}