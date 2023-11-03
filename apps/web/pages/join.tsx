import {
  Button,
  CircularProgress,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BaseLayout } from "@app/layouts";
import { NextPageWithLayout } from "@app/pages/_app";
import { useState } from "react";
import { useAuth } from "@app/hooks";
import { httpsCallable } from "firebase/functions";
import { functions } from "@app/api";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";

const Join: NextPageWithLayout = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { eventID, teamID } = router.query;
  const [status, setStatus] = useState({ state: -5, message: "" });
  const [loading, setLoading] = useState(false);

  const joinTeam = async () => {
    setLoading(true);
    if (!user) {
      setStatus({
        state: 1,
        message: "Please login to join team",
      });
      return setLoading(false);
    }
    try {
      if (!eventID || !teamID)
        setStatus({ state: -1, message: "TeamID and EventID are required" });
      else if (status.state === 0 && user !== undefined) {
        if (user)
          httpsCallable(
            functions,
            "joinTeam",
          )({ teamID, eventID })
            .then(() => setStatus({ state: 1, message: "Success" }))
            .catch((error) => setStatus({ state: -1, message: error.message }));
      }
    } catch (err) {
      return setStatus({
        state: 2,
        message: "Invalid invite",
      });
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
        {status.state === -5 && (
          <Text
            textAlign="center"
            fontFamily="Clash Display"
            fontSize="40px"
            color="white"
          >
            Join Team
          </Text>
        )}
        {status.state === 0 && (
          <Text
            textAlign="center"
            fontFamily="Clash Display"
            fontSize="40px"
            color="white"
          >
            <CircularProgress isIndeterminate /> <br />
            Joining Team...
          </Text>
        )}
        {status.state === 1 && (
          <Text
            textAlign="center"
            fontFamily="Clash Display"
            fontSize="40px"
            color="white"
          >
            Team Joined <br />
            <CheckCircleIcon />
          </Text>
        )}
        {status.state === -1 && (
          <Text
            textAlign="center"
            fontFamily="Clash Display"
            fontSize="40px"
            color="white"
          >
            {status.message} <br />
            <CloseIcon color="red" />
          </Text>
        )}
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
