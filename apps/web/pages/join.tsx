/* eslint-disable no-nested-ternary */
import { Button, Heading, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BaseLayout } from "@app/layouts";
import { NextPageWithLayout } from "@app/pages/_app";
import { useState } from "react";
import api from "@app/api";
import { useAuth } from "@app/hooks";

const Join: NextPageWithLayout = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { invite } = router.query;
  const [error, setError] = useState(0);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line consistent-return
  const joinTeam = async () => {
    setLoading(true);
    if (!user) {
      setError(1);
      return setLoading(false);
    }
    if (!invite) {
      setError(2);
      return setLoading(false);
    }
    try {
      const { data } = await api.post(`/team/join/${invite}`);
      if (data.success) {
        setError(10);
        router.push("/events");
      }
    } catch (err) {
      return setError(3);
    } finally {
      setLoading(false);
    }
  };
  return (
    <VStack
      justifyContent="center"
      alignItems="center"
      height="100vh"
      paddingInline={{
        base: "10px",
        md: "500px",
      }}
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
        {error === 0
          ? "Join Team"
          : error === 1
          ? "Please login to join team"
          : error === 2
          ? "Invalid invite"
          : error === 3
          ? "Invalid invite or you are already in a team"
          : "You have joined the team"}
      </Heading>
      <Button
        isLoading={loading}
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
          joinTeam();
        }}
      >
        Accept Invite
      </Button>
    </VStack>
  );
};
Join.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
export default Join;
