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
    useToast,
} from '@chakra-ui/react';
import { getDocs, query, collection, where, addDoc } from 'firebase/firestore';
import React, { useState, useRef } from 'react';
import { useFirebase } from '../context/firebase';

export const CreateTeamModal = ({ isOpen, onClose, eventId }: CreateTeamModalProps) => {
    const toast = useToast();
    const { auth, db } = useFirebase();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [name, setName] = useState('');
    const [repo, setRepo] = useState('');
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        setError({ name: false, repo: false, member1: false, member2: false });

        if (!name.match(/^[a-z|0-9]+$/gi)) {
            setLoading(false);
            return setError((prev: any) => ({ ...prev, name: true }));
        }
        if (!repo.match(/^https:\/\/github.com\/[^/]+\/[^/]+$/g)) {
            setLoading(false);
            return setError((prev: any) => ({ ...prev, repo: true }));
        }
        let m1;
        let m2;
        const members = [];
        try {
            if (member1.length > 0) {
                m1 = (
                    await getDocs(query(collection(db, 'users'), where('githubID', '==', member1)))
                ).docs[0].data();
                members.push(m1.uid);
            }
        } catch (err) {
            setLoading(false);
            return setError((prev: any) => ({ ...prev, member1: true, member2: true }));
        }
        try {
            if (member2.length > 0) {
                m2 = (
                    await getDocs(query(collection(db, 'users'), where('githubID', '==', member2)))
                ).docs[0].data();
                members.push(m2.uid);
            }
        } catch (err) {
            setLoading(false);
            return setError((prev: any) => ({ ...prev, member2: true }));
        }
        addDoc(collection(db, `events/${eventId}/teams`), {
            name,
            repo,
            members,
            lead: auth.currentUser.uid,
        })
            .then(() => {
                toast({
                    title: 'Team Registered',
                    description: 'Your team has been registered successfully',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                onClose();
            })
            .catch(() => {
                toast({
                    title: 'Error',
                    description: 'An error occured while registering your team',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            });
        setLoading(false);
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
                    <ModalCloseButton
                        color="rgba(226, 76, 75, 1)"
                        border="2px solid rgba(226, 76, 75, 1)"
                        borderRadius="full"
                    />
                </ModalHeader>
                <ModalBody>
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
                    <Flex
                        justifyContent="space-evenly"
                        columnGap="25px"
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
                                    disabled={loading}
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
                                    minWidth="350px"
                                    borderRadius="10px"
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel color="white">Github Repository</FormLabel>
                                <Input
                                    ref={initialRef}
                                    disabled={loading}
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
                                    minWidth="350px"
                                    borderRadius="10px"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel color="white">Member 1</FormLabel>
                                <Input
                                    ref={initialRef}
                                    placeholder="Github Username"
                                    disabled={loading}
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
                                    minWidth="350px"
                                    borderRadius="10px"
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel color="white">Member 2</FormLabel>
                                <Input
                                    placeholder="Github Username"
                                    onChange={(e) => setMember2(e.target.value)}
                                    minWidth="350px"
                                    disabled={loading}
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
                                    borderRadius="10px"
                                />
                            </FormControl>
                        </Flex>
                        <Flex
                            flexDirection="column"
                            marginTop="20px"
                            rowGap={{
                                base: '20px',
                                lg: '30px',
                            }}
                        >
                            {error.name && (
                                <Box
                                    backgroundColor="rgba(226,76,75,0.15)"
                                    paddingInline="10px"
                                    borderRadius="5px"
                                    paddingBlock="5px"
                                >
                                    <Text
                                        fontFamily="Clash Display"
                                        fontSize="12px"
                                        textColor="#E24C4B"
                                    >
                                        Team Name should be Alpha Numeric & should not contain any
                                        special characters
                                    </Text>
                                </Box>
                            )}
                            {error.repo && (
                                <Box
                                    backgroundColor="rgba(226,76,75,0.15)"
                                    paddingInline="10px"
                                    borderRadius="5px"
                                    paddingBlock="5px"
                                >
                                    <Text
                                        fontFamily="Clash Display"
                                        fontSize="12px"
                                        textColor="#E24C4B"
                                    >
                                        Enter a valid repo Url
                                    </Text>
                                </Box>
                            )}
                            {error.member1 && (
                                <Box
                                    backgroundColor="rgba(226,76,75,0.15)"
                                    paddingInline="10px"
                                    borderRadius="5px"
                                    paddingBlock="5px"
                                >
                                    <Text
                                        fontFamily="Clash Display"
                                        fontSize="12px"
                                        textColor="#E24C4B"
                                    >
                                        Member 1 is not found on SHN Platform
                                    </Text>
                                </Box>
                            )}
                            {error.member2 && (
                                <Box
                                    backgroundColor="rgba(226,76,75,0.15)"
                                    paddingInline="10px"
                                    borderRadius="5px"
                                    paddingBlock="5px"
                                >
                                    <Text
                                        fontFamily="Clash Display"
                                        fontSize="12px"
                                        textColor="#E24C4B"
                                    >
                                        Member 2 is not found on SHN Platform
                                    </Text>
                                </Box>
                            )}
                            <Box
                                backgroundColor="rgba(50,186,124,0.15)"
                                paddingInline="10px"
                                borderRadius="5px"
                                width="350px"
                                paddingBlock="5px"
                            >
                                <Text
                                    fontFamily="Clash Display"
                                    fontSize="12px"
                                    textColor="#32BA7C"
                                >
                                    Make sure all the members are registered on the platform
                                    <br />
                                    Project repo can&apos;t be changed once submitted
                                    <br />
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
                        onClick={loading ? () => {} : registerTeam}
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
