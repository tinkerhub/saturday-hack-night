import { Heading, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import Button from '../components/Button';
import Navbar from '../views/Navbar';

const Home = () => (
    <VStack width="vw" background="#2A1437" color="white">
        <Navbar />
        <VStack height={{ sm: '100vh' }}>
            <Heading
                width={{ base: '95%', md: '75%' }}
                textAlign="center"
                fontSize={{ base: '3.5rem', md: '6rem' }}
                color="#FF5B5B"
                paddingBlockStart={{ base: '6rem', md: '6rem' }}
                textShadow="1px 2px #fff"
            >
                SATURDAY HACKNIGHT
            </Heading>
            <Text
                textAlign="center"
                paddingBlockStart="5"
                width={{
                    base: '95%',
                    md: '75%',
                }}
                fontSize={{ base: '1.2rem', md: '1.5rem' }}
            >
                It’s a bi weekly hackathon that gives tech-savvy learners an oppurtunity to explore
                all the latest technology related concepts including APIs , frameworks and build
                some cool projects.
            </Text>
            <Button label="Register Now" marginBlockStart="1rem" />
        </VStack>
    </VStack>
);

export default Home;
