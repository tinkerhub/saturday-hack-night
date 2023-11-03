import {
  Box,
  Center,
  Heading,
  CircularProgress,
  VStack,
  Drawer,
  DrawerContent,
  DrawerBody,
  Image,
  DrawerCloseButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ResultItems } from "@app/components";
import { useRouter } from "next/router";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "@app/api";
import { groupBy } from "@app/utils";

export interface Projects {
  name: string;
  repo: string;
  status: string;
  members: {
    name: string;
    githubID: string;
    avatar: string;
  }[];
}
export const ResultsModal = ({
  id,
  onClose,
  isOpen,
  image,
}: ResultsModalProps) => {
  const router = useRouter();

  const [projectWithUser, setProjectWithUser] = useState<Projects[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [completeProjects] = useCollectionDataOnce(
    query(
      collection(db, `events/${id}/teams`),
      where("status", "==", "COMPLETE")
    )
  );
  const [bestProjects] = useCollectionDataOnce(
    query(
      collection(db, `events/${id}/teams`),
      where("status", "==", "BEST PROJECT")
    )
  );
  useEffect(() => {
    const projects = [...(completeProjects ?? []), ...(bestProjects ?? [])];
    if (projects) {
      try {
        setIsLoading(true);
        const getProjectsWithUser = async () => {
          const newProjects = await Promise.all(
            projects.map(async (project) => {
              const newMembers = await Promise.all(
                project.members.map(async (memberUid: string) => {
                  const member = await getDoc(doc(db, "users", memberUid)).then(
                    (doc) => doc.data()
                  );
                  return {
                    name: member?.name,
                    githubID: member?.githubID,
                    avatar: member?.avatar,
                  };
                })
              );
              return {
                name: project.name,
                repo: project.repo,
                status: project.status,
                members: newMembers,
              };
            })
          );
          setProjectWithUser(newProjects);
        };
        getProjectsWithUser();
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
  }, [completeProjects, bestProjects]);

  return (
    <Drawer
      size="full"
      onClose={() => {
        router.replace("/events", undefined, { shallow: true });
        onClose();
      }}
      isOpen={isOpen}
    >
      <DrawerContent
        borderRadius="10px"
        backgroundColor="#0C0F17"
        minWidth={{
          base: "full",
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          backgroundColor="rgba(255,255,255,.15)"
        >
          <Image
            src={image}
            alt=""
            height={{
              base: "full",
              md: "125px",
            }}
          />
        </Box>
        <DrawerCloseButton
          padding="15px"
          color="rgba(226, 76, 75, 1)"
          border="2px solid rgba(226, 76, 75, 1)"
          borderRadius="full"
        />
        <DrawerBody>
          {isLoading ? (
            <Center height="50vh">
              <CircularProgress isIndeterminate color="#A6BA30" size="80px" />
            </Center>
          ) : (
            groupBy(projectWithUser, "status")
              .sort()
              .map((group) => {
                const statusText =
                  group[0].status === "BEST PROJECT"
                    ? "Best Projects⭐"
                    : "Completed Projects⭐";
                return (
                  <VStack key={group[0].status} alignItems="flex-start">
                    <Heading
                      fontFamily="Clash Display"
                      textColor="rgba(255, 255, 255, 1)"
                      fontSize={{
                        base: "25px",
                        md: "50px",
                      }}
                    >
                      {statusText}
                    </Heading>

                    <ResultItems filteredResults={group} />
                  </VStack>
                );
              })
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

interface ResultsModalProps {
  id: string;
  onClose: () => void;
  isOpen: boolean;
  image: string;
}
