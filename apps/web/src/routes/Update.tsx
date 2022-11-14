import { Button, Heading, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Workbox } from 'workbox-window';

const Update = ({ wb }: { wb: Workbox }) => {
    const [isloading, setIsLoading] = useState(false);
    const updateApp = () => {
        setIsLoading(true);
        window.location.reload();
        wb.messageSkipWaiting();
        window.location.href = '/';
    };
    return (
        <VStack
            justifyContent="center"
            alignItems="center"
            height="100vh"
            width="100vw"
            backgroundColor="#0C0F17"
        >
            <Heading textAlign="center" fontFamily="Clash Display" fontSize="50px" color="white">
                Guess what? We found a new update!
            </Heading>
            <Button
                width="250px"
                backgroundColor="white"
                fontSize="18px"
                fontWeight="medium"
                height="45px"
                isLoading={isloading}
                loadingText="Updating..."
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
                onClick={() => updateApp()}
            >
                Click here to update
            </Button>
        </VStack>
    );
};

export default Update;
