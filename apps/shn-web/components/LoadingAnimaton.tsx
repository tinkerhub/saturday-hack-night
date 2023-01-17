import { Heading, VStack } from '@chakra-ui/react';

const LoadingAnimaton = () => (
    <VStack
        w="100%"
        h="100vh"
        justifyContent="center"
        alignItems="center"
        backgroundColor="#0C0F17"
    >
        <Heading
            fontSize={{ base: '48px', lg: '100px' }}
            fontWeight="bold"
            fontFamily="Clash Display"
            textAlign="center"
            textColor="white"
            animation="blink 0.5s ease-in-out infinite alternate"
            __css={{
                '@keyframes blink': {
                    from: {
                        textShadow: '0 0 8px white',
                    },
                    to: {
                        textShadow: '0 0 10px #DBF72C',
                    },
                },
            }}
        >
            SATURDAY
            <br />
            <span style={{ color: '#DBF72C' }}>HACKNIGHT</span>
        </Heading>
    </VStack>
);

export { LoadingAnimaton };
