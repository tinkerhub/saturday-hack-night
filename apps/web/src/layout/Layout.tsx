import React from 'react';
import { Container, VStack } from '@chakra-ui/react';

const Layout = ({ children }: { children: React.ReactNode }) => (
    <VStack background="#EADADA">
        <Container
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            maxWidth={{ base: 'full', lg: 'container.xl' }}
        >
            {children}
        </Container>
    </VStack>
);

export default Layout;
