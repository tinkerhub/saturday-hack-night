import React from "react";
import {
  VStack,
  Image,
  Box,
  Text,
  HStack,
  Button,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { Event } from "@app/types";
import { useRouter } from "next/router";
import { Toast } from "@app/components/utils";
import { ResultsModal } from "@app/components/modal";

const EventCard = ({ event }: EventCardProps) => {
  const { id, about, name, image, status, imageWhite, moreInfo, projectCount } =
    event;
  const { push, query } = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {isOpen ? (
        <ResultsModal
          id={event.id}
          onClose={onClose}
          isOpen={isOpen}
          image={imageWhite}
        />
      ) : (
        <> </>
      )}
      <VStack
        className="cardBox"
        maxWidth="300px"
        position="relative"
        backgroundColor="rgba(255,255,255,.15)"
        alignItems="flex-start"
        borderRadius="10px"
        _before={{
          zIndex: "0",
          content: '""',
          position: "absolute",
          borderRadius: "inherit",
          top: "0",
          left: "0",
          opacity: "0",
          pointerEvents: "none",
          transition: "opacity 500ms",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15) , transparent 50%)",
        }}
        _hover={{
          _before: {
            opacity: "1",
          },
        }}
      >
        <Box
          position="relative"
          backgroundColor="white"
          padding="30px"
          width="100%"
          borderTopRadius="10px"
        >
          <Text
            display="none"
            position="absolute"
            cursor="pointer"
            paddingInline="8px"
            right="10px"
            top="10px"
            fontFamily="Clash Display"
            paddingBlock="4px"
            borderRadius="10px"
            textColor="white"
            backgroundColor="rgba(0,0,0,.5)"
            _hover={{
              textColor: "black",
              boxShadow: "0px 8px 16px rgba(255, 255, 255, 0.15)",
              backgroundColor: "#DBF72C",
            }}
            css={{
              ".cardBox: hover &": {
                display: status === "RESULT" ? "block" : "none",
              },
            }}
            onClick={() =>
              navigator.clipboard
                .writeText(`${window.location.href}?eventID=${event.id}`)
                .then(() => {
                  toast({
                    title: "✅Copied to clipboard!",
                    status: "success",
                    position: "bottom",
                    render: ({ title, status }) => (
                      <Toast title={title} status={status} />
                    ),
                  });
                })
            }
          >
            Copy Link
          </Text>
          <Image
            alt={name}
            zIndex="1"
            height="120px"
            src={image}
            objectFit="cover"
          />
        </Box>
        <VStack
          paddingInline="16px"
          alignItems="flex-start"
          flexGrow="1"
          rowGap="5px"
          justifyContent="space-around"
        >
          <Box backgroundColor="rgba(219,247,44,.15)" borderRadius="15px">
            <Text
              paddingBlock="5px"
              paddingInline="10px"
              fontSize="12px"
              textColor="#DBF72C"
              fontFamily="Clash Display"
              fontWeight="medium"
            >
              ✅ {projectCount || 0} Projects
            </Text>
          </Box>
          <Text
            fontSize="12px"
            textColor="white"
            flexGrow="1"
            fontFamily="Clash Display"
            fontWeight="medium"
            noOfLines={3}
          >
            {about}
          </Text>
          <HStack
            width="100%"
            borderEndRadius="10px"
            justifyContent="space-between"
            paddingBlock="8px"
          >
            <Button
              width="130px"
              disabled={status !== "RESULT"}
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
                push({ query: { ...query, eventID: id } }, undefined, {
                  shallow: true,
                });
                onOpen();
              }}
            >
              View Projects
            </Button>
            <Button
              width="130px"
              background="rgba(255, 255, 255, 0.15)"
              textColor="white"
              _hover={{
                textColor: "black",
                boxShadow: "0px 8px 16px rgba(255, 255, 255, 0.15)",
                backgroundColor: "#DBF72C",
              }}
              _active={{
                textColor: "#DBF72C",
                background: "rgba(219, 247, 44, 0.15)",
                boxShadow: "0px 8px 16px rgba(219, 247, 44, 0.15)",
                backdropFilter: "blur(25px)",
              }}
              onClick={() => window.open(moreInfo, "_blank")}
            >
              More Info
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </>
  );
};
interface EventCardProps {
  event: Event;
}

export { EventCard };
