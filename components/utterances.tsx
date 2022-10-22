import React, { useRef, createRef, useEffect } from 'react';

import { useColorMode, Box } from '@chakra-ui/react';

const src = 'https://utteranc.es/client.js';
const utterancesSelector = 'iframe.utterances-frame';

const Utterances: React.FC = () => {
  const { colorMode } = useColorMode();
  const containerRef = createRef<HTMLDivElement>();
  const isUtterancesCreated = useRef(false);

  const repo: string = 'ohprettyhak/blog-comments';
  let theme: string = colorMode === 'light' ? 'github-light' : 'dark-blue';

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
  }, [repo, theme]);

  return <Box ref={containerRef} />;
};

Utterances.displayName = 'Utterances';

export default Utterances;
