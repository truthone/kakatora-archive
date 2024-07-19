import { AspectRatio } from '@radix-ui/themes';
import React from 'react';
import icon_netflix from  '../img/icon_netflix.webp';
import icon_wave from '../img/icon_wave.webp';
import icon_tving from '../img/icon_tving.webp'
import icon_watcha from '../img/icon_watcha.webp';
import icon_naver from '../img/icon_naver.webp'
import icon_youtube from '../img/icon_youtube.png'
import { Box, Text } from '@radix-ui/themes'

const OttLogo = ({ ott }) => {
  switch (ott) {
    case 'netflix':
      return (
        <img style={{width: '24px', height: '24px'}} src={icon_netflix}></img>
      );
    case 'watcha':
      return (
        <img style={{width: '24px', height: '24px'}} src={icon_watcha}></img>
      );
    case 'wavve':
      return (
        <img style={{width: '24px', height: '24px'}} src={icon_wave}></img>
    );
    case 'tving':
      return (
        <img style={{width: '24px', height: '24px'}} src={icon_tving}></img>
    );
    case '네이버시리즈':
      return (
        <img style={{width: '24px', height: '24px'}} src={icon_naver}></img>
    );    
    case '유투브':
      return (
        <img style={{width: '30px', height: '30px'}} src={icon_youtube}></img>
    );
    default:
      return <Text>{ott}</Text>;
  }
};

export default OttLogo;