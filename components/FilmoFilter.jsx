'use client';
import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Select, Checkbox } from '@radix-ui/themes';

export default function FilmoFilter({ onFilterChange }) {
  const [selectedYear, setSelectedYear] = useState('전체');
  const [selectedCategories, setSelectedCategories] = useState([
    '영화',
    '드라마',
    '연극',
    '예능',
  ]);

  const years = [
    '전체',
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
    2022,
    2023,
    2024,
  ];
  const categories = ['영화', '드라마', '연극', '예능'];

  const handleYearChange = (value) => {
    setSelectedYear(value === '전체' ? '전체' : value);
  };

  const handleCategoryChange = (category) => {
    const categoryMap = {
      영화: 'movies',
      드라마: 'dramas',
      연극: 'musicals',
      예능: 'tv_appearances',
    };

    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
  };

  // Trigger the filter when year or categories change
  useEffect(() => {
    const categoryMap = {
      영화: 'movies',
      드라마: 'dramas',
      연극: 'musicals',
      예능: 'tv_appearances',
    };

    const mappedCategories = selectedCategories.map((cat) => categoryMap[cat]);
    onFilterChange(selectedYear, mappedCategories);
  }, [selectedYear, selectedCategories]);

  return (
    <Box>
      <Select.Root value={selectedYear} onValueChange={handleYearChange}>
        <Select.Trigger>
          <Text>{selectedYear}</Text>
        </Select.Trigger>
        <Select.Content>
          {years.map((year) => (
            <Select.Item key={year} value={year}>
              {year}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      <Flex direction="column" gap="2" mt="4">
        {categories.map((category) => (
          <Flex key={category} align="center">
            <Checkbox
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => handleCategoryChange(category)}
            ></Checkbox>
            <Text>{category}</Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}
