import Link from 'next/link';
import { Heading, Box, UnorderedList, Link as ChakraLink } from '@chakra-ui/react';

import Layout from '@/components/layout';
import getPosts from '@/libs/getPosts';

const CategoryPage = ({ categories }: any) => {
  return (
    <Layout title="Category">
      <Heading as="h1" variant="pagetitle">
        List of Category
      </Heading>
      <UnorderedList>
        {categories.map((category: string, index: number) => (
          <Box as="li" key={index}>
            <Link href={`/category/${category.toLowerCase()}`} passHref>
              <ChakraLink display="inline" variant="underline">
                {category}
              </ChakraLink>
            </Link>
          </Box>
        ))}
      </UnorderedList>
    </Layout>
  );
};

export default CategoryPage;

export async function getStaticProps() {
  const posts = getPosts();
  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = [...Array.from(new Set(categories))];

  return { props: { categories: uniqueCategories } };
}
