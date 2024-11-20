'use client';
import React, {useEffect, useState} from 'react';
import { Heading, Section, Separator } from '@radix-ui/themes';
import Carousel from '../components/Carousel'

const CoreCarouselSection = ({ title, data, carouselImages }) => {
  
  return carouselImages.length >= 1 ? (
    <Section>
      <Heading size="6" mb="4">
        {title}
      </Heading>
      <Separator orientation="horizontal" size="4" />
      <Carousel carouselImages={carouselImages}/>
    </Section>
  ) : null;
}


export default CoreCarouselSection