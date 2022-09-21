import { Heading, VStack, Box } from '@chakra-ui/react';
import React from 'react';
import { Chat } from '../../components';

const chats = [
    {
        profileUrl: 'https://www.github.com/appukurian.png',
        name: 'Kurian Jacob',
        org: 'TinkerHub Foundation',
        position: '-200px',
        color: '#5B9E7D',
        message: 'My self confidence & optimism increased as i was able to build my own project..',
    },
    {
        profileUrl: 'https://www.github.com/DarkPhoenix2704.png',
        name: 'Anbarasu',
        org: 'TinkerHub Foundation',
        position: '150px',
        color: '#9747FF',
        message:
            'SHN helps me to explore & experience new APIs & connect more with the emerging industrial concepts.',
    },
    {
        profileUrl: 'https://github.com/fathimaniswa.png',
        name: 'Fathima Niswa',
        org: 'TinkerHub Foundation',
        position: '-125px',
        color: '#FFA300',
        message:
            'This is a beginner friendly hackathon as a team project. So it lend me a hand to learn & understand new things in a comfortable environment.',
    },
];

const Why = () => (
    <VStack>
        <Heading
            fontWeight="700"
            color="#000000"
            textAlign="center"
            marginBlockStart="40px"
            letterSpacing="4px"
            fontSize={{
                base: '2rem',
                md: '3.5rem',
            }}
            textShadow="2px 2px #fff, 2px -2px #fff, -2px 2px #fff, -2px -2px #fff
                    ,3px 3px #951BF4, 3px -3px #951BF4, -3px 3px #951BF4, -3px -3px #951BF4"
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
