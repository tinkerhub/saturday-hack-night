import { Heading, HStack, VStack, Text, Avatar } from '@chakra-ui/react';
import React from 'react';
import { ParallaxView } from '../../components';

const Hear = () => {
    const Feedback = [
        {
            avatar: 'https://github.com/mellofordev.png',
            feedback: 'Every time I register for HackNight, I get to learn something new',
            baseVelocity: 5,
        },
        {
            avatar: 'https://github.com/AnanyaSreeram.png',
            feedback:
                'My self confidence and optimism increased as I was  able to build my own project',
            baseVelocity: -2,
        },
        {
            avatar: 'https://github.com/sreehari2003.png',
            feedback:
                'SHN helped me develop my skills quickly and increase my knowledge as a programmer',
            baseVelocity: 3,
        },
        {
            avatar: 'https://github.com/DarkPhoenix2704.png',
            feedback:
                'SHN is a fun filled event where we develop a project that may change the career path of us',
            baseVelocity: -1,
        },
        {
            avatar: 'https://github.com/Gopps95.png',
            feedback: 'SHN has increased my confidence to start a project on my own',
            baseVelocity: 5,
        },
    ];
    return (
        <VStack height={{ md: '100vh' }} justifyContent="center">
            <Heading
                fontWeight="700"
                marginBlockStart="2rem"
                color="#2A1437"
                textAlign="center"
                marginBlockEnd="40px"
                fontSize={{ base: '45px', md: '74px' }}
                textShadow="1px 1px #fff, 1px -1px #fff, -1px 1px #fff, -1px -1px #fff"
            >
                HEAR FROM PEOPLE
            </Heading>
            <VStack rowGap="10px">
                {Feedback.map(({ avatar, feedback, baseVelocity }) => (
                    <ParallaxView baseVelocity={baseVelocity}>
                        <HStack marginBlock="5px">
                            <Avatar src={avatar} />
                            <Text fontSize="20px">{feedback}</Text>
                        </HStack>
                    </ParallaxView>
                ))}
            </VStack>
        </VStack>
    );
};
export default Hear;
