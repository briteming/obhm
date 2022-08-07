import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const customTheme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, Apple SD Gothic Neo, Pretendard, Roboto, Noto Sans KR, Segoe UI, Malgun Gothic, sans-serif',
    heading:
      '-apple-system, BlinkMacSystemFont, Apple SD Gothic Neo, Pretendard, Roboto, Noto Sans KR, Segoe UI, Malgun Gothic, sans-serif',
    mono: 'JetBrains Mono, SFMono-Regular, Pretendard, Menlo, Consolas, PT Mono, Liberation Mono, Courier, monospace',
  },
  colors: {
    indigo: {
      100: '#EAF4FA',
      200: '#D6E8F6',
      300: '#BBBFCC',
      400: '#9AB2CD',
      500: '#748cad',
      600: '#546D94',
      700: '#3A507C',
      800: '#253764',
      900: '#1A2025',
    },
  },
  components: {
    Button: {
      baseStyle: (props) => ({
        _hover: {
          textDecoration: 'none',
        },
      }),
    },
    Heading: {
      baseStyle: {
        fontSize: '2xl',
      },
      variants: {
        pagetitle: {
          fontSize: '4xl',
          mt: '0',
          mb: '8',
        },
        title: {
          fontSize: '2xl',
          my: '0',
          lineHeight: 'tall',
        },
        heading: {
          fontSize: '3xl',
        },
      },
      defaultProps: {
        variant: 'pagetitle',
      },
    },
    Text: {
      baseStyle: (props) => ({
        transition: 'all 0.1s ease-in-out',
      }),
      variants: {
        small: (props) => ({
          margin: '0',
          marginBottom: '2',
          fontSize: 'sm',
        }),
      },
    },
    Link: {
      baseStyle: (props) => ({
        textDecoration: 'none',
        transition: 'all 0.3s ease-in-out',
      }),
      variants: {
        underline: (props) => ({
          borderBottomColor: 'transparent',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          _hover: { color: 'pink.400', borderBottomColor: 'pink.400', textDecoration: 'none' },
        }),
      },
    },
  },
  styles: {
    global: (props) => ({
      body: {
        lineHeight: 'taller',
        background: mode('white', 'indigo.900')(props),
      },
      p: {
        my: '4',
        color: mode('gray.800', 'white')(props),
        fontFamily: 'body',
      },
      a: {
        color: mode('gray.800', 'white')(props),
        fontFamily: 'body',
        transition: 'all 0.3s ease-in-out',
      },
      h1: {
        fontSize: 'xl',
        fontWeight: 'bold',
        fontFamily: 'body',
        mt: '8',
        mb: '4',
      },
      h2: {
        fontSize: '2xl',
        fontWeight: 'bold',
        fontFamily: 'body',
        lineHeight: 'taller',
        mt: '8',
        mb: '4',
      },
      h3: {
        fontSize: 'md',
        fontWeight: 'bold',
        fontFamily: 'body',
        mt: '8',
        mb: '4',
      },
      ul: {
        listStyle: 'square',
        my: '2',
        fontFamily: 'body',
      },
      li: {
        color: mode('gray.600', 'indigo.300')(props),
        fontFamily: 'body',
      },
      iframe: {
        py: '8',
      },
      blockquote: {
        fontSize: 'lg',
        fontStyle: 'italic',
        fontFamily: 'body',
      },
      '*::selection': {
        background: mode('blackAlpha.200', 'whiteAlpha.200')(props),
      },
    }),
  },
  shadows: { outline: '0 0 0 2px var(--chakra-colors-pink-300)' },
});

export default customTheme;
