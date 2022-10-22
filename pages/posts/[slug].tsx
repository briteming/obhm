import { useEffect } from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import matter from 'gray-matter';
import prism from 'prismjs';
import { marked } from 'marked';
import { NextSeo } from 'next-seo';
import { Box, Heading, UnorderedList, HStack, Wrap, Text } from '@chakra-ui/react';

import Layout from '@/components/layout';
import Tag from '@/components/tag';
import Utterances from '@/components/utterances';
import getExcerpt from '@/libs/getExcerpt';
import { PostType } from '@/types/post';
import { URL, AUTHOR, OG_IMAGE } from '@/config/config';

import 'prismjs/components/prism-java.min';
import 'prismjs/components/prism-python.min';
import 'prismjs/components/prism-javascript.min';
import 'prismjs/components/prism-typescript.min';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-tsx.min';
import 'prismjs/components/prism-c.min';
import 'prismjs/components/prism-cpp.min';
import 'prismjs/components/prism-bash.min';

export default function PostPage({ frontmatter, content, slug, excerpt }: PostType) {
  useEffect(() => {
    prism.highlightAll();
  }, []);

  return (
    <Layout title={frontmatter.title} description={excerpt}>
      <NextSeo
        openGraph={{
          url: URL + `/posts/` + slug,
          type: 'article',
          article: {
            publishedTime: frontmatter.date,
            tags: frontmatter.tags,
            authors: [AUTHOR.NAME],
          },
          images: [
            {
              url: frontmatter.socialImage ? URL + frontmatter.socialImage : URL + OG_IMAGE,
            },
          ],
        }}
      />

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
      <div className="article" dangerouslySetInnerHTML={{ __html: marked(content) }} />
      <UnorderedList mt={8} marginInlineStart="0">
        <Wrap spacing="2">
          {frontmatter.tags &&
            frontmatter.tags.map((tag, index) => (
              <Tag href={tag} key={index}>
                {tag}
              </Tag>
            ))}
        </Wrap>
      </UnorderedList>
      <Box mt={8}>
        <Utterances />
      </Box>
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
