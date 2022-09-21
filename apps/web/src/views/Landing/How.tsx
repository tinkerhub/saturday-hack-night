import { VStack, Heading, Flex } from '@chakra-ui/react';
import React from 'react';
import { Card } from '../../components';

const How = () => {
    const steps = [
        {
            num: '01',
            color: '#F9D857',
            heading: 'Create a Repo',
            text: 'Create a repo & initialize it with a README.md file.',
        },
        {
            num: '02',
            color: '#28A265',
            heading: 'Create a Team',
            text: 'Go to Events Page & create a Team(Team Lead).',
        },
        {
            num: '03',
            color: '#698BF7',
            heading: 'Accept Team Invite',
            text: 'Team Members will receive team invite link.',
        },
        {
            num: '04',
            color: '#FF781E',
            heading: 'Start Building',
            text: 'Build at HackNight.',
        },
    ];

    return (
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
