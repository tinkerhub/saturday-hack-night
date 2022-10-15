import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Text,
    Heading,
    Flex,
    FormControl,
    Box,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { getDocs, query, collection, where, addDoc } from 'firebase/firestore';
import React, { useState, useRef } from 'react';
import { useFirebase } from '../context/firebase';

export const CreateTeamModal = ({ isOpen, onClose, eventId }: CreateTeamModalProps) => {
    const { auth, db } = useFirebase();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [name, setName] = useState('');
    const [repo, setRepo] = useState('');
    const [member1, setMember1] = useState('');
    const [member2, setMember2] = useState('');
    const [error, setError] = useState({
        name: false,
        repo: false,
        member1: false,
        member2: false,
    });
    // eslint-disable-next-line consistent-return
    const registerTeam = async () => {
        setError({ name: false, repo: false, member1: false, member2: false });

        if (!name.match(/^[a-z|0-9]+$/gi))
            return setError((prev: any) => ({ ...prev, name: true }));
        if (!repo.match(/^https:\/\/github.com\/[^/]+\/[^/]+$/g))
            return setError((prev: any) => ({ ...prev, repo: true }));
        let m1;
        let m2;
        const members = [];
        if (member1.length > 0) {
            m1 = (
                await getDocs(query(collection(db, 'users'), where('githubID', '==', member1)))
            ).docs[0].data();
            if (!m1) return setError((prev: any) => ({ ...prev, member1: true }));
            members.push(m1.uid);
        }
        if (member2.length > 0) {
            m2 = (
                await getDocs(query(collection(db, 'users'), where('githubID', '==', member2)))
            ).docs[0].data();
            if (!m2) return setError((prev: any) => ({ ...prev, member2: true }));
            members.push(m2.uid);
        }
        await addDoc(collection(db, `events/${eventId}/teams`), {
            name,
            repo,
            members,
            lead: auth.currentUser.uid,
        });
    };
    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
            size={{ base: 'full', lg: 'xl' }}
            isCentered
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
                        padding: '16px',
                    }}
                >
                    <Heading fontFamily="Clash Display" fontSize="32px" textColor="#E9E5E1">
                        Register Your Team
                    </Heading>
                    <Text
                        fontFamily="Clash Display"
                        fontSize="16px"
                        textColor="rgba(255,255,255,0.4)"
                    >
                        you&apos;r are currently logged in as{' '}
                        <span
                            style={{
                                color: 'white',
                            }}
                        >
                            {auth.currentUser?.email}
                        </span>
                    </Text>
                    <ModalCloseButton
                        color="rgba(226, 76, 75, 1)"
                        border="2px solid rgba(226, 76, 75, 1)"
                        borderRadius="full"
                    />
                </ModalHeader>
                <ModalBody>
                    <Flex
                        justifyContent="space-evenly"
                        columnGap="50px"
                        alignItems="center"
                        fontSize="16px"
                        fontFamily="Clash Display"
                        flexDirection={{ base: 'column-reverse', lg: 'row' }}
                    >
                        <Flex
                            flexDirection="column"
                            mt="20px"
                            flexGrow="1"
                            rowGap="20px"
                            fontSize="16px"
                            fontFamily="Clash Display"
                        >
                            <FormControl>
                                <FormLabel color="white">Team Name</FormLabel>
                                <Input
                                    ref={initialRef}
                                    size="lg"
                                    placeholder="*Team Name"
                                    _focus={{
                                        boxShadow: '0px 3px 8px rgba(219, 247, 44, 0.15)',
                                    }}
                                    _placeholder={{
                                        textColor: 'rgba(255, 255, 255, 0.25)',
                                    }}
                                    backgroundColor="rgba(255, 255, 255, 0.25)"
                                    textColor="white"
                                    border="none"
                                    onChange={(e) => setName(e.target.value)}
                                    width="300px"
                                    borderRadius="10px"
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel color="white">*Github Repository</FormLabel>
                                <Input
                                    ref={initialRef}
                                    placeholder="www.github.com/example/exampleRepo"
                                    size="lg"
                                    onChange={(e) => setRepo(e.target.value)}
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
                            <FormControl>
                                <FormLabel color="white">Member 1</FormLabel>
                                <Input
                                    ref={initialRef}
                                    placeholder="Github Username"
                                    size="lg"
                                    onChange={(e) => setMember1(e.target.value)}
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

                            <FormControl>
                                <FormLabel color="white">Member 2</FormLabel>
                                <Input
                                    placeholder="Github Username"
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
                        <Flex
                            flexDirection="column"
                            mt="20px"
                            rowGap={{
                                base: '20px',
                                lg: '50px',
                            }}
                        >
                            <Box
                                backgroundColor="rgba(226,76,75,0.4)"
                                paddingInline="10px"
                                borderRadius="5px"
                                paddingBlock="5px"
                            >
                                <Text
                                    fontFamily="Clash Display"
                                    fontSize="12px"
                                    textColor="#E24C4B"
                                >
                                    Project repo can&apos;t be changed once submitted
                                </Text>
                            </Box>
                            <Box
                                backgroundColor="rgba(50,186,124,0.15)"
                                paddingInline="10px"
                                borderRadius="5px"
                                paddingBlock="5px"
                            >
                                <Text
                                    fontFamily="Clash Display"
                                    fontSize="12px"
                                    textColor="#32BA7C"
                                >
                                    You can participate individualy or can team up with upto 2
                                    People
                                </Text>
                            </Box>
                        </Flex>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button
                        size="lg"
                        backgroundColor="rgba(255, 255, 255, 1)"
                        onClick={registerTeam}
                        transition="all 0.2s ease"
                        _hover={{
                            backgroundColor: '#DBF72C',
                        }}
                        _active={{
                            backgroundColor: '#DBF72C',
                        }}
                        fontFamily="Clash Display"
                    >
                        Register Your Team
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
interface CreateTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventId: string;
}
