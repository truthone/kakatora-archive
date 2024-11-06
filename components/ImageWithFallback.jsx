'use client';
import React, { useState, useEffect } from 'react';
import FallbackComponent from '../components/FallbackComponent';
import Image from 'next/image';

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

export default ImageWithFallback