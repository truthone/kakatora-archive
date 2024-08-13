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

const OttLogo = ({ ott }) => {
  switch (ott) {
    case 'netflix':
      return (
        <Image width={24} height={24} src={icon_netflix}/>
      );
    case 'watcha':
      return (
        <Image  width={24} height={24} src={icon_watcha}/>
      );
    case 'wavve':
      return (
        <Image  width={24} height={24} src={icon_wave}/>
    );
    case 'tving':
      return (
        <Image  width={24} height={24} src={icon_tving}/>
    );
    case '네이버시리즈':
      return (
        <Image  width={24} height={24} src={icon_naver}></Image>
    );    
    case '유투브':
      return (
        <Image  width={30} height={30} src={icon_youtube}></Image>
    );
    default:
      return <Text>{ott}</Text>;
  }
};

export default OttLogo;