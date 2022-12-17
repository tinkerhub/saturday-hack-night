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
import { getDocs, query, collection, where, getDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import { Items } from './components';

const ProjectStatus = [
    { code: 101, status: 'Best Overall Project⭐' },
    { code: 102, status: 'Best Group Projects⭐' },
    { code: 100, status: 'Best Individual Projects⭐' },
    { code: 50, status: 'Completed Projects⭐' },
];

export const ResultsModal = ({ id, onClose, isOpen, image }: ResultsModalProps) => {
    const [results, setResults] = useState<Array<Results>>([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const { db } = useFirebase();
    useEffect(() => {
        (async () => {
            const resultsSnapshot = await getDocs(
                query(collection(db, `events/${id}/teams`), where('projectStatus', '>', -1)),
            );
            resultsSnapshot.docs.forEach(async (resultsSnap) => {
                let memberList = resultsSnap.get('members').concat([resultsSnap.get('lead')]);
                memberList = [...new Set(memberList)];
                const members = memberList.map(async (member: string) => {
                    const memberSnapshot = await getDoc(doc(db, `users/${member}`));
                    return memberSnapshot.data();
                });
                const membersData = await Promise.all(members);
                setResults((value) => [
                    ...value,
                    {
                        name: resultsSnap.get('name'),
                        repo: resultsSnap.get('repo'),
                        projectStatus: resultsSnap.get('projectStatus'),
                        members: membersData,
                    },
                ]);
            });
            setLoading(false);
        })();
        return () => {
            setLoading(false);
        };
    }, [db, id]);
    return (
        <Drawer
            size="full"
            onClose={() => {
                searchParams.delete('name');
                setSearchParams(searchParams);
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
                            const filteredResults = results.filter(
                                (result) => result.projectStatus === status.code,
                            );
                            if (filteredResults.length > 0) {
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
                                            {status.status}
                                        </Heading>

                                        <Items filteredResults={filteredResults} />
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
interface Results {
    name: string;
    repo: string;
    projectStatus: number;
    members: Array<any>;
}
