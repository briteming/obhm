import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import NextNProgress from 'nextjs-progressbar';
import 'pretendard/dist/web/static/pretendard.css';

import customTheme from '@/config/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress height={2} color="rgba(0, 0, 0, 0.16)" options={{ showSpinner: false }} />
      <ChakraProvider resetCSS={true} theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
