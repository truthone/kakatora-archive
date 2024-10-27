'use client';
import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Select, Checkbox } from '@radix-ui/themes';

export default function FilmoFilter({ onFilterChange }) {
  const [selectedYear, setSelectedYear] = useState('모든 연도');
  const [selectedCategories, setSelectedCategories] = useState([
    '영화',
    '드라마',
    '연극',
    '예능',
  ]);

  const years = [
    '모든 연도',
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
    setSelectedYear(value === '모든 연도' ? '모든 연도' : value);
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
    <Flex
      direction={{ initial: 'column', xs: 'row' }}
      gap="2"
      position="sticky"
      top="50px"
      width="100%"
      py="20px"
      style={{
        zIndex: '10',
        backgroundColor: 'var(--gray-1)',
      }}
      align={{ initial: 'start', xs: 'center' }}
    >
      <Select.Root value={selectedYear} onValueChange={handleYearChange}>
        <Select.Trigger
          style={{ marginRight: '5px', minWidth: '60px', cursor: 'pointer' }}
        >
          {selectedYear}
        </Select.Trigger>
        <Select.Content position="popper" sideOffset={5}>
          {years.map((year) => (
            <Select.Item key={year} value={year} style={{ cursor: 'pointer' }}>
              <Text size="3">{year}</Text>
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      <Flex direction="row" gap="4" align="center">
        {categories.map((category) => (
          <Text key={category} as="label" cursor="pointer">
            <Flex gap="2" align="center">
              <Checkbox
                key={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              {category}
            </Flex>
          </Text>
        ))}
      </Flex>
    </Flex>
  );
}
