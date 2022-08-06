import React from 'react';
import Link from 'next/link';
import {
  useColorMode,
  Grid,
  Flex,
  VStack,
  UnorderedList,
  ListItem,
  SimpleGrid,
  Text,
  IconButton,
  Image,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { FaGithub, FaInstagram, FaLinkedinIn, FaRss, FaEnvelope, FaMoon, FaSun } from 'react-icons/fa';

import config from '@/config/config';
import SocialIcon from '@/components/social-icon';

const Navigation: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Grid
      as="aside"
      alignContent="flex-start"
      gap="10"
      gridTemplateColumns={{ base: 'auto auto', md: 'auto' }}
      mb={{ base: '8', md: '0' }}
      top={{ base: '0', md: '4' }}
    >
      <Flex direction="column">
        <Link href="/" passHref>
          <ChakraLink
            as="a"
            display="inline-block"
            width="24"
            height="24"
            overflow="hidden"
            borderRadius="50%"
            color="transparent"
            textDecoration="none"
            transform="translateZ(0)"
          >
            <Image
              src="https://avatars.githubusercontent.com/u/97780352?v=4"
              alt="Profile Image"
              pointerEvents="none"
              w="96px"
              h="96px"
            />
          </ChakraLink>
        </Link>
        <Link href="/" passHref>
          <ChakraLink
            as="a"
            variant="noeffect"
            display="block"
            mt="4"
            fontSize="medium"
            fontWeight="bold"
            textDecoration="none"
            transition="color 0.3s ease-in-out"
            _hover={{
              color: 'pink.400',
            }}
          >
            {config.auther.name}
          </ChakraLink>
        </Link>
        <Text mt="3" color={colorMode === `light` ? 'gray.600' : 'white'} fontSize="md">
          {config.description}
        </Text>
      </Flex>

      <VStack gap={{ base: '2', md: '8' }} alignItems={{ base: 'flex-end', md: 'flex-start' }}>
        {/* Menu */}
        <UnorderedList padding="0" listStyleType="none" marginInlineStart="0" spacing="3">
          {config.menu.map((item) => (
            <ListItem key={item.path} listStyleType="none">
              <Link href={item.path} passHref>
                <ChakraLink
                  as="a"
                  textDecoration="none"
                  color={colorMode === `light` ? 'gray.600' : 'white'}
                  fontSize="md"
                  borderBottomColor={'transparent'}
                  borderBottomWidth="1px"
                  borderBottomStyle="solid"
                  transition="all 0.3s ease-in-out"
                  _hover={{
                    color: 'pink.400',
                    borderBottomColor: 'pink.400',
                  }}
                >
                  {item.label}
                </ChakraLink>
              </Link>
            </ListItem>
          ))}
        </UnorderedList>

        {/* Social Icons */}
        <SimpleGrid mt="4" spacingX="4" spacingY="2" columns={3} display={{ base: 'none', md: 'grid' }}>
          <SocialIcon href={`https://github.com/${config.social.github}`} label="Link to Github">
            <FaGithub />
          </SocialIcon>
          <SocialIcon href={`https://instagram.com/${config.social.instagram}`} label="Link to Instagram">
            <FaInstagram />
          </SocialIcon>
          <SocialIcon href={`https://linkedin.com/in/${config.social.linkedIn}`} label="Link to Linkedin">
            <FaLinkedinIn />
          </SocialIcon>
          <SocialIcon href={`https://github.com/${config.social.github}`} label="Link to RSS">
            <FaRss />
          </SocialIcon>
          <SocialIcon href={`mailto:${config.social.email}`} label="Write an Email">
            <FaEnvelope />
          </SocialIcon>
        </SimpleGrid>
        <IconButton
          display={{ base: 'none', md: 'flex' }}
          width="4"
          aria-label="Switch Color Mode"
          colorScheme="gray"
          onClick={toggleColorMode}
          isRound
          icon={colorMode === `light` ? <FaMoon /> : <FaSun />}
        />
      </VStack>
    </Grid>
  );
};

export default Navigation;
