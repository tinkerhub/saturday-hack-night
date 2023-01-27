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
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ResultItems } from '@app/components';
import { useRouter } from 'next/router';
import api from '@app/api';

export interface Projects {
    name: string;
    repo: string;
    projectStatus: string;
    members: {
        name: string;
        githubid: string;
        avatar: string;
    }[];
}
const ProjectStatus = ['BEST PROJECT', 'COMPLETE'];

export const ResultsModal = ({ id, onClose, isOpen, image }: ResultsModalProps) => {
    const router = useRouter();
    const [projects, setProjects] = useState<Array<Projects> | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get(`/event/projects/${id}`);
                if (data.success) {
                    setProjects(data.data);
                }
            } catch (error) {
                setProjects(null);
            } finally {
                setLoading(false);
            }
        })();
        return () => {
            setLoading(false);
            setProjects(null);
        };
    }, [id]);
    return (
        <Drawer
            size="full"
            onClose={() => {
                router.replace('/events', undefined, { shallow: true });
                onClose();
            }}
            isOpen={isOpen}
        >
            <DrawerContent
                borderRadius="10px"
                backgroundColor="#0C0F17"
                minWidth={{
                    base: 'full',
                }}
            >
                <Box display="flex" justifyContent="center" backgroundColor="rgba(255,255,255,.15)">
                    <Image
                        src={image}
                        alt=""
                        height={{
                            base: 'full',
                            md: '125px',
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
                    {loading ? (
                        <Center height="50vh">
                            <CircularProgress isIndeterminate color="#A6BA30" size="80px" />
                        </Center>
                    ) : (
                        ProjectStatus.map((status) => {
                            const filteredResults = projects!.filter(
                                (result) => result.projectStatus === status,
                            ) as Array<Projects>;
                            if (filteredResults.length > 0) {
                                const statusText =
                                    status === 'BEST PROJECT'
                                        ? 'Best Group Projects⭐'
                                        : 'Completed Projects⭐';
                                return (
                                    <VStack alignItems="flex-start">
                                        <Heading
                                            fontFamily="Clash Display"
                                            textColor="rgba(255, 255, 255, 1)"
                                            fontSize={{
                                                base: '25px',
                                                md: '50px',
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
