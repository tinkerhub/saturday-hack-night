import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { ParallaxView } from '../../components';

const Hear = () => (
    <VStack alignItems="flex-start" marginBlock="32px">
        <Heading
            fontFamily="Clash Display"
            textColor="white"
            textAlign="left"
            width="100vw"
            paddingInline={{ base: '18px', lg: '36px' }}
            fontSize="40px"
        >
            HEAR FROM{' '}
            <span
                style={{
                    color: '#DBF72C',
                }}
            >
                PEOPLE 🔊
            </span>
        </Heading>
        <VStack>
            <ParallaxView
                text="A bi-weekly hackathon that gives tech-savvy learners an opportunity to explore all the latest technology related concepts including APIs, frameworks and build some cool projects."
                duration={10}
            />
            <ParallaxView
                text="You. Are you passionate about tech? Do you like to build something unique? Are you that curious cat who loves to explore uncharted territory? Then this is your opportunity."
                duration={15}
            />
            <ParallaxView
                text="Saturday evening 6 PM to 11 PM every odd saturday you will be able to take part in the program. Yes it is a recurring event and yes, you are welcome every time."
                duration={20}
            />
        </VStack>
    </VStack>
);
export default Hear;
