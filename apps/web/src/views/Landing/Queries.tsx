import React from 'react';
import { Heading, VStack, Text, Flex } from '@chakra-ui/react';

const Queries = () => (
    <VStack maxWidth={{ base: '100%', lg: 'container.lg' }}>
        <Heading
            fontWeight="700"
            color="#000000"
            textAlign="center"
            marginBlock="20px"
            letterSpacing="4px"
            fontSize={{
                base: '2rem',
                md: '3.5rem',
            }}
            textShadow="2px 2px #fff, 2px -2px #fff, -2px 2px #fff, -2px -2px #fff
                    ,3px 3px #951BF4, 3px -3px #951BF4, -3px 3px #951BF4, -3px -3px #951BF4"
        >
            CONTACT US{' '}
        </Heading>
        <Flex
            justifyContent="space-evenly"
            width={{ base: 'full', lg: 'container.lg' }}
            alignItems="center"
            flexWrap="wrap"
            background="#69003F"
            color="#fff"
            borderRadius="8px"
            paddingInline="16px"
            paddingBlock="16px"
        >
            <Heading
                fontWeight="700"
                color="#fff"
                textAlign="center"
                marginBlock="20px"
                letterSpacing="4px"
                fontSize={{
                    base: '2rem',
                    md: '3.5rem',
                }}
                textShadow="2px 1px #951BF4"
            >
                STILL QUERIES?
            </Heading>
            <VStack>
                <Text fontSize="16px">
                    Fathim Niswa : wa.me/+919846119108
                    <br />N Anbarasu :wa.me/+918592990572
                </Text>
            </VStack>
        </Flex>
    </VStack>
);

export default Queries;
