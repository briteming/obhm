import React, { useRef, createRef, useEffect } from 'react';

import { useColorMode, Box } from '@chakra-ui/react';

type UtterancesType = {
  theme: string;
};

const src = 'https://utteranc.es/client.js';
const utterancesSelector = 'iframe.utterances-frame';

export default function Utterances({ theme }: UtterancesType) {
  const { colorMode } = useColorMode();

  const containerRef = createRef<HTMLDivElement>();
  const isUtterancesCreated = useRef(false);

  const repo: string = 'ohprettyhak/blog-comments';

  if (colorMode && colorMode != theme.replace('github-', ''))
    theme = document.body.className === 'chakra-ui-light' ? 'github-light' : 'github-dark';

  useEffect(() => {
    if (!repo) return;

    const createUtterancesEl = () => {
      const utterances = document.createElement('script');

      const attributes = {
        src,
        repo,
        'issue-term': 'pathname',
        label: 'comment',
        theme: theme,
        crossOrigin: 'anonymous',
        async: 'true',
      };
      Object.entries(attributes).forEach(([key, value]) => {
        utterances.setAttribute(key, value);
      });
      containerRef.current?.appendChild(utterances);
      isUtterancesCreated.current = true;
    };

    const utterancesEl = containerRef.current?.querySelector(utterancesSelector) as HTMLIFrameElement;

    const postThemeMessage = () => {
      const message = {
        type: 'set-theme',
        theme: theme,
      };
      utterancesEl?.contentWindow?.postMessage(message, src);
    };

    isUtterancesCreated.current ? postThemeMessage() : createUtterancesEl();
  }, [containerRef, repo, theme]);

  return <Box mt={12} ref={containerRef} />;
}
