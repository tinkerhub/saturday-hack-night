import { Heading, VStack, Text, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import physicalhack from '../../../assets/physicalHack.png';
import neon from '../../../assets/neon01.svg';

const What = () => (
    <>
        <Image top="500px" position="absolute" src={neon} right="0" zIndex="0" />
        <VStack
            marginTop="36px"
            paddingInline={{ base: '18px', lg: '36px' }}
            fontFamily="Clash Display"
            width="100vw"
            alignItems="flex-start"
        >
            <Heading
                fontFamily="Clash Display"
                textColor="white"
                fontSize="40px"
                textAlign="left"
                zIndex="1"
            >
                WHAT{' '}
                <span
                    style={{
                        color: '#DBF72C',
                    }}
                >
                    SATURDAY HACKNIGHT &nbsp;
                </span>
                ?
            </Heading>
            <Flex
                alignItems="flex-start"
                flexDirection={{
                    base: 'column-reverse',
                    lg: 'row',
                }}
            >
                <VStack alignItems="flex-start">
                    <Text
                        fontSize={{ base: '18px', lg: '24px' }}
                        textColor="white"
                        marginBlockStart="36px"
                        marginBlockEnd="18px"
                    >
                        Saturday Hack Night is not just your regular hackathon. Here, you will be
                        building solutions/applications via API integration on every first and third
                        Saturday of the month.
                    </Text>
                    <Text
                        textColor="#E9E5E1"
                        textAlign="left"
                        fontSize={{ base: '16px', lg: '18px' }}
                    >
                        The needed resources, the respective API and documentation will be shared
                        with you once you register.
                        <br />
                        <br />
                        All you have to do is brainstorm and come up with a solution for your
                        problem with the given API.
                        <br />
                        <br />
                        Once you are done with referring the documentation provided, team up (or
                        even go solo!) and join the Discord server to take part in an exhilarating
                        evening.
                        <br />
                        <br />
                        The problem statement will be published on Saturday evening and you will
                        have the whole night to build.
                        <br />
                        <br />
                        Stay tuned on TinkerHub Discord channels and Instagram page for the latest
                        information and clues!
                    </Text>
                </VStack>
                <Image zIndex="1" height="100%" width="100%" src={physicalhack} />
            </Flex>
        </VStack>
    </>
);

export default What;
