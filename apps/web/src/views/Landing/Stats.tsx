import { Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const Stats = () => (
    <Flex
        marginBlock="28px"
        columnGap={{
            lg: '50px',
            xl: '100px',
        }}
        justifyContent="center"
        alignItems="center"
        rowGap="25px"
        flexDirection={{ base: 'column', lg: 'row' }}
    >
        <VStack spacing="36px">
            <Heading fontFamily="Clash Display" textColor="#DBF72C" fontSize="80px">
                1000+
            </Heading>
            <Text
                textColor="white"
                fontFamily="Clash Display"
                fontSize="24px"
                style={{
                    marginTop: '0px',
                }}
            >
                Participants
            </Text>
        </VStack>
        <VStack>
            <Heading fontFamily="Clash Display" textColor="#DBF72C" fontSize="80px">
                200+
            </Heading>
            <Text
                textColor="white"
                fontFamily="Clash Display"
                fontSize="24px"
                style={{
                    marginTop: '0px',
                }}
            >
                Projects
            </Text>
        </VStack>
        <VStack>
            <Heading fontFamily="Clash Display" textColor="#DBF72C" fontSize="80px">
                13+
            </Heading>
            <Text
                textColor="white"
                fontFamily="Clash Display"
                fontSize="24px"
                style={{
                    marginTop: '0px',
                }}
            >
                HackNights
            </Text>
        </VStack>
        <VStack>
            <Heading fontFamily="Clash Display" textColor="#DBF72C" fontSize="80px">
                01
            </Heading>
            <Text
                textColor="white"
                fontFamily="Clash Display"
                fontSize="24px"
                whiteSpace="nowrap"
                textAlign="center"
                style={{
                    marginTop: '0px',
                }}
            >
                Physical HackNight
            </Text>
        </VStack>
    </Flex>
);
export default Stats;
