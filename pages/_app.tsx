import type { AppProps } from 'next/app';
import { ChakraProvider, useColorModeValue } from '@chakra-ui/react';
import NextNProgress from 'nextjs-progressbar';
import 'pretendard/dist/web/static/pretendard.css';

import customTheme from '@/config/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress height={3} color="#4A5568" options={{ showSpinner: false }} />
      <ChakraProvider resetCSS={true} theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
