import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { ChakraProvider } from '@chakra-ui/react';
import NextNProgress from 'nextjs-progressbar';
import 'pretendard/dist/web/static/pretendard.css';

import '@/styles/jetbrains-mono.css';
import '@/styles/prism-theme.css';
import customTheme from '@/config/theme';
import SEO from '@/config/seo-config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress height={2} color="#4A5568" options={{ showSpinner: false }} />
      <ChakraProvider resetCSS={true} theme={customTheme}>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
