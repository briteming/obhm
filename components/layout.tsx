import React from 'react';
import { Container, Grid, Box, Text, Link } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import Sidebar from '@/components/sidebar';

const Layout: React.FC<LayoutProps> = ({ title, description, children }) => {
  return (
    <React.Fragment>
      <NextSeo title={title} description={description} />
      <Container maxW="container.lg">
        <Grid
          gridTemplateColumns={{
            base: '100%',
            md: '200px minmax(0, 1fr)',
            lg: '200px minmax(0, 1px) minmax(0, 1fr)',
          }}
          py="10"
          gap={{ base: '0', md: '2', lg: '10' }}
        >
          <Sidebar />
          <Box
            background="linear-gradient(180deg, #e6e6e6 0, #e6e6e6 48%, #fff)"
            height="33vh"
            width="1px"
            display={{ base: 'none', md: 'none', lg: 'block' }}
          />
          <Box as="main">
            <>
              {children}
              <Text mt={16} fontSize="xs" textAlign="center">
                © 2022 Hak Lee. Designed by desktopofsamuel(
                <Link href="https://notes.desktopofsamuel.com/" target="_blank" variant="underline">
                  notes-3
                </Link>
                ).
              </Text>
            </>
          </Box>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Layout;

type LayoutProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};
