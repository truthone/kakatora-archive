import { AspectRatio } from '@radix-ui/themes';
import React from 'react';
import icon_netflix from  '../img/icon_netflix.webp';
import icon_wave from '../img/icon_wave.webp';
import icon_tving from '../img/icon_tving.webp'
import icon_watcha from '../img/icon_watcha.webp';
import icon_naver from '../img/icon_naver.webp'
import icon_youtube from '../img/icon_youtube.png'
import { Box, Text } from '@radix-ui/themes'
import Image from 'next/image';

const ottLogos = {
  netflix: { src: icon_netflix },
  watcha: { src: icon_watcha},
  wavve: { src: icon_wave },
  tving: { src: icon_tving },
  '네이버시리즈': { src: icon_naver },
  '유투브': { src: icon_youtube },
};


const OttLogo = ({ ott }) => {
  const logo = ottLogos[ott];

  if (!logo) return <Text>{ott}</Text>;

  return (
    <Box position="relative" width={{initial:"48px", sm:"60px"}} height={{initial:"48px", sm:"60px"}}>
      <Image fill style={{objectFit: 'cover'}} src={logo.src} alt={ott} />
    </Box>
  )
};

export default OttLogo;