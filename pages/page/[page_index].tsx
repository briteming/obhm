import fs from 'fs';
import path from 'path';
import { Flex, VStack, Heading, IconButton, useDisclosure } from '@chakra-ui/react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import Layout from '@/components/layout';
import Now from '@/components/now';
import Post from '@/components/post';
import Pagination from '@/components/pagination';
import { getPosts } from '@/libs/posts';
import { sortByDate } from '@/utils/index';
import { POSTS_PER_PAGE } from '@/config/config';
import { PostType } from '@/types/post';

export default function HomePage({
  posts,
  numPages,
  currentPage,
}: {
  posts: PostType[];
  numPages: number;
  currentPage: number;
}) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Layout title={currentPage == 1 ? '' : `전체 글 보기 - ` + currentPage + `페이지`}>
      {currentPage == 1 && (
        <>
          <Flex justifyContent="space-between" alignItems="baseline" width="100%">
            <Heading fontSize="md">Now</Heading>
            <IconButton
              width="4"
              aria-label={isOpen ? 'Open All Now' : 'Hide All Now'}
              colorScheme="gray"
              isRound
              onClick={onToggle}
              icon={isOpen ? <FaChevronDown /> : <FaChevronUp />}
            />
          </Flex>
          <Now isOpen={!isOpen} />
        </>
      )}
      <VStack spacing="8">
        {posts.map((post: PostType, index: number) => (
          <Post post={post} key={index} />
        ))}
      </VStack>
      <Pagination currentPage={currentPage} numPages={numPages} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('content/posts'));
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  let paths = [];
  for (let i = 1; i <= numPages; i++) paths.push({ params: { page_index: i.toString() } });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: any }) {
  const files = getPosts();
  const page = parseInt((params && params.page_index) || 1);
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;
  const orderedPosts = files.sort(sortByDate).slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE);

  return { props: { posts: orderedPosts, numPages, currentPage: page } };
}
