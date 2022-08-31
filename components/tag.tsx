import Link from 'next/link';
import React from 'react';
import { Tag as ChakraTag, TagLeftIcon, TagLabel, ListItem } from '@chakra-ui/react';
import { FaHashtag } from 'react-icons/fa';

export default function Tag({ children, href }: TagProps) {
  return (
    <ListItem>
      <Link href={`/tag/${href.toLowerCase()}`} passHref>
        <ChakraTag
          as="a"
          variant="subtle"
          px="3"
          py="2"
          borderRadius="full"
          transition="all 300ms ease-in-out"
          _hover={{ background: 'pink.400', color: 'white' }}
        >
          <TagLeftIcon width="10px" as={FaHashtag} mr="1" />
          <TagLabel fontWeight="bold">{children}</TagLabel>
        </ChakraTag>
      </Link>
    </ListItem>
  );
}

type TagProps = {
  children?: React.ReactNode;
  href: string;
};
