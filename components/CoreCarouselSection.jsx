'use client';
import React, {useState} from 'react';
import { Heading, Section, Separator } from '@radix-ui/themes';
import Carousel from '../components/Carousel'

const CoreCarouselSection = ({ title, data, carouselImages }) => {
  const [hasLoadedImage, setHasLoadedImage] = useState(false);
  setHasLoadedImage(carouselImages)
  // const handleImagesLoaded = (loaded) => {
  //   setHasLoadedImage(loaded);
  // };
  return data && hasLoadedImage ? (
    <Section>
      <Heading size="6" mb="4">
        {title}
      </Heading>
      <Separator orientation="horizontal" size="4" />
      <Carousel data={data}  onImagesLoaded={handleImagesLoaded}/>
    </Section>
  ) : null;
}


export default CoreCarouselSection