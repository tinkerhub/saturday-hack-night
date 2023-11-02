import {
  Box,
  useToast,
  Grid,
  VStack,
  HStack,
  Avatar,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Toast } from "@app/components/utils";

const ResultItems = ({ filteredResults }: ItemsProps) => {
  const toast = useToast();
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { currentTarget } = e;
    const rect = currentTarget!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    currentTarget.style.setProperty("--mouse-x", `${x}px`);
    currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };
  useEffect(() => {
    for (const card of document.querySelectorAll(".resultBox")) {
      const cardBody = card as HTMLDivElement;
      cardBody.onmousemove = (e: MouseEvent) =>
        handleMouseMove(e as unknown as React.MouseEvent<HTMLElement>);
    }
  }, [filteredResults]);
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
      }}
      gap={{
        base: "18px",
        lg: "48x",
      }}
      paddingBlockStart={{
        base: "18px",
        lg: "36px",
      }}
      paddingBlockEnd="36px"
      paddingInline={{
        base: "16px",
        lg: "32px",
      }}
      justifyItems="center"
    >
      {filteredResults.map((result) => (
        <VStack
          key={result.repo}
          className="resultBox"
          position="relative"
          width="280px"
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
            transition: "opacity 500ms",
            pointerEvents: "none",
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
            backgroundColor="white"
            padding="30px"
            width="100%"
            borderTopRadius="10px"
          >
            <Text textAlign="center" fontSize="18px">
              <b>{result.name}</b>
            </Text>
          </Box>
          <VStack
            width="100%"
            paddingInline="16px"
            alignItems="flex-start"
            flexGrow="1"
            rowGap="5px"
            justifyContent="space-around"
          >
            {result.members.map((member) => (
              <Link
                href={`https://www.github.com/${member.githubID}`}
                isExternal
              >
                <HStack key={member.name}>
                  <Avatar
                    height="30px"
                    width="30px"
                    src={member.avatar}
                    name={member.name ?? member.githubID}
                  />
                  <Text
                    fontSize="14px"
                    fontFamily="Clash Display"
                    textColor="white"
                  >
                    {member.name ?? member.githubID}
                  </Text>
                </HStack>
              </Link>
            ))}
            <HStack
              width="100%"
              borderEndRadius="10px"
              justifyContent="flex-end"
              paddingBlock="8px"
            >
              <Button
                width="130px"
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
                  window.open(result.repo, "_blank");
                }}
              >
                View Project
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
                onClick={() => {
                  navigator.clipboard.writeText(result.repo).then(() => {
                    toast({
                      title: "✅Copied to clipboard!",
                      status: "success",
                      position: "bottom",
                      render: ({ title, status }) => (
                        <Toast title={title} status={status} />
                      ),
                    });
                  });
                }}
              >
                Copy Link
              </Button>
            </HStack>
          </VStack>
        </VStack>
      ))}
    </Grid>
  );
};

export { ResultItems };

interface ItemsProps {
  filteredResults: Projects[];
}

export interface Projects {
  name: string;
  repo: string;
  projectStatus: number;
  members: {
    name: string;
    githubID: string;
    avatar: string;
  }[];
}
