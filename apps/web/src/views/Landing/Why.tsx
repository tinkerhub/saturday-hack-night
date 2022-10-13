import { Heading, VStack, Text, HStack, Image } from '@chakra-ui/react';
import React from 'react';
import physicalhack from '../../../assets/physicalHack.png';
import neon from '../../../assets/neon01.svg';

const Why = () => (
    <>
        <Image top="500px" position="absolute" src={neon} right="0" zIndex="0" />
        <VStack
            marginTop="36px"
            paddingInline="36px"
            fontFamily="Clash Display"
            width="100vw"
            alignItems="flex-start"
        >
            <Heading textColor="white" fontSize="40px" textAlign="left">
                WHY{' '}
                <span
                    style={{
                        color: '#DBF72C',
                    }}
                >
                    SATURDAY HACKNIGHT &nbsp;
                </span>
                ?
            </Heading>
            <HStack alignItems="flex-start">
                <VStack alignItems="flex-start">
                    <Text fontSize="24px" textColor="white">
                        Saturday Hack Night is not just your regular hackathon. Here, you will be
                        building solutions/applications via API integration on every first and third
                        Saturday of the month.
                    </Text>
                    <Text
                        marginBlockStart="18px"
                        textColor="#E9E5E1"
                        fontSize="16px"
                        textAlign="left"
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
            </HStack>
        </VStack>
    </>
);

export default Why;
