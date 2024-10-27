import { Suspense } from 'react';
import { Theme, Box } from '@radix-ui/themes';
import ReactGAWrapper from '../components/ReactGAWrapper';
import '@radix-ui/themes/styles.css';
import './global.css'
import StyledComponentsRegistry from '../lib/registry'
import Header from '../components/Header';
import Footer from '../components/Footer'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <ReactGAWrapper GA_MEASUREMENT_ID={GA_MEASUREMENT_ID}>
          <StyledComponentsRegistry>
            <Theme
              appearance="dark"
              accentColor="crimson" 
              radius="large" 
              p={{ sm: '6', lg: '9' }}
              m={{initial: '1', xs:'3'}}
              >
              <Header />
              <Box minHeight="75vh">
                {children}
              </Box>
              <Footer />
            </Theme>
          </StyledComponentsRegistry>
          </ReactGAWrapper>
        </Suspense>
      </body>
    </html>
  );
}