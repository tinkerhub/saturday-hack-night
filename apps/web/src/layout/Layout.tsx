import React from 'react';
import { Container, VStack } from '@chakra-ui/react';

const Layout = ({ children }: { children: React.ReactNode }) => (
    <VStack background="#0C0F17">
        <Container
            display="flex"
            flexDirection="column"
            alignItems="center"
            minHeight="100vh"
            maxWidth="full"
        >
            {children}
        </Container>
    </VStack>
);

export default Layout;
