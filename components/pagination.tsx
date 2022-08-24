import Link from 'next/link';
import { Flex, Button } from '@chakra-ui/react';

export default function Pagination({ numPages, currentPage }: { numPages: number; currentPage: number }) {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = `/page/${currentPage - 1}`;
  const nextPage = `/page/${currentPage + 1}`;

  if (numPages === 1) return <></>;
  return (
    <Flex justifyContent="space-between" alignItems="center" my="8">
      <Link href={prevPage} passHref>
        <Button isDisabled={isFirst}>← Previous</Button>
      </Link>
      <Link href={nextPage} passHref>
        <Button isDisabled={isLast}>Next →</Button>
      </Link>
    </Flex>
  );
}
