import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import FallbackComponent from '../components/FallbackComponent';
const BlurBackgroundImageWrapper = styled.div`
   position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  filter: blur(20px);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-image: linear-gradient(#000000e6 0%, #000a 10%, #0005 20%, #0000002c 40%, #00000018 50%, #0000 100%);
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 25rem;
    background:linear-gradient(#0000 0%,#00000018 55%, #0000002c 60%, #0005 80%, #000a 90%, #000000e6 100%);
    z-index: 1;
  }
`;

const BlurBackgroundComponent = ({ imageUrl }) => {
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setImgSrc(imageUrl);
    setIsError(false);
  }, [imageUrl]);

  const handleImageError = () => {
    setIsError(true);
  };

  return (
    <BlurBackgroundImageWrapper>
      {isError ? (
        <FallbackComponent toggleMark={true} />
      ) : (
        <Image
          src={imgSrc}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          onError={handleImageError}
        />
      )}
    </BlurBackgroundImageWrapper>
  );
};

export default BlurBackgroundComponent;
