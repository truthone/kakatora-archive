'use client';
import React, { useState } from 'react';
import { Card, AspectRatio, IconButton } from '@radix-ui/themes';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import imageList from '../data/liveAloneStylingImageList.json';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const CarouselContent = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const CarouselItem = styled.div`
  flex: 0 0 100%;
  transition: opacity 0.5s ease-in-out;
  ${(props) =>
    props.active &&
    css`
      opacity: 1;
    `}
  ${(props) =>
    !props.active &&
    css`
      opacity: 0.7;
    `}
`;

const CarouselButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  z-index: 10;
  cursor: pointer;
  ${(props) =>
    props.position === 'prev' &&
    css`
      left: 10px;
    `}
  ${(props) =>
    props.position === 'next' &&
    css`
      right: 10px;
    `}
  
  &:disabled {
    display: none;
  }
`;

const Carousel = ({ data, prefix }) => {
  const imagesObj = imageList[data.ep] || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imagesObj.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imagesObj.length - 1 : prevIndex - 1
    );
  };

  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === imagesObj.length - 1;

  return (
    <CarouselContainer>
      <CarouselButton
        position="prev"
        onClick={prevSlide}
        disabled={isFirstSlide}
      >
        <ChevronLeftIcon width="20" height="20" />
      </CarouselButton>
      <CarouselContent
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {imagesObj?.map((content, index) => (
          <CarouselItem key={index} active={index === currentIndex}>
            <Card
              style={{
                maxWidth: '500px',
                width: '240px',
                flexShrink: 0,
                cursor: 'pointer',
                margin: '0 auto',
              }}
            >
              <AspectRatio ratio={2 / 3} style={{ padding: '0' }}>
                <Image
                  src={`${prefix}${content.filename}`}
                  alt={content.title}
                  fill
                  style={{
                    borderTopLeftRadius: 'var(--radius-2)',
                    borderTopRightRadius: 'var(--radius-2)',
                    objectFit: 'cover',
                  }}
                />
              </AspectRatio>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselButton
        position="next"
        onClick={nextSlide}
        disabled={isLastSlide}
      >
        <ChevronRightIcon width="20" height="20" />
      </CarouselButton>
    </CarouselContainer>
  );
};

export default Carousel;
