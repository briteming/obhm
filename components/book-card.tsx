import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import _ from 'lodash';
import { Box, Link, Text, Skeleton } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import { BookDataType } from '@/types/now';

const BOOK_LIST_URL = `https://haklee-notes-api.web.app/book/recently_read`;

const BookCard: React.FC = () => {
  const [data, setData] = useState<BookDataType[]>();

  useEffect(() => {
    Axios.get(BOOK_LIST_URL)
      .then((result) => {
        setData(result.data.slice(-4));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Box layerStyle="card">
        <Text variant="cardTitle">📚 Recently Read</Text>
        {!data
          ? _.range(4).map((_, i: number) => (
              <Box key={i} py={2}>
                <Skeleton height={5} />
                <Skeleton height={3.5} mt={2.5} />
              </Box>
            ))
          : data.map((book: BookDataType, i: number) => (
              <Box key={i} mb={2}>
                <Link
                  href={`https://ridibooks.com/books/${book.code}`}
                  target="_blank"
                  variant="underline"
                  fontSize="md"
                  fontWeight="bold"
                  lineHeight="0"
                  title={`Read more about ${book.name} on RIDI`}
                >
                  {book.name} <ExternalLinkIcon mx="2px" />
                </Link>
                <Text m="0" lineHeight={5} fontSize="xs" textTransform="uppercase">
                  by {book.author}
                </Text>
              </Box>
            ))}
      </Box>
    </>
  );
};

export default BookCard;
