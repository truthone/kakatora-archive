'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Card, AspectRatio, IconButton, Section, Flex } from '@radix-ui/themes';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import imageList from '../data/liveAloneStylingImageList.json';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

const CarouselContainer = styled(Section)`
  position: relative;
  width: 100%;
  overflow: hidden;

  @media (min-width: 520px) {
    overflow: visible;
  }
`;

const CarouselContent = styled(Flex)`
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  & > * {
    scroll-snap-align: center;
  }

  &::WebkitScrollbar {
    display: none;
  }

  @media (min-width: 520px) {
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 10px;
    justify-content: flex-start;
  }
`;

const CarouselItem = styled.div`
  flex: 0 0 100%;
  opacity: ${(props) => (props.index === 0 ? 1 : 0.7)};
  transition: ${(props) =>
    props.isFirstRender ? 'none' : 'opacity 0.5s ease-in-out'};

  ${(props) =>
    props.active &&
    css`
      opacity: 1;
    `}

  @media (min-width: 520px) {
    opacity: 1;
    transition: none;
    flex: 0 0 auto;
  }
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
  @media (min-width: 520px) {
    display: none;
  }
`;

const Carousel = ({ data, prefix }) => {
  const imagesObj = imageList[data.ep] || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const carouselRef = useRef(null);

  const nextSlide = () => {
    setIsFirstRender(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === imagesObj.length - 1 ? imagesObj.length - 1 : prevIndex + 1
    );
    carouselRef.current.scrollBy({
      left: carouselRef.current.offsetWidth,
      behavior: 'smooth',
    });
  };

  const prevSlide = () => {
    setIsFirstRender(false);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
    carouselRef.current.scrollBy({
      left: -carouselRef.current.offsetWidth,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const carouselNode = carouselRef.current;
    if (!carouselNode) return;

    const handleScroll = () => {
      const slideWidth = carouselNode.offsetWidth;
      const scrollLeft = carouselNode.scrollLeft;
      const index = Math.round(scrollLeft / slideWidth);
      setCurrentIndex(index);
      setIsFirstRender(false);
    };

    carouselNode.addEventListener('scroll', handleScroll);

    return () => {
      carouselNode.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === imagesObj.length - 1;

  return (
    <CarouselContainer size="1">
      <CarouselButton
        position="prev"
        onClick={prevSlide}
        disabled={isFirstSlide}
      >
        <ChevronLeftIcon width="20" height="20" />
      </CarouselButton>
      <CarouselContent ref={carouselRef} direction="row" gap="10px">
        {imagesObj?.map((content, index) => (
          <CarouselItem
            key={index}
            active={index === currentIndex}
            index={index}
            isFirstRender={isFirstRender}
          >
            <Card
              style={{
                maxWidth: '350px',
                width: '100%',
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
