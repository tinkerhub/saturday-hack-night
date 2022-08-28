import { Heading, VStack, Box } from '@chakra-ui/react';
import React from 'react';
import { Chat } from '../../components';

const chats = [
    {
        profileUrl: 'https://www.github.com/appukurian.png',
        name: 'Kurian Jacob',
        org: 'TinkerHub Foundation',
        position: '-150px',
        message: 'My self confidence & optimism increased as i was able to build my own project..',
    },
    {
        profileUrl: 'https://www.github.com/DarkPhoenix2704.png',
        name: 'Anbarasu',
        org: 'TinkerHub Foundation',
        position: '150px',
        message:
            'SHN helps me to explore & experience new APIs & connect more with the emerging industrial concepts.',
    },
    {
        profileUrl: 'https://github.com/fathimaniswa.png',
        name: 'Fathima Niswa',
        org: 'TinkerHub Foundation',
        position: '-125px',
        message:
            'This is a beginner friendly hackathon as a team project. So it lend me a hand to learn & understand new things in a comfortable environment.',
    },
];

const Why = () => (
    <VStack>
        <Heading
            fontWeight="700"
            color="#2A1437"
            textAlign="center"
            marginBlockEnd="40px"
            fontSize={{ base: '45px', md: '74px' }}
            textShadow="1px 1px #fff, 1px -1px #fff, -1px 1px #fff, -1px -1px #fff"
        >
            WHY SATURDAY HACKNIGHT?
        </Heading>
        {chats.map((chat) => (
            <Box position="relative" left={{ lg: chat.position }}>
                <Chat {...chat} />
            </Box>
        ))}
    </VStack>
);

export default Why;
