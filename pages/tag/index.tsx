import Link from 'next/link';
import { Heading, Box, UnorderedList, Link as ChakraLink } from '@chakra-ui/react';

import Layout from '@/components/layout';
import getTopics from '@/libs/getTopics';

const TagPage = ({ tags }: any) => {
  return (
    <Layout title="Tag">
      <Heading as="h1" variant="pagetitle">
        List of Tag
      </Heading>
      <UnorderedList>
        {tags.map(({ params: { tag_name } }: { params: { tag_name: string } }, index: number) => (
          <Box as="li" key={index}>
            <Link href={`/tag/${tag_name}`} passHref>
              <ChakraLink display="inline" variant="underline">
                {tag_name}
              </ChakraLink>
            </Link>
          </Box>
        ))}
      </UnorderedList>
    </Layout>
  );
};

export default TagPage;

export async function getStaticProps() {
  const paths = getTopics();
  return { props: { tags: paths } };
}
