import Link from 'next/link';
import dayjs from 'dayjs';
import { Button, HStack, Heading, Text, Box } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import { PostType } from '@/types/post';

export default function Post({ post }: { post: PostType }) {
  return (
    <Box as="article" w="100%" mb="6" justifyItems="baseline">
      <HStack as="span" spacing="2">
        <Text as="time" fontSize="sm" fontWeight="bold" textTransform="uppercase">
          {dayjs(post.frontmatter.date).format(`MMMM YYYY`)}
        </Text>
        <Text variant="small" fontSize="sm" color="secondary.400" fontWeight="bold">
          {post.frontmatter.category}
        </Text>
      </HStack>
      <Link href={`/posts/${post.frontmatter.slug}`} passHref>
        <Heading w="100%" variant="title" mt="0">
          {post.frontmatter.title}
        </Heading>
      </Link>
      <Text noOfLines={3} my="2">
        {post.excerpt}
      </Text>
      <Link href={`/posts/${post.frontmatter.slug}`} passHref>
        <Button as="a" rightIcon={<ArrowForwardIcon />} variant="ghost" ml="-18px">
          Read more
        </Button>
      </Link>
    </Box>
  );
}
