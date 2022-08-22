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
        <VStack height={{ lg: '100vh' }}>
            <Heading
                width={{ base: '95%', md: '70%' }}
                textAlign="center"
                fontSize={{ base: '3.5rem', md: '6rem' }}
                color="#FF5B5B"
                paddingBlockStart={{ base: '8rem', md: '9rem' }}
                textShadow="1px 2px #fff"
            >
                SATURDAY HACKNIGHT
            </Heading>
            <Text
                textAlign="center"
                paddingBlockStart="5"
                width={{ base: '95%', md: '75%' }}
                fontSize={{ base: '1.2rem', md: '1.5rem' }}
            >
                It’s a bi weekly hackathon that gives tech-savvy learners an oppurtunity to explore
                all the latest technology related concepts including APIs , frameworks and build
                some cool projects.
            </Text>
            <Button label="Register Now" marginBlockStart="1rem" onClick={register} />
        </VStack>
    );
};

export default Home;
