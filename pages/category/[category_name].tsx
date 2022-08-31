import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Heading } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import Layout from '@/components/layout';
import Post from '@/components/post';
import { getPosts } from '@/libs/posts';
import { URL } from '@/config/config';
import { PostType } from '@/types/post';

export default function CategoryPage({ posts, categoryName }: { posts: any; categoryName: string }) {
  return (
    <Layout title={`#${categoryName}`}>
      <NextSeo
        openGraph={{
          url: URL + `/category/` + categoryName,
        }}
      />
      <Heading fontSize="3xl">#{categoryName}</Heading>
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
