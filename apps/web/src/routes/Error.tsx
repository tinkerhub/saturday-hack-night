import React from 'react';
import { Button, Heading, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import bg from '../../assets/images/codeBg.png';

const Error = () => {
    const navigate = useNavigate();
    return (
        <VStack
            justifyContent="center"
            alignItems="center"
            height="100vh"
            width="100vw"
            backgroundImage={`
        linear-gradient(180deg, rgba(12, 15, 23, 0) 67.85%, #0C0F17 100%),
        linear-gradient(180deg, #0C0F17 0%, rgba(12, 15, 23, 0.8) 100%),
        url(${bg}) `}
        >
            <Heading
                fontFamily="Clash Display"
                textAlign="center"
                textColor="white"
                fontWeight="500"
                fontSize="40px"
            >
                Something Went Wrong
            </Heading>
            <Heading
                fontFamily="Clash Display"
                textColor="#DBF72C"
                fontSize={{
                    base: '130px',
                    lg: '240px',
                }}
                fontWeight="700"
            >
                404
            </Heading>
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
                onClick={() => {
                    navigate('/');
                }}
            >
                GO BACK HOME
            </Button>
        </VStack>
    );
};
export default Error;
