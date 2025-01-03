'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Card, AspectRatio, IconButton, Section, Flex } from '@radix-ui/themes';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

const Carousel = ({ carouselImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [visibility, setVisibility] = useState(true);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  const carouselRef = useRef(null);

  const handleScroll = () => {
    const carouselNode = carouselRef.current;
    if (!carouselNode) return;

    const slideWidth = carouselNode.offsetWidth;
    const scrollLeft = carouselNode.scrollLeft;
    const index = Math.round(scrollLeft / slideWidth);
    setCurrentIndex(index);
    setIsFirstRender(false);
  };

  useEffect(() => {
    const carouselNode = carouselRef.current;
    if (!carouselNode) return;

    carouselNode.addEventListener('scroll', handleScroll);

    return () => {
      carouselNode.removeEventListener('scroll', handleScroll);
    };
  }, []); // 한 번만 실행되도록 빈 배열

  const nextSlide = () => {
    if (!carouselRef.current) return;
    setIsFirstRender(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1
        ? carouselImages.length - 1
        : prevIndex + 1
    );
    carouselRef.current.scrollBy({
      left: carouselRef.current.offsetWidth,
      behavior: 'smooth',
    });
  };

  const prevSlide = () => {
    if (!carouselRef.current) return;
    setIsFirstRender(false);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
    carouselRef.current.scrollBy({
      left: -carouselRef.current.offsetWidth,
      behavior: 'smooth',
    });
  };

  const handleImageLoad = () => {
    setLoadedImagesCount((prevCount) => prevCount + 1);
    setVisibility(true);
  };

  const handleImageError = () => {
    setLoadedImagesCount((prevCount) => {
      const newCount = Math.max(0, prevCount - 1);
      if (newCount <= 1) {
        setVisibility(false);
      }
      return newCount;
    });
  };

  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === carouselImages.length - 1;

  return (
    <CarouselContainer size="1" $visibility={visibility}>
      <CarouselButton
        position="prev"
        onClick={prevSlide}
        disabled={isFirstSlide}
      >
        <ChevronLeftIcon width="40" height="40" />
      </CarouselButton>
      <CarouselContent ref={carouselRef} direction="row" gap="10px">
        {carouselImages.map((content, index) => (
          <CarouselItem
            key={index}
            $active={(index === currentIndex).toString()}
            $index={index}
            $isFirstRender={isFirstRender}
          >
            <Card
              variant='surface'
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
                  src={content.url}
                  alt={content.title}
                  fill
                  sizes={'(max-width: 768px) 100vw, 30vw'}
                  style={{
                    borderTopLeftRadius: 'var(--radius-2)',
                    borderTopRightRadius: 'var(--radius-2)',
                    objectFit: 'cover',
                  }}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
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
        <ChevronRightIcon width="40" height="40" />
      </CarouselButton>
    </CarouselContainer>
  );
};

export default Carousel;

const CarouselContainer = styled(Section)`
  position: relative;
  width: 100%;
  overflow: hidden;
  display: ${(props) => (props.$visibility ? 'block' : 'none')};
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

  &::webkit-scrollbar {
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
  opacity: ${(props) => (props.$index === 0 ? 1 : 0.7)};
  transition: ${(props) =>
    props.$isFirstRender ? 'none' : 'opacity 0.5s ease-in-out'};

  ${(props) =>
    props.$active &&
    css`
      opacity: 1;
    `}

  @media (min-width: 520px) {
    opacity: 1;
    transition: none;
    flex: 0 0 25%;
  }
`;

const CarouselButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
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
