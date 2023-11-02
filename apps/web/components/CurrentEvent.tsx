/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import { CalendarIcon } from "@chakra-ui/icons";
import { Event, Team } from "@app/types";
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
import moment from "moment";
import { CreateTeamModal, UpdateTeamModal } from "@app/components/modal";
import { Toast } from "@app/components/utils";
import { useAuth } from "@app/hooks";

const CurrentEvent = ({ event }: CurrentEventProps) => {
  const toast = useToast();
  const {
    id,
    title,
    description,
    date,
    image,
    details,
    status,
    location,
    _count,
  } = event;
  const [team, setTeam] = useState<Team | null>(null);
  const [isEditable, setIsEditable] = useState(false);
  const { isProfileComplete, user, login } = useAuth();

  useEffect(() => {
    (async () => {
      if (user) {
        // TODO : Add API call to get team details
        /* const { data } = await api.get(`/team/${id}`);
                if (data.data) setTeam(data.data.team);
                if (
                    data.data &&
                    data.data.team.members[0].role === 'LEADER' &&
                    data.data.team.members[0].user.githubid === (await user.githubid)
                ) {
                    setIsEditable(status === 'REGISTRATION');
                } */
      }
    })();
    return () => {
      setTeam(null);
      setIsEditable(false);
    };
  }, [isProfileComplete, user, id, status]);

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
      {team && isOpenUpdateModal && (
        <UpdateTeamModal
          teamId={team.id}
          isOpen={isOpenUpdateModal}
          onClose={onCloseUpdateModal}
          image={image}
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
            <Text fontSize="12px">{moment(date).format("ll")}</Text>
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
              {_count!.teams || 0} Teams Registered
            </Text>
          </HStack>
        </HStack>
        <Image
          alt="Event Image"
          marginInline="16px"
          width="100%"
          src={image}
          objectFit="contain"
          flexGrow="1"
          paddingInline="8px"
        />
        <Box
          width="100%"
          backgroundColor={team ? "#DBF72C" : "#E24C4B"}
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
            {team
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
          {title}
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
          {description}
        </Text>
        <HStack columnGap="15px">
          <Button
            onClick={() => {
              if (user && team) return onOpenUpdateModal();
              if (
                user &&
                !team &&
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
              ? team
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
              window.open(details, "_blank");
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
