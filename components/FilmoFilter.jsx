'use client'
import React, { useState } from 'react';
import { Box, Flex, Text, Select, Checkbox } from '@radix-ui/themes';

export default function FilmoFilter({ onFilterChange }) {
    const [selectedYear, setSelectedYear] = useState('전체');
    const [selectedCategories, setSelectedCategories] = useState(['영화', '드라마', '연극', '예능']);

    const years = ['전체', 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
    const categories = ['영화', '드라마', '연극', '예능'];

    const handleYearChange = (value) => {
        const numericYear = value === '전체' ? '전체' : Number(value);
        setSelectedYear(numericYear);
        onFilterChange(numericYear, selectedCategories);
    };

    const handleCategoryChange = (category) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((c) => c !== category)
            : [...selectedCategories, category];

        setSelectedCategories(updatedCategories);
        onFilterChange(selectedYear, updatedCategories);
    };

    return (
        <Box>
            {/* 연도 Select */}
            <Select.Root value={selectedYear} onValueChange={handleYearChange}>
                <Select.Trigger />
                <Select.Content>
                    {years.map((year) => (
                        <Select.Item key={year} value={year}>
                            {year}
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Root>

            {/* 카테고리 Checkbox */}
            <Flex direction="column" gap="2" mt="4">
                {categories.map((category) => (
                    <Flex key={category} align="center">
                        <Checkbox
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                        >
                        </Checkbox>
                        <Text>{category}</Text>
                    </Flex>
                ))}
            </Flex>
        </Box>
    );
}
