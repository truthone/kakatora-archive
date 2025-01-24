'use client';
import { Suspense } from 'react';
import { Theme, Box, Flex } from '@radix-ui/themes';
import ReactGAWrapper from '../components/ReactGAWrapper';
import '@radix-ui/themes/styles.css';
import './global.css';
import StyledComponentsRegistry from '../lib/registry';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TopButton from '../components/TopButton';
import { SpeedInsights } from '@vercel/speed-insights/next';
import SpriteAnimation from '../components/SpriteAnimation';
import { usePathname } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react'
import HeaderOfTebas from '../components/HeaderOfTebas';

const GA_MEASUREMENT_ID = process.env.GA_TRACKING_ID;

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isTebasLand = pathname.startsWith('/24tebas-land'); 
  return (
    <html lang="ko">
      <head>
        <link
          rel="preload"
          href="https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Suspense
          fallback={
            <Flex
              width="100%"
              height="100vh"
              direction="column"
              justify="center"
              align="center"
              style={{ backgroundColor: 'black' }}
            >
              <SpriteAnimation
                message="LEE JU SEUNG ARCHIVE"
                $textMove={true}
              />
            </Flex>
          }
        >
          <ReactGAWrapper GA_MEASUREMENT_ID={GA_MEASUREMENT_ID}>
            <StyledComponentsRegistry>
              <Theme
                appearance="dark"
                accentColor={isTebasLand ? "indigo" : "crimson"}
                radius="large"
                p={{ sm: '2', lg: '9' }}
                m={{ initial: '1', xs: '3' }}
              >
                {isTebasLand ? <HeaderOfTebas /> : <Header />}
                <Box minHeight="90vh">
                  {children}
                  <Analytics />
                  <SpeedInsights />
                </Box>
                <TopButton />
                <Footer />
              </Theme>
            </StyledComponentsRegistry>
          </ReactGAWrapper>
        </Suspense>
      </body>
    </html>
  );
}
