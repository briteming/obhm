import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import matter from 'gray-matter';
import { marked } from 'marked';
import { Heading, UnorderedList, HStack, Wrap, Text } from '@chakra-ui/react';

import Layout from '@/components/layout';
import { PostType } from '@/types/post';
import { getExcerpt } from '@/libs/posts';

export default function PostPage({ frontmatter, content, slug, excerpt }: PostType) {
  return (
    <Layout title={frontmatter.title} description={excerpt}>
      <HStack spacing="2">
        <Text as="time" fontSize="sm" fontWeight="bold" textTransform="uppercase">
          {dayjs(frontmatter.date).format(`MMMM YYYY`)}
        </Text>
        <Link href={`/category/${frontmatter.category}/`} passHref>
          <Text
            as="a"
            fontSize="sm"
            color="gray.400"
            fontWeight="bold"
            _hover={{
              color: 'gray.300',
            }}
          >
            {frontmatter.category}
          </Text>
        </Link>
      </HStack>
      <Heading as="h1" variant="pagetitle" mt="2" mb="8">
        {frontmatter.title}
      </Heading>
      <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
      <UnorderedList marginInlineStart="0">
        <Wrap spacing="2">
          {/* {frontmatter.tags &&
            frontmatter.tags.map((tag, index) => (
              <Tag href={tag} key={index}>
                {tag}
              </Tag>
            ))} */}
        </Wrap>
      </UnorderedList>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('content/posts'));
  const paths = files.map((filename) => ({
    params: { slug: filename.replace('.md', '') },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }: { params: { slug: string } }) {
  const markdownWithMeta = fs.readFileSync(path.join('content/posts', slug + '.md'), 'utf-8');

  const { data: frontmatter, content } = matter(markdownWithMeta);
  const excerpt = getExcerpt(content, 100);

  return { props: { frontmatter, content, excerpt, slug } };
}
