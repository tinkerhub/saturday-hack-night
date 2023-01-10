import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    useToast,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import {
    getDoc,
    doc,
    DocumentData,
    DocumentSnapshot,
    updateDoc,
    query,
    collection,
    where,
    getDocs,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Member, Toast } from '../components';
import { useFirebase } from '../context/firebase';

interface ModalType {
    isOpen: boolean;
    image: string;
    onClose: () => void;
    eventId: string;
    teamID: string;
}

export const UpdateTeamModal = ({ isOpen, onClose, image, eventId, teamID }: ModalType) => {
    const initialRef = React.useRef(null);
    const toast = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [teamData, setTeamData] = useState<DocumentSnapshot<DocumentData>>();
    const [users, setUsers] = useState<Array<string>>([]);
    const finalRef = React.useRef(null);
    const { db, auth } = useFirebase();
    const updateTeam = async () => {
        const userMembers = users.filter((user) => user !== '');

        const memberList = userMembers.map(async (member: string) => {
            const userSnapshot = await getDocs(
                query(collection(db, 'users'), where('githubID', '==', member)),
            );
            return userSnapshot.docs[0].id;
        });
        let memberData = await Promise.all(memberList);
        memberData = memberData.filter((member) => member !== auth.currentUser.uid);
        if (memberData.length < 1) {
            toast({
                title: '✗ Team must have atleast one member',
                status: 'error',
                render: ({ title, status }) => <Toast title={title} status={status} />,
            });
            return;
        }
        updateDoc(doc(db, `events/${eventId}/teams/${teamID}`), {
            members: memberData,
        })
            .then(() => {
                toast({
                    title: '✅ Team Updated',
                    status: 'success',
                    render: ({ title, status }) => <Toast title={title} status={status} />,
                });
                onClose();
            })
            .catch((error) => {
                toast({
                    title: '✗ Team Update Error',
                    render: ({ title, status }) => <Toast title={title} status={status} />,
                });
                throw error;
            });
    };
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const teamSnapshot = await getDoc(doc(db, `events/${eventId}/teams/${teamID}`));
            setTeamData(teamSnapshot);
            const memberList = teamSnapshot.get('members');
            for (const member of memberList) {
                const memberSnapshot = (await getDoc(doc(db, `users/${member}`))).data();
                setUsers((prev) => [...prev, memberSnapshot?.githubID]);
            }
            setIsLoading(false);
        })();
        return () => {
            setTeamData(undefined);
            setUsers([]);
            setIsLoading(false);
        };
    }, [db, eventId, teamID]);

    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
            size={{ base: 'full', lg: 'xl' }}
        >
            <ModalOverlay />
            <ModalContent
                borderRadius="10px"
                backgroundColor="#0C0F17"
                minWidth={{
                    base: 'full',
                    lg: 'container.md',
                }}
            >
                <ModalHeader
                    borderTopRadius="10px"
                    style={{
                        padding: '0px',
                    }}
                >
                    <Box borderTopRadius="10px" backgroundColor="rgba(255,255,255,.15)">
                        <Image src={image} alt="" borderTopRadius="10px" width="100%" />
                    </Box>
                </ModalHeader>
                <ModalCloseButton
                    color="rgba(226, 76, 75, 1)"
                    border="2px solid rgba(226, 76, 75, 1)"
                    borderRadius="full"
                />
                <ModalBody marginTop="9px">
                    <Heading fontFamily="Clash Display" as="h2" color="white">
                        Team Details
                    </Heading>
                    <Flex
                        justifyContent="space-evenly"
                        columnGap="25px"
                        alignItems="flex-start"
                        fontSize="16px"
                        fontFamily="Clash Display"
                        flexDirection={{ base: 'column', lg: 'row' }}
                    >
                        <Box>
                            <Flex
                                flexDirection="column"
                                mt="20px"
                                fontSize="16px"
                                fontFamily="Clash Display"
                            >
                                <FormControl isInvalid>
                                    <FormLabel color="white">Team Name</FormLabel>
                                    <Input
                                        size="lg"
                                        defaultValue={teamData?.data()?.name}
                                        isReadOnly
                                        placeholder="Team Name"
                                        _placeholder={{
                                            textColor: 'rgba(255, 255, 255, 0.25)',
                                        }}
                                        backgroundColor="rgba(255, 255, 255, 0.25)"
                                        textColor="rgba(255, 255, 255, 0.15)"
                                        border="none"
                                        width="325px"
                                        borderRadius="10px"
                                    />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel color="white">Github repository</FormLabel>
                                    <Input
                                        defaultValue={teamData?.data()?.repo}
                                        isReadOnly
                                        placeholder="www.github.com/example/exampleRepo"
                                        size="lg"
                                        _placeholder={{
                                            textColor: 'rgba(255, 255, 255, 0.25)',
                                        }}
                                        backgroundColor="rgba(255, 255, 255, 0.25)"
                                        textColor="rgba(255, 255, 255, 0.15)"
                                        border="none"
                                        width="325px"
                                        borderRadius="10px"
                                    />
                                </FormControl>
                            </Flex>
                        </Box>
                        {!isLoading && (
                            <Flex flexDirection="column" mt="20px">
                                {users && <Member githubIds={users} setUsers={setUsers} />}
                            </Flex>
                        )}
                    </Flex>
                </ModalBody>

                <ModalFooter justifyContent="flex-end">
                    <Button
                        size="lg"
                        backgroundColor="rgba(255, 255, 255, 1)"
                        onClick={updateTeam}
                        transition="all 0.2s ease"
                        _hover={{
                            backgroundColor: '#DBF72C',
                        }}
                        _active={{
                            backgroundColor: '#DBF72C',
                        }}
                        fontFamily="Clash Display"
                    >
                        Update Details
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
