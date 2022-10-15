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
import { useFirebase } from '../context/firebase';

interface ModalType {
    isOpen: boolean;
    image: string;
    onClose: () => void;
    eventId: string;
    teamID: string;
}

export const UpdateTeam = ({ isOpen, onClose, image, eventId, teamID }: ModalType) => {
    const initialRef = React.useRef(null);
    const [teamData, setTeamData] = useState<DocumentSnapshot<DocumentData>>();
    const [member1, setMember1] = useState<string>('');
    const [member2, setMember2] = useState<string>('');
    const finalRef = React.useRef(null);
    const { db } = useFirebase();
    const updateTeam = async () => {
        const members = [member1, member2];
        const userMembers = members.filter((member) => member !== '');

        const memberList = userMembers.map(async (member: string) => {
            const userSnapshot = await getDocs(
                query(collection(db, 'users'), where('githubID', '==', member)),
            );
            return userSnapshot.docs[0].id;
        });
        const memberData = await Promise.all(memberList);

        await updateDoc(doc(db, `events/${eventId}/teams/${teamID}`), {
            members: memberData,
        });
        onClose();
    };
    useEffect(() => {
        (async () => {
            const teamSnapshot = await getDoc(doc(db, `events/${eventId}/teams/${teamID}`));
            setTeamData(teamSnapshot);
            let memberList = teamSnapshot.get('members');
            memberList = [...new Set(memberList)];
            const members = memberList.map(async (member: string) => {
                const memberSnapshot = await getDoc(doc(db, `users/${member}`));
                return memberSnapshot.data();
            });
            setMember1((await members[0]).githubID);
            setMember2((await members[1]).githubID);
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
                    <Box
                        borderTopRadius="10px"
                        backgroundColor="rgba(255,255,255,.15)"
                        paddingBlock="35px"
                    >
                        <Image
                            src={image}
                            alt=""
                            paddingInline="50px"
                            borderTopRadius="10px"
                            maxHeight="250px"
                        />
                    </Box>
                </ModalHeader>
                <ModalCloseButton
                    color="rgba(226, 76, 75, 1)"
                    border="2px solid rgba(226, 76, 75, 1)"
                    borderRadius="full"
                />
                <ModalBody marginTop="36px">
                    <Heading fontFamily="Clash Display" as="h2" color="white">
                        Team Details
                    </Heading>
                    <Flex
                        justifyContent="space-evenly"
                        columnGap="50px"
                        alignItems="center"
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
                                <FormControl>
                                    <FormLabel color="white">Team Name</FormLabel>
                                    <Input
                                        ref={initialRef}
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
                                        width="300px"
                                        borderRadius="10px"
                                    />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel color="white">Github repository</FormLabel>
                                    <Input
                                        ref={initialRef}
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
                                        width="300px"
                                        borderRadius="10px"
                                    />
                                </FormControl>
                            </Flex>
                        </Box>
                        <Flex flexDirection="column" mt="20px">
                            <FormControl>
                                <FormLabel color="white">Member 1</FormLabel>
                                <Input
                                    ref={initialRef}
                                    placeholder="Github Username"
                                    onChange={(e) => setMember1(e.target.value)}
                                    defaultValue={member1}
                                    size="lg"
                                    _focus={{
                                        boxShadow: '0px 3px 8px rgba(219, 247, 44, 0.15)',
                                    }}
                                    _placeholder={{
                                        textColor: 'rgba(255, 255, 255, 0.25)',
                                    }}
                                    backgroundColor="rgba(255, 255, 255, 0.25)"
                                    textColor="white"
                                    border="none"
                                    width="300px"
                                    borderRadius="10px"
                                />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel color="white">Member 2</FormLabel>
                                <Input
                                    placeholder="Github Username"
                                    defaultValue={member2}
                                    onChange={(e) => setMember2(e.target.value)}
                                    size="lg"
                                    _placeholder={{
                                        textColor: 'rgba(255, 255, 255, 0.25)',
                                    }}
                                    backgroundColor="rgba(255, 255, 255, 0.25)"
                                    textColor="white"
                                    border="none"
                                    _focus={{
                                        boxShadow: '0px 3px 8px rgba(219, 247, 44, 0.15)',
                                    }}
                                    width="300px"
                                    borderRadius="10px"
                                />
                            </FormControl>
                        </Flex>
                    </Flex>
                </ModalBody>

                <ModalFooter justifyContent="flex-start">
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
