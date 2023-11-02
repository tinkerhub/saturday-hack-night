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
const ProjectStatus = [
  { code: 101, status: "Best Overall Project⭐" },
  { code: 102, status: "Best Group Projects⭐" },
  { code: 100, status: "Best Individual Projects⭐" },
  { code: 50, status: "Completed Projects⭐" },
];
export const ResultsModal = ({
  id,
  onClose,
  isOpen,
  image,
}: ResultsModalProps) => {
  const router = useRouter();

  const [projectWithUser, setProjectWithUser] = useState<Projects[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [projects] = useCollectionDataOnce(
    query(
      collection(db, `events/${id}/teams`),
      where("projectStatus", ">=", 50),
    ),
  );

  useEffect(() => {
    if (projects) {
      try {
        const getProjectsWithUser = async () => {
          const newProjects = await Promise.all(
            projects.map(async (project) => {
              const newMembers = await Promise.all(
                project.members.map(async (memberUid: string) => {
                  const member = await getDoc(doc(db, "users", memberUid)).then(
                    (doc) => doc.data(),
                  );
                  return {
                    name: member?.name,
                    githubID: member?.githubID,
                    avatar: member?.avatar,
                  };
                }),
              );
              return {
                name: project.name,
                repo: project.repo,
                projectStatus: project.projectStatus,
                members: newMembers,
              };
            }),
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
  }, [projects]);

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
            ProjectStatus.map((status) => {
              const filteredResults = (projectWithUser ?? []).filter(
                (result) => result.projectStatus === status.code,
              ) as Array<Projects>;
              if (filteredResults.length > 0) {
                const statusText =
                  status.code > 50 ? "Best Projects⭐" : "Completed Projects⭐";
                return (
                  <VStack key={status.code} alignItems="flex-start">
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

                    <ResultItems filteredResults={filteredResults} />
                  </VStack>
                );
              }
              return null;
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
