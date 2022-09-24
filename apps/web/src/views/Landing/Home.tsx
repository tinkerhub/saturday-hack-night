import { VStack, Heading, Text } from '@chakra-ui/react';
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { useFirebase } from '../../context/firebase';

const Home = () => {
    const { auth } = useFirebase();
    const navigate = useNavigate();

    const register = () => {
        if (auth.currentUser) {
            navigate('/dashboard');
        } else {
            signInWithPopup(auth, new GithubAuthProvider()).then((user) => {
                if (user) {
                    navigate('/dashboard');
                }
            });
        }
    };
    return (
        <VStack rowGap="20px" width={{ base: 'full', lg: 'container.md' }}>
            <Heading
                textAlign="center"
                letterSpacing="5px"
                fontFamily="Bungee"
                marginTop="20px"
                fontSize={{ base: '3rem', md: '6rem' }}
                color="#FF781E"
                textShadow="2px 2px #fff, 2px -2px #fff, -2px 2px #fff, -2px -2px #fff, -6px 3px #000"
            >
                SATURDAY HACKNIGHT
            </Heading>
            <Text
                textAlign="center"
                textColor="#951BF4"
                fontSize={{ base: '1.2rem', md: '1.5rem' }}
            >
                It’s a bi weekly hackathon that gives tech-savvy learners an oppurtunity to explore
                all the latest technology related concepts including APIs, frameworks and build some
                cool projects.
            </Text>
            <Button label="Register Now" marginBlockStart="1rem" onClick={register} />
        </VStack>
    );
};

export default Home;
