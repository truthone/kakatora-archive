'use client'
import React, { useState } from 'react';
import { Box, Flex, Select, RadioGroup } from '@radix-ui/themes';

export default function FilmoFilter({ onFilterChange }) {
    const [selectedYear, setSelectedYear] = useState('전체');
    const [selectedCategories, setSelectedCategories] = useState(['영화', '드라마', '연극', '예능']);

    const years = ['전체', '2008', '2009', '2010', '2024']; // 연도 목록
    const categories = ['영화', '드라마', '연극', '예능']; // 카테고리 목록

    const handleYearChange = (value) => {
        setSelectedYear(value);
        onFilterChange(value, selectedCategories);
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
            <Select.Root size="3" defaultValue={selectedYear} onValueChange={handleYearChange}>
                <Select.Trigger />
                <Select.Content>
                    {years.map((year) => (
                        <Select.Item key={year} value={year}>
                            {year}
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Root>
            {/* 카테고리 Radio Group */}
            <RadioGroup.Root defaultValue="영화" name="카테고리">
                <Flex direction="row" gap="2">
                    {categories.map((category) => (
                        <RadioGroup.Item key={category} value={category} checked={selectedCategories.includes(category)} onChange={() => handleCategoryChange(category)}>
                            {category}
                        </RadioGroup.Item>
                    ))}
                </Flex>
            </RadioGroup.Root>
        </Box>
    );
}
