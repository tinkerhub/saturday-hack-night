import { Heading, HStack, VStack, Text, Avatar } from '@chakra-ui/react';
import React from 'react';
import { ParallaxView } from '../../components';

const Feedback = [
    {
        avatar: 'https://github.com/mellofordev.png',
        feedback: 'Every time I register for HackNight, I get to learn something new',
        color: '#527D77',
    },
    {
        avatar: 'https://github.com/AnanyaSreeram.png',
        feedback:
            'My self confidence and optimism increased as I was  able to build my own project',
        color: '#F985C4',
    },
    {
        avatar: 'https://github.com/sreehari2003.png',
        feedback:
            'SHN helped me develop my skills quickly and increase my knowledge as a programmer',
        color: '#FFA300',
    },
    {
        avatar: 'https://github.com/DarkPhoenix2704.png',
        feedback:
            'SHN is a fun filled event where we develop a project that may change the career path of us',
        color: '#C193FF',
    },
    {
        avatar: 'https://github.com/Gopps95.png',
        feedback: 'SHN has increased my confidence to start a project on my own',
        color: '#039BE5',
    },
];
const Hear = () => (
    <VStack justifyContent="center">
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
            HEAR FROM PEOPLE
        </Heading>
        <VStack rowGap="10px">
            {Feedback.map(({ avatar, feedback, color }) => (
                <ParallaxView color={color}>
                    <HStack marginBlock="5px">
                        <Avatar src={avatar} />
                        <Text textColor="#D9D9D9" fontSize="16px">
                            {feedback}
                        </Text>
                    </HStack>
                </ParallaxView>
            ))}
        </VStack>
    </VStack>
);
export default Hear;
