import React, { useState, useRef } from 'react';
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
import { Member } from '../components';
import { useFirebase } from '../context/firebase';

export const CreateTeamModal = ({ isOpen, onClose, eventId }: CreateTeamModalProps) => {
    const toast = useToast();
    const { auth, db } = useFirebase();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [name, setName] = useState('');
    const [repo, setRepo] = useState('');
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<Array<string>>([]);
    const [error, setError] = useState({
        name: false,
        repo: false,
        member1: false,
        member2: false,
        member3: false,
        count: false,
    });
    // eslint-disable-next-line consistent-return
    const registerTeam = async () => {
        setLoading(true);
        setError({
            name: false,
            repo: false,
            member1: false,
            member2: false,
            member3: false,
            count: false,
        });

        if (!name.match(/^[a-z|0-9]+$/gi)) {
            setLoading(false);
            return setError((prev: any) => ({ ...prev, name: true }));
        }
        if (!repo.match(/^https:\/\/github.com\/[^/]+\/[^/]+$/g)) {
            setLoading(false);
            return setError((prev: any) => ({ ...prev, repo: true }));
        }
        const members = await Promise.all(
            // eslint-disable-next-line consistent-return
            users.map(async (user) => {
                if (user.length > 0) {
                    try {
                        const data = (
                            await getDocs(
                                query(collection(db, 'users'), where('githubID', '==', user)),
                            )
                        ).docs[0].data();
                        return data.uid;
                    } catch (err) {
                        setLoading(false);
                        if (user === users[0])
                            setError((prev: any) => ({ ...prev, member1: true }));
                        if (user === users[1])
                            setError((prev: any) => ({ ...prev, member2: true }));
                        if (user === users[2])
                            setError((prev: any) => ({ ...prev, member3: true }));
                    }
                }
            }),
        );
        const teamMembers = new Set(members);
        if (teamMembers.has(auth.currentUser.uid)) {
            teamMembers.delete(auth.currentUser.uid);
        }
        if (teamMembers.size > 3 || teamMembers.size < 1) {
            setLoading(false);
            return setError((prev: any) => ({ ...prev, count: true }));
        }
        addDoc(collection(db, `events/${eventId}/teams`), {
            name,
            repo,
            members: Array.from(teamMembers),
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
                window.location.reload();
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
                            <Member setUsers={setUsers} />
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

                            {error.member3 && (
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
                                        Member 3 is not found on SHN Platform
                                    </Text>
                                </Box>
                            )}
                            {error.count && (
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
                                        Team should have atleast 1 member
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
                                    You can team up with upto 3 People
                                    <br />
                                    Team should have atleast 1 member
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
