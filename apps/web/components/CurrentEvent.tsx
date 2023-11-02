import React, { useEffect, useState } from "react";
import { CalendarIcon } from "@chakra-ui/icons";
import { Event } from "@app/types";
import {
  Flex,
  HStack,
  VStack,
  Image,
  Text,
  Box,
  Heading,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CreateTeamModal, UpdateTeamModal } from "@app/components/modal";
import { Toast } from "@app/components/utils";
import { useAuth } from "@app/hooks";
import {
  useCollection,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { collection, doc } from "firebase/firestore";
import { db } from "@app/api";

const CurrentEvent = ({ event }: CurrentEventProps) => {
  const toast = useToast();
  const { id, name, about, time, imageWhite, moreInfo, status, location } =
    event;
  const [isEditable, setIsEditable] = useState(false);
  const { isProfileComplete, user, login } = useAuth();

  const [teams] = useCollection(collection(db, "events", id, "teams"));

  const [registeredTeam] = useDocument(
    doc(db, "users", user ? user.uid : "xxxxxxxxxxxxxxxxxxxxxxxx", "teams", id),
  );

  useEffect(() => {
    (async () => {
      if (user && registeredTeam) {
        if (registeredTeam.data()) {
          setIsEditable(status === "REGISTRATION");
        }
      }
    })();
    return () => {
      setIsEditable(false);
    };
  }, [user, status, registeredTeam]);

  const {
    isOpen: isOpenUpdateModal,
    onOpen: onOpenUpdateModal,
    onClose: onCloseUpdateModal,
  } = useDisclosure();
  const {
    isOpen: isOpenCreateModal,
    onOpen: onOpenCreateModal,
    onClose: onCloseCreateModal,
  } = useDisclosure();
  return (
    <Flex
      width={{
        base: "100%",
        xl: "container.xl",
      }}
      flexDirection={{
        base: "column",
        lg: "row",
      }}
      paddingInline={{ base: "16px", md: "32px" }}
      rowGap="16px"
      paddingBlockStart="18px"
      justifyContent="space-between"
    >
      {registeredTeam && isOpenUpdateModal && (
        <UpdateTeamModal
          teamId={registeredTeam.id}
          isOpen={isOpenUpdateModal}
          onClose={onCloseUpdateModal}
          image={imageWhite}
          eventId={id}
          isEditable={isEditable}
        />
      )}
      {user && isOpenCreateModal && (
        <CreateTeamModal
          isOpen={isOpenCreateModal}
          onClose={onCloseCreateModal}
          eventId={id}
        />
      )}
      <VStack
        minWidth={{ base: "100%", lg: "50%" }}
        maxWidth={{ base: "100%", lg: "50%" }}
        borderRadius="10px"
        background="rgba(255, 255, 255, 0.15);"
        style={{
          backdropFilter: "blur(10px)",
        }}
      >
        <HStack
          fontFamily="Clash Display"
          width="100%"
          justifyContent="space-between"
          paddingInline="16px"
          paddingBlockStart="16px"
        >
          <HStack textColor="white">
            <CalendarIcon height="15px" width="15px" />
            <Text fontSize="12px">{time.toDate().toDateString()}</Text>
          </HStack>
          <HStack
            padding="10px"
            borderRadius="10px"
            alignItems="center"
            backgroundColor="rgba(255,255,255,.15)"
          >
            <Image
              width="15px"
              height="15px"
              src="images/circle.svg"
              alt="Circle"
            />
            <Text fontSize="12px" textColor="#DBF72C">
              {teams?.size || 0} Teams Registered
            </Text>
          </HStack>
        </HStack>
        <Image
          alt="Event Image"
          marginInline="16px"
          width="100%"
          src={imageWhite}
          objectFit="contain"
          flexGrow="1"
          paddingInline="8px"
        />
        <Box
          width="100%"
          backgroundColor={registeredTeam ? "#DBF72C" : "#E24C4B"}
          borderBottomStartRadius="10px"
          padding="5px"
          borderBottomEndRadius="10px"
        >
          <Text
            fontSize="18px"
            fontWeight="medium"
            textColor="#0C0F17"
            textAlign="center"
            fontFamily="Clash Display"
          >
            {registeredTeam
              ? "Registered 🎉"
              : status === "REGISTRATION"
              ? "Register Now"
              : "Registration Closed"}
          </Text>
        </Box>
      </VStack>
      <VStack
        width="100%"
        alignItems="flex-start"
        paddingInlineStart={{ base: "0px", md: "16px" }}
      >
        <Heading
          textAlign="left"
          textColor="white"
          fontFamily="Clash Display"
          fontSize="40px"
        >
          {name}
        </Heading>
        <Heading
          textAlign="left"
          textColor="white"
          color="#DBF72C"
          fontFamily="Clash Display"
          fontWeight="semibold"
          fontSize="24px"
          style={{
            marginTop: "0px",
          }}
        >
          {location}
        </Heading>

        <Text
          fontSize="18px"
          fontFamily="Clash Display"
          textColor="white"
          flexGrow="1"
          style={{
            marginTop: "0px",
          }}
        >
          {about}
        </Text>
        <HStack columnGap="15px">
          <Button
            onClick={() => {
              if (user && registeredTeam) return onOpenUpdateModal();
              if (
                user &&
                !registeredTeam &&
                isProfileComplete &&
                status === "REGISTRATION"
              )
                return onOpenCreateModal();
              if (user && !isProfileComplete)
                return toast({
                  title: "✗ Please Complete Your Profile",
                  status: "error",
                  render: ({ title, status }) => (
                    <Toast title={title} status={status} />
                  ),
                });
              if (!user) {
                toast({
                  title: "✗ Please Login",
                  status: "error",
                  render: ({ title, status }) => (
                    <Toast title={title} status={status} />
                  ),
                });
                return login();
              }
              return null;
            }}
            fontFamily="Clash Display"
            size="lg"
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
          >
            {user
              ? registeredTeam
                ? isEditable
                  ? status === "REGISTRATION"
                    ? "Update Team"
                    : "View Team"
                  : "View Team"
                : isProfileComplete
                ? status === "REGISTRATION"
                  ? "Register Team"
                  : "Closed"
                : "Register Team"
              : "Register Team"}
          </Button>
          <Button
            fontFamily="Clash Display"
            size="lg"
            backgroundColor="rgba(255, 255, 255, 0.15)"
            textColor="white"
            _hover={{
              textColor: "#0C0F17",
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
              window.open(moreInfo, "_blank");
            }}
          >
            More Info
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
};

export interface CurrentEventProps {
  event: Event & { _count?: { teams: number } };
}

export { CurrentEvent };
