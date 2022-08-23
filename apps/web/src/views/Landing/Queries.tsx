import React from 'react';
import { Heading, VStack, Text, Flex, Input, Textarea } from '@chakra-ui/react';
import { Button } from '../../components';

const Queries = () => (
    <VStack height={{ lg: '100vh' }} justifyContent="center">
        <Heading
            fontWeight="700"
            color="#2A1437"
            textAlign="center"
            marginBlockEnd="40px"
            fontSize={{ base: '45px', md: '74px' }}
            textShadow="1px 1px #fff, 1px -1px #fff, -1px 1px #fff, -1px -1px #fff"
        >
            STILL QUERIES?
        </Heading>
        <Flex columnGap="150px" rowGap="50px" flexDirection={{ base: 'column', lg: 'row' }}>
            <VStack spacing="10px">
                <Heading width="100%" textAlign="left">
                    Email Us
                </Heading>
                <Input
                    height="55px"
                    variant="solid"
                    width="350px"
                    color="#323232"
                    borderRadius="8px"
                    placeholder="Name"
                />
                <Input
                    height="55px"
                    variant="solid"
                    color="#323232"
                    borderRadius="8px"
                    width="350px"
                    placeholder="Email"
                />
                <Textarea
                    variant="solid"
                    color="#323232"
                    width="350px"
                    borderRadius="8px"
                    placeholder="Message"
                />
                <Button label="Submit" marginBlockStart="0px" />
            </VStack>
            <VStack background="#3C1F4E" height="350px" padding="25px" borderRadius="15px">
                <Heading width="100%" textAlign="left">
                    Ping Us
                    <br />
                    <br />
                </Heading>
                <Text>
                    Fathim Niswa : wa.me/+919846119108 <br />N Anbarasu : wa.me/+918592990572
                    <br />
                    <br />
                </Text>
                <Text>We will get you back soon!!</Text>
            </VStack>
        </Flex>
    </VStack>
);

export default Queries;
