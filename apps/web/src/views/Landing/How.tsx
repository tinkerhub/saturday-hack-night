import { VStack, Heading, Flex } from '@chakra-ui/react';
import React from 'react';
import { Card } from '../../components';

const How = () => {
    const steps = [
        {
            num: '01',
            heading: 'Create a Repo',
            text: 'Create a repo & initialize it with a README.md file.',
        },
        {
            num: '02',
            heading: 'Create a Team',
            text: 'Go to Events Page & create a Team(Team Lead).',
        },
        {
            num: '03',
            heading: 'Accept Team Invite',
            text: 'Team Members will receive team invite link.',
        },
        {
            num: '04',
            heading: 'Start Building',
            text: 'Build at HackNight.',
        },
    ];

    return (
        <VStack height={{ md: '100vh' }} justifyContent="center">
            <Heading
                fontWeight="700"
                color="#2A1437"
                textAlign="center"
                marginBlockEnd="40px"
                fontSize={{ base: '45px', md: '74px' }}
                textShadow="1px 1px #fff, 1px -1px #fff, -1px 1px #fff, -1px -1px #fff"
            >
                HOW TO REGISTER?
            </Heading>
            <Flex
                marginBlock="36px"
                justifyContent="center"
                columnGap="50px"
                rowGap="50px"
                flexWrap="wrap"
            >
                {steps.map((step) => (
                    <Card {...step} />
                ))}
            </Flex>
        </VStack>
    );
};
export default How;
