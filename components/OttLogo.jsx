import { Badge, Button } from '@radix-ui/themes';
import React from 'react';
import icon_netflix from '../img/icon_netflix.webp';
import icon_wave from '../img/icon_wave.webp';
import icon_tving from '../img/icon_tving.webp';
import icon_watcha from '../img/icon_watcha.webp';
import icon_naver from '../img/icon_naver.webp';
import icon_youtube from '../img/icon_youtube.png';
import { Box, Text } from '@radix-ui/themes';
import Image from 'next/image';

const ottLogos = {
  넷플릭스: { src: icon_netflix, link: 'https://www.netflix.com/kr' },
  왓챠: { src: icon_watcha, link: 'https://watcha.com/search?query=' },
  웨이브: { src: icon_wave, link: 'https://www.wavve.com/search?searchWord=' },
  티빙: { src: icon_tving, link: 'https://www.tving.com/search?keyword=' },
  네이버시리즈: {
    src: icon_naver,
    link: `https://serieson.naver.com/v3/search?query=`,
  },
  유튜브: {
    src: icon_youtube,
    link: 'https://www.youtube.com/results?search_query=',
  },
  카카오TV: { link: 'https://tv.kakao.com/search/cliplinks?q=' },
};

const OttLogo = ({ ott, query, link }) => {
  const logo = ottLogos[ott];

  // 커스텀 직링일때.

  if (link) {
    return (
      <Button variant="ghost" m="1">
        {logo ? (
          <Badge radius="full" variant="solid" asChild>
            <a
              href={`${link}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text size="3" m="2">
                {ott}
              </Text>
            </a>
          </Badge>
        ) : (
          <Box
            position="relative"
            width={{ initial: '48px', sm: '60px' }}
            height={{ initial: '48px', sm: '60px' }}
          >
            <a href={`${link}`} target="_blank" rel="noopener noreferrer">
              <Image
                sizes={'(max-width: 768px) 100vw, 30vw'}
                fill
                quality={100}
                style={{ objectFit: 'cover' }}
                src={logo.src}
                alt={ott}
              />
            </a>
          </Box>
        )}
      </Button>
    );
  }

  if (!logo || (!logo.src && !logo.link))
    return (
      <Button variant="ghost" m="1">
        <Badge radius="full" variant="solid">
          <Text size="3" m="2">
            {ott}
          </Text>
        </Badge>
      </Button>
    );

  if (!logo.src && logo.link)
    return (
      <Button variant="ghost" m="1">
        <Badge radius="full" variant="solid" asChild>
          <a
            href={`${logo.link}${query}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text size="3" m="2">
              {ott}
            </Text>
          </a>
        </Badge>
      </Button>
    );

  return (
    <Button variant="ghost" m="1">
      <Box
        position="relative"
        width={{ initial: '48px', sm: '60px' }}
        height={{ initial: '48px', sm: '60px' }}
      >
        <a
          href={`${logo.link}${query}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            sizes={'(max-width: 768px) 100vw, 30vw'}
            fill
            quality={100}
            style={{ objectFit: 'cover' }}
            src={logo.src}
            alt={ott}
          />
        </a>
      </Box>
    </Button>
  );
};

export default OttLogo;
