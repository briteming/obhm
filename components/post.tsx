import Link from 'next/link';
import dayjs from 'dayjs';
import { HStack, Heading, Text, Box, Link as ChakraLink } from '@chakra-ui/react';

import { PostType } from '@/types/post';

export default function Post({ post }: { post: PostType }) {
  return (
    <Box as="article" w="100%" mb="6" justifyItems="baseline">
      <HStack as="span" spacing="2">
        <Text as="time" fontSize="sm" fontWeight="bold" textTransform="uppercase">
          {dayjs(post.frontmatter.date).format(`MMMM YYYY`)}
        </Text>
        <Link href={`/category/${post.frontmatter.category}`} passHref>
          <Text
            as="a"
            variant="small"
            fontSize="sm"
            color="gray.400"
            fontWeight="bold"
            _hover={{
              color: 'gray.300',
            }}
          >
            {post.frontmatter.category}
          </Text>
        </Link>
      </HStack>
      <Link href={`/posts/${post.slug}`} passHref>
        <Heading
          as="a"
          w="100%"
          variant="PostTitle"
          mt="0"
          _hover={{
            color: 'pink.400',
          }}
        >
          {post.frontmatter.title}
        </Heading>
      </Link>
      <Text noOfLines={3} mt={2} mb={3}>
        {post.excerpt}
      </Text>
      <Link href={`/posts/${post.slug}`} passHref>
        <ChakraLink as="a" variant="underline" fontSize="md" fontWeight="semibold">
          Read More →
        </ChakraLink>
      </Link>
    </Box>
  );
}
