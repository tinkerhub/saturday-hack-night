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
import { Member } from '../components';
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
    const [teamData, setTeamData] = useState<DocumentSnapshot<DocumentData>>();
    const [users, setUsers] = useState<Array<string>>([]);
    const finalRef = React.useRef(null);
    const { db } = useFirebase();
    const updateTeam = async () => {
        const userMembers = users.filter((user) => user !== '');

        const memberList = userMembers.map(async (member: string) => {
            const userSnapshot = await getDocs(
                query(collection(db, 'users'), where('githubID', '==', member)),
            );
            return userSnapshot.docs[0].id;
        });
        const memberData = await Promise.all(memberList);

        updateDoc(doc(db, `events/${eventId}/teams/${teamID}`), {
            members: memberData,
        })
            .then(() => {
                toast({
                    title: 'Team Updated',
                    description: 'Your team has been updated',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                onClose();
            })
            .catch((error) => {
                toast({
                    title: 'Error',
                    description: error.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                throw error;
            });
    };
    useEffect(() => {
        (async () => {
            const teamSnapshot = await getDoc(doc(db, `events/${eventId}/teams/${teamID}`));
            setTeamData(teamSnapshot);
            const memberList = teamSnapshot.get('members');
            memberList.forEach(async (member: string) => {
                const memberSnapshot = (await getDoc(doc(db, `users/${member}`))).data();
                setUsers((prev) => [...prev, memberSnapshot?.githubID]);
            });
        })();
        return () => {};
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
                        <Flex flexDirection="column" mt="20px">
                            {users && <Member githubIds={users} setUsers={setUsers} />}
                        </Flex>
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
