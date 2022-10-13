import React from 'react';
import { Heading, VStack, Text, Flex } from '@chakra-ui/react';

const Queries = () => (
    <VStack marginBlock="32px">
        <Heading
            fontFamily="Clash Display"
            textColor="#DBF72C"
            textAlign="left"
            width="100vw"
            paddingInline="36px"
            fontSize="40px"
            marginBlockEnd="36px"
        >
            Contact us 📲
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
            paddingBlock="32px"
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
                    Fathim Niswa : &nbsp; wa.me/+919846119108
                    <br />N Anbarasu : &nbsp; wa.me/+918592990572
                </Text>
            </VStack>
        </Flex>
    </VStack>
);

export default Queries;
