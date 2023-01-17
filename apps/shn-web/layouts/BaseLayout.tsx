import { Container, VStack } from '@chakra-ui/react';
import type { Child } from '@app/types';
import { Footer, Navbar } from '@app/components';

export const BaseLayout = ({ children }: Child) => (
    <>
        <Navbar />
        <VStack background="#0C0F17">
            <Container display="flex" flexDirection="column" alignItems="center" minHeight="100vh">
                {children}
            </Container>
        </VStack>
        <Footer />
    </>
);
