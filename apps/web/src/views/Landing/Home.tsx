import { VStack, Heading, Text, Container, Button } from '@chakra-ui/react';
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../context/firebase';
import bg from '../../../assets/images/codeBg.png';

const Home = () => {
    const { auth } = useFirebase();
    const navigate = useNavigate();

    const register = () => {
        if (auth.currentUser) {
            navigate('/events');
        } else {
            signInWithPopup(auth, new GithubAuthProvider()).then((user) => {
                if (user) {
                    navigate('/dashboard');
                }
            });
        }
    };
    return (
        <VStack
            marginTop="72px"
            rowGap="20px"
            width="100vw"
            fontFamily="Clash Display"
            backgroundImage={`
                linear-gradient(180deg, rgba(12, 15, 23, 0) 67.85%, #0C0F17 100%),
                linear-gradient(180deg, #0C0F17 0%, rgba(12, 15, 23, 0.8) 100%),
                url(${bg}) `}
        >
            <Heading
                fontSize={{ base: '48px', lg: '100px' }}
                fontWeight="bold"
                fontFamily="Clash Display"
                textAlign="center"
                textColor="white"
            >
                SATURDAY
                <br />
                <span style={{ color: '#DBF72C' }}>HACKNIGHT</span>
            </Heading>
            <Container maxW="720px">
                <Text
                    textAlign="center"
                    textColor="#E9E5E1"
                    fontSize={{
                        base: '18px',
                        lg: '24px',
                    }}
                >
                    It’s a bi weekly hackathon that gives tech-savvy learners an oppurtunity to
                    explore all the latest technology related concepts including APIs, frameworks
                    and build some cool projects.
                </Text>
            </Container>
            <Button
                width="250px"
                backgroundColor="white"
                fontSize="18px"
                fontWeight="medium"
                height="45px"
                transition=".5s all ease"
                _hover={{
                    boxShadow: '0px 8px 16px rgba(255, 255, 255, 0.15)',
                    backgroundColor: '#DBF72C',
                }}
                _active={{
                    textColor: '#DBF72C',
                    background: 'rgba(219, 247, 44, 0.15)',
                    boxShadow: '0px 8px 16px rgba(219, 247, 44, 0.15)',
                    backdropFilter: 'blur(25px)',
                }}
                onClick={register}
            >
                REGISTER NOW
            </Button>
        </VStack>
    );
};

export default Home;
