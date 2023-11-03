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
import { useEffect, useState } from "react";
import { useAuth } from "@app/hooks";
import { httpsCallable } from "firebase/functions";
import { functions } from "@app/api";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";

const Join: NextPageWithLayout = () => {
  const router = useRouter();
  const { eventID, teamID } = router.query;
  const { user } = useAuth();
  const [status, setStatus] = useState({ state: 0, message: "" });

  useEffect(() => {
    if (!eventID || !teamID) return;
    // setStatus({ state: -1, message: "TeamID and EventID are required." });
    else if (status.state === 0 && user !== undefined) {
      if (user)
        httpsCallable(
          functions,
          "joinTeam"
        )({ teamID, eventID })
          .then(() => setStatus({ state: 1, message: "Done" }))
          .catch((error) => setStatus({ state: -1, message: error.message }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventID, teamID, user]);

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
          <CloseIcon />
        </Text>
      )}
    </VStack>
  );
};
Join.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
export default Join;
