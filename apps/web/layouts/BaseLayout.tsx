import { Container, VStack } from "@chakra-ui/react";
import type { Child } from "@app/types";
import { useAuth } from "@app/hooks";
import { LoadingAnimation } from "@app/components/utils";
import { Footer, Navbar } from "./components";

export const BaseLayout = ({ children }: Child) => {
  const { isUserLoading } = useAuth();
  if (isUserLoading) return <LoadingAnimation />;

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
