import Link from 'next/link';
import { Flex, Box, Heading, Text, IconButton, Link as GatsbyLink } from '@chakra-ui/react';

import Layout from '@/components/layout';
import { SOCIAL } from '@/config/config';

export default function AboutPage() {
  return (
    <Layout title="About Me">
      <Flex justifyContent="space-between" alignItems="baseline" width="100%">
        <Heading fontSize="md">👋 Hi there!</Heading>
        <IconButton as="span" width="4" aria-label="" opacity="0" isRound>
          <Box as="span" display="block" w={4} h={4} />
        </IconButton>
      </Flex>
      <Box>
        <Text>
          안녕하세요. 이 블로그를 만들고, 글을 쓰는 <strong>이학</strong>이라고 합니다. 처음부터 블로그를 만들고자 했던
          건 아니고.. <code>React</code>, <code>Gatsby.js</code>, <code>Next.js</code>를 공부하다 보니 여기까지 왔네요.
        </Text>
        <Text>
          2019년부터 현재까지 한국외국어대학교에서 컴퓨터 공학과 언어학을 공부하고 있습니다. 자연어 처리(Natural
          Language Processing) 분야의 고수가 되는 게 목표입니다.
        </Text>
        <Text>
          군인입니다. 2021년 7월 M/W운용·정비병으로 입대해 복무 중입니다. 군대에서 이것저것 많이 해보려고 했는데, 정작
          한 건 백준 티어 골드3이네요. solved.ac 프로필은&nbsp;
          <Link href="https://solved.ac/profile/officeman" passHref>
            <GatsbyLink as="a" target="_blank" variant="underline" fontWeight="semibold">
              이쪽
            </GatsbyLink>
          </Link>
          입니다. 빨리 전역하고 싶습니다.
        </Text>
        <Text>
          이 블로그의 모든 코드는 제 깃허브의&nbsp;
          <Link href="https://github.com/ohprettyhak/blog.haklee.me" passHref>
            <GatsbyLink as="a" target="_blank" variant="underline" fontWeight="semibold">
              blog.haklee.me
            </GatsbyLink>
          </Link>
          &nbsp;리포지토리에서 확인하실 수 있습니다. 일부 코드와 디자인은&nbsp;
          <Link href="https://desktopofsamuel.com/" passHref>
            <GatsbyLink as="a" target="_blank" variant="underline" fontWeight="semibold">
              Samuel Wong(desktopofsamuel)
            </GatsbyLink>
          </Link>
          &nbsp;님의&nbsp;
          <Link href="https://github.com/desktopofsamuel/notes-v3" passHref>
            <GatsbyLink as="a" target="_blank" variant="underline" fontWeight="semibold">
              notes-v3
            </GatsbyLink>
          </Link>
          &nbsp;리포지토리를 참고했음을 알려드립니다.
          <br />
          <small>
            <u>Attribution-NonCommercial-ShareAlike 4.0 International</u> 라이선스를 적용받습니다.
          </small>
        </Text>
        <Text>
          더 궁금한 내용이 있으시거나, 게시글에 오류가 있는 경우&nbsp;
          <Link href={`mailto:${SOCIAL.EMAIL}`} passHref>
            <GatsbyLink as="a" target="_blank" variant="underline" fontWeight="semibold">
              이메일
            </GatsbyLink>
          </Link>
          로 연락해주시면 감사하겠습니다! 🙂
        </Text>
      </Box>
    </Layout>
  );
}
