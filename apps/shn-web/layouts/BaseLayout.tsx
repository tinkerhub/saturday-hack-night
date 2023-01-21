import { Container, VStack } from '@chakra-ui/react';
import type { Child } from '@app/types';
import { Footer, Navbar } from '@app/components';
import { useAuthCtx } from '@app/hooks';
import { LoadingAnimaton } from '@app/components/LoadingAnimaton';

export const BaseLayout = ({ children }: Child) => {
    const { isUserLoading } = useAuthCtx();
    if (isUserLoading) {
        return <LoadingAnimaton />;
    }

    return (
        <>
            <Navbar />
            <VStack background="#0C0F17">
                <Container
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    minHeight="100vh"
                >
                    {children}
                </Container>
            </VStack>
            <Footer />
        </>
    );
};
