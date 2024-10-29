import React, { useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const BlurBackgroundImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(15px);
  overflow: hidden;

    &::before {
    content: '';
    position: absolute;
    top: -10rem;
    bottom: -10rem;
    left: -10rem;
    right: -10rem;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: -1rem;
    right: -1rem;
    height: 25rem;
    background-image: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
  }
`;

const BlurBackgroundComponent = ({ imageUrl }) => {
  useEffect(() => {
    console.log('imageUrl:', imageUrl);
  }, [imageUrl]);

  return (
      <BlurBackgroundImageWrapper>
        <Image src={imageUrl} alt="Background Image" layout="fill" objectFit="cover" objectPositipn="top 10%"/>
      </BlurBackgroundImageWrapper>
    
  );
};

export default BlurBackgroundComponent;
