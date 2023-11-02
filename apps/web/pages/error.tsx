import { Button, Heading, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BaseLayout } from "@app/layouts";
import { NextPageWithLayout } from "@app/pages/_app";

const Error: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <VStack
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      backgroundImage={`
        linear-gradient(180deg, rgba(12, 15, 23, 0) 67.85%, #0C0F17 100%),
        linear-gradient(180deg, #0C0F17 0%, rgba(12, 15, 23, 0.8) 100%),
        url('/images/codeBg.png') `}
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
          base: "130px",
          lg: "240px",
        }}
        fontWeight="700"
      >
        Error
      </Heading>
      <Button
        width="250px"
        backgroundColor="white"
        fontSize="18px"
        fontWeight="medium"
        height="45px"
        transition=".5s all ease"
        _hover={{
          boxShadow: "0px 8px 16px rgba(255, 255, 255, 0.15)",
          backgroundColor: "#DBF72C",
        }}
        _active={{
          textColor: "#DBF72C",
          background: "rgba(219, 247, 44, 0.15)",
          boxShadow: "0px 8px 16px rgba(219, 247, 44, 0.15)",
          backdropFilter: "blur(25px)",
        }}
        onClick={() => {
          router.push("/");
        }}
      >
        GO BACK HOME
      </Button>
    </VStack>
  );
};
Error.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
export default Error;
