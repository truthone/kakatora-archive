'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Flex,
  AspectRatio,
  Card,
  Text,
  Inset,
} from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import FallbackComponent from '../components/FallbackComponent';

function EpisodeRow({ title, contents }) {
  const router = useRouter();

  const handleCardClick = (content) => {
    router.push(`/liveAlone/${content.ep}`);
  };

  return (
    <Box>
      <Heading size="6" mb="4">
        {title}
      </Heading>
      <Flex
        my="4"
        p="0"
        direction={{ initial: 'column', xs: 'row' }}
        wrap="wrap"
        gap="3"
        width="100%"
        justify="start"
      >
        {contents.map((content, id) => (
          <Box key={id} width={{ initial: '100%', sm: '30%', md: '24%' }}>
            <Card
              key={id}
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick(content)}
              className="item"
            >
              <Inset clip="padding-box" side="top" pb="current">
                <AspectRatio ratio={3 / 2} style={{ padding: '0' }}>
                  <ImageWithFallback
                    src={content.imgUrl}
                    alt={`${content.title}${content.note}`}
                    fallbackMessage=""
                  />
                </AspectRatio>
              </Inset>
              <Flex p="2" direction="column" wrap="wrap">
                <Text weight="medium" size="3">
                  {content.date} | {content.ep}회{' '}
                </Text>
                <Text weight="bold" size="3" wrap="pretty">
                  {content.note}
                </Text>
              </Flex>
            </Card>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

const ImageWithFallback = ({ src, alt, fallbackMessage }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setIsError(false);
  }, [src]);

  const handleImageError = () => {
    setIsError(true);
  };

  return isError ? (
    <FallbackComponent toggleMark={true} message={fallbackMessage} />
  ) : (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes={'(max-width: 768px) 100vw, 30vw'}
      style={{ objectFit: 'cover' }}
      onError={handleImageError}
    />
  );
};

export default EpisodeRow;
