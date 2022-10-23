import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const customTheme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, Apple SD Gothic Neo, Pretendard, Roboto, Noto Sans KR, Segoe UI, Malgun Gothic, sans-serif',
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
        fontFamily: 'body',
        fontSize: '2xl',
      },
      variants: {
        pagetitle: {
          fontWeight: 'extrabold',
          fontSize: '4xl',
          mt: '0',
          mb: '8',
        },
        PostTitle: {
          fontWeight: 'extrabold',
          fontSize: '1.6rem',
          my: '0',
          lineHeight: 'tall',
        },
      },
      defaultProps: {
        variant: 'pagetitle',
      },
    },
    Text: {
      baseStyle: (props) => ({
        fontFamily: 'body',
        transition: 'all 0.1s ease-in-out',
      }),
      variants: {
        cardTitle: (props) => ({
          margin: '0',
          marginBottom: '2',
          color: mode('gray.800', 'white')(props),
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
    Tag: {
      variants: {
        subtle: {
          container: {
            px: '3',
            py: '2',
            borderRadius: 'full',
            transition: 'all 0.3s ease-in-out',
            backgroundColor: 'gray.100',
            _hover: { backgroundColor: 'pink.400', color: 'white' },
            '.chakra-ui-dark &': {
              backgroundColor: 'gray.700',
              _hover: { backgroundColor: 'pink.400', color: 'white' },
            },
          },
        },
      },
    },
  },
  layerStyles: {
    card: {
      gridColumn: { base: 'span 2', md: 'initial' },
      p: '4',
      boxShadow: 'sm',
      borderRadius: '16',
      backgroundColor: 'gray.50',
      transition: 'all 0.2s ease-in-out',
      _hover: { boxShadow: 'base' },
      '.chakra-ui-dark &': { backgroundColor: 'gray.700' },
    },
  },
  styles: {
    global: (props) => ({
      body: {
        lineHeight: 'taller',
        backgroundColor: mode('white.200', 'indigo.900')(props),
      },
      p: {
        mb: '4',
        color: mode('gray.600', 'indigo.300')(props),
        fontFamily: 'body',
        lineHeight: '1.75',
        transition: 'all 0.3s ease-in-out',
        a: {
          color: mode('pink.400', 'pink.300')(props),
          fontWeight: 'medium',
          borderBottomColor: 'transparent',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          _hover: { color: 'pink.400', borderBottomColor: 'pink.400', textDecoration: 'none' },
        },
      },
      a: {
        color: mode('gray.800', 'whiteAlpha.800')(props),
        fontFamily: 'body',
        transition: 'all 0.3s ease-in-out',
      },
      h1: {
        color: mode('gray.800', 'white')(props),
        fontSize: 'xl',
        fontWeight: 'bold',
        mt: '8',
        mb: '4',
      },
      h2: {
        color: mode('gray.800', 'white')(props),
        fontSize: '2xl',
        fontWeight: 'bold',
        lineHeight: 'taller',
        mt: '8',
      },
      h3: {
        position: 'relative',
        display: 'inline-block',
        color: mode('gray.800', 'white')(props),
        fontSize: 'lg',
        fontWeight: 'bold',
        mt: '6',
      },
      'h3::after': {
        content: `""`,
        position: 'absolute',
        left: '0',
        top: '1.1rem',
        height: '1px',
        width: '100%',
        borderBottom: '0.8rem solid #ED64A630',
      },
      ul: {
        listStyle: 'square',
        my: '2',
      },
      li: {
        color: mode('gray.600', 'indigo.300')(props),
      },
      time: {
        color: mode('gray.800', 'white')(props),
      },
      blockquote: {
        padding: '8px 16px;',
        borderLeftWidth: '5px',
        borderLeftColor: mode('gray.200', 'indigo.200')(props),
        p: {
          margin: 0,
          color: mode('gray.500', 'indigo.200')(props),
          fontWeight: 'light',
          fontFamily: 'body',
          lineHeight: 'tall',
        },
      },
      hr: {
        mt: '8',
        backgroundColor: mode('gray.600', 'indigo.200')(props),
      },
      '*::selection': {
        background: mode('blackAlpha.200', 'whiteAlpha.200')(props),
      },
      "pre[class*='language-']": {
        '.chakra-ui-dark &': { backgroundColor: 'whiteAlpha.100' },
        '*::selection': {
          background: mode('blackAlpha.200', 'whiteAlpha.200')(props),
        },
      },
      "code[class*='language-']": {
        '.chakra-ui-dark &': { color: 'white' },
      },
      '.article': {
        img: {
          width: '100%',
          margin: '24px auto',
        },
        code: {
          fontFamily: 'mono',
          fontSize: '0.9rem',
        },
      },
      iframe: {
        margin: 0,
        padding: 0,
      },
    }),
  },
  shadows: { outline: '0 0 0 2px var(--chakra-colors-pink-300)' },
});

export default customTheme;
