import { NextSeo } from 'next-seo';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { FaHashtag } from 'react-icons/fa';

import Layout from '@/components/layout';
import Post from '@/components/post';
import getPosts from '@/libs/getPosts';
import getTopics from '@/libs/getTopics';
import { URL } from '@/config/config';
import { PostType } from '@/types/post';

const TagPage = ({ posts, tagName }: { posts: PostType[]; tagName: string }) => {
  return (
    <Layout title={`#${tagName}`}>
      <NextSeo
        openGraph={{
          url: URL + `/tag/` + tagName,
        }}
      />
      <Flex gap={1} alignItems="center">
        <Heading as="span" fontSize="3xl" pb={0} mb={0}>
          <FaHashtag />
        </Heading>
        <Heading as="h1" fontSize="4xl" pb={0} mb={0}>
          {tagName}
        </Heading>
      </Flex>

      <Text mt={2} mb={8} fontWeight="semibold">
        총 {posts.length}개의 포스트
      </Text>
      {posts.map((post: PostType, index: number) => (
        <Post post={post} key={index} />
      ))}
    </Layout>
  );
};

export default TagPage;

export async function getStaticPaths() {
  const paths = getTopics();
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { tag_name } }: { params: { tag_name: string } }) {
  const posts = getPosts();

  const filteredPosts = posts.filter(
    (post) => post.frontmatter.tags && post.frontmatter.tags.map((t: any) => t.toLowerCase()).includes(tag_name),
  );

  return { props: { posts: filteredPosts, tagName: tag_name } };
}
