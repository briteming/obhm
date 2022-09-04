import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { FaShapes } from 'react-icons/fa';
import { NextSeo } from 'next-seo';

import Layout from '@/components/layout';
import Post from '@/components/post';
import getPosts from '@/libs/getPosts';
import { URL } from '@/config/config';
import { PostType } from '@/types/post';

export default function CategoryPage({ posts, categoryName }: { posts: PostType[]; categoryName: string }) {
  return (
    <Layout title={`${categoryName} Archives`}>
      <NextSeo
        openGraph={{
          url: URL + `/category/` + categoryName,
        }}
      />
      <Flex gap={2} alignItems="center">
        <Heading as="span" fontSize="3xl" pb={0} mb={0}>
          <FaShapes />
        </Heading>
        <Heading as="h1" fontSize="4xl" pb={0} mb={0}>
          {categoryName}
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
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('content/posts'));
  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join('content/posts', filename), 'utf-8');

    const { data: frontmatter } = matter(markdownWithMeta);
    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map((category) => ({
    params: { category_name: category },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { category_name } }: { params: { category_name: string } }) {
  const posts = getPosts();

  const categoryPosts = posts.filter((post) => post.frontmatter.category.toLowerCase() === category_name);

  return { props: { posts: categoryPosts, categoryName: category_name } };
}
