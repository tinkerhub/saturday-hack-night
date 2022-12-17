import {
    Box,
    Button,
    Center,
    Heading,
    Avatar,
    CircularProgress,
    VStack,
    Grid,
    HStack,
    Text,
    Drawer,
    DrawerContent,
    DrawerBody,
    Image,
    Link,
    DrawerCloseButton,
    useToast,
} from '@chakra-ui/react';
import { getDocs, query, collection, where, getDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Toast from '../components/Toast';
import { useFirebase } from '../context/firebase';

const ProjectStatus = [
    { code: 101, status: 'Best Overall Project⭐' },
    { code: 102, status: 'Best Group Projects⭐' },
    { code: 100, status: 'Best Individual Projects⭐' },
    { code: 50, status: 'Completed Projects⭐' },
];
const Items = ({ filteredResults }: ItemsProps) => {
    const toast = useToast();
    return (
        <Grid
            templateColumns={{
                base: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                xl: 'repeat(4, 1fr)',
            }}
            gap={{
                base: '18px',
                lg: '48x',
            }}
            paddingBlockStart={{
                base: '18px',
                lg: '36px',
            }}
            paddingBlockEnd="36px"
            paddingInline={{
                base: '16px',
                lg: '32px',
            }}
        >
            {filteredResults.map((result) => (
                <VStack
                    width="280px"
                    backgroundColor="rgba(255,255,255,.15)"
                    alignItems="flex-start"
                    borderRadius="10px"
                >
                    <Box backgroundColor="white" padding="30px" width="100%" borderTopRadius="10px">
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
                            <Link href={`https://www.github.com/${member.githubID}`} isExternal>
                                <HStack key={member.uid}>
                                    <Avatar
                                        height="30px"
                                        width="30px"
                                        src={member.avatar}
                                        name={member.githubID}
                                    />
                                    <Text
                                        fontSize="14px"
                                        fontFamily="Clash Display"
                                        textColor="white"
                                    >
                                        {member.githubID}
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
                                    boxShadow: '0px 8px 16px rgba(255, 255, 255, 0.15)',
                                    backgroundColor: '#DBF72C',
                                }}
                                _active={{
                                    textColor: '#DBF72C',
                                    background: 'rgba(219, 247, 44, 0.15)',
                                    boxShadow: '0px 8px 16px rgba(219, 247, 44, 0.15)',
                                    backdropFilter: 'blur(25px)',
                                }}
                                onClick={() => {
                                    window.open(result.repo, '_blank');
                                }}
                            >
                                View Project
                            </Button>
                            <Button
                                width="130px"
                                background="rgba(255, 255, 255, 0.15)"
                                textColor="white"
                                _hover={{
                                    textColor: 'black',
                                    boxShadow: '0px 8px 16px rgba(255, 255, 255, 0.15)',
                                    backgroundColor: '#DBF72C',
                                }}
                                _active={{
                                    textColor: '#DBF72C',
                                    background: 'rgba(219, 247, 44, 0.15)',
                                    boxShadow: '0px 8px 16px rgba(219, 247, 44, 0.15)',
                                    backdropFilter: 'blur(25px)',
                                }}
                                onClick={() => {
                                    navigator.clipboard.writeText(result.repo).then(() => {
                                        toast({
                                            title: '✅Copied to clipboard!',
                                            status: 'success',
                                            position: 'bottom',
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
export const ResultsModal = ({ id, onClose, isOpen, image }: ResultsModalProps) => {
    const [results, setResults] = useState<Array<Results>>([]);
    const [loading, setLoading] = useState(true);
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
        <Drawer size="full" onClose={onClose} isOpen={isOpen}>
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
interface ItemsProps {
    filteredResults: Array<Results>;
}
