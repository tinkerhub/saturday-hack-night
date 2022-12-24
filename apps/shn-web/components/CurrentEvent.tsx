import React from 'react';
import { CalendarIcon } from '@chakra-ui/icons';
import {
    Flex,
    HStack,
    VStack,
    Image,
    Text,
    Box,
    Heading,
    Button,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
/* import { UpdateTeamModal, CreateTeamModal } from '../modal';
 */ import Toast from './Toast';

const CurrentEvent = ({ event }: CurrentEventProps) => {
    const toast = useToast();
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { title, description, date, image, details, _count } = event;
    /*     const {
        isOpen: isOpenUpdateModal,
        onOpen: onOpenUpdateModal,
        onClose: onCloseUpdateModal,
    } = useDisclosure();
    const {
        isOpen: isOpenCreateModal,
        onOpen: onOpenCreateModal,
        onClose: onCloseCreateModal,
    } = useDisclosure();
    useEffect(() => {
        (async () => {
            const teamSnapshots = await getDocs(query(collection(db, `events/${event.id}/teams`)));
            setTeams(teamSnapshots.docs.length);
            const userTeamSnap = await getDoc(
                doc(db, `users/${auth.currentUser?.uid}/teams/${event.id}`),
            );
            const user = userTeamSnap.data();
            if (user) setTeamID(user.teamID);
            const userSnap = await getDoc(doc(db, `users/${auth.currentUser?.uid}`));
            if (userSnap.get('phno')) setIsProfileComplete(true);
        })();
        return () => {};
    }, [auth.currentUser, db, event.id]);
 */
    return (
        <Flex
            width={{
                base: '100%',
                xl: 'container.xl',
            }}
            flexDirection={{
                base: 'column',
                lg: 'row',
            }}
            paddingInline={{ base: '16px', md: '32px' }}
            rowGap="16px"
            paddingBlockStart="18px"
            justifyContent="space-between"
        >
            {/* <UpdateTeamModal
                isOpen={isOpenUpdateModal}
                onClose={onCloseUpdateModal}
                image={imageWhite}
                teamID={teamID}
                eventId={event.id}
            />
            <CreateTeamModal
                isOpen={isOpenCreateModal}
                onClose={onCloseCreateModal}
                eventId={event.id}
            /> */}
            <VStack
                minWidth={{ base: '100%', lg: '50%' }}
                maxWidth={{ base: '100%', lg: '50%' }}
                borderRadius="10px"
                background="rgba(255, 255, 255, 0.15);"
                style={{
                    backdropFilter: 'blur(10px)',
                }}
            >
                <HStack
                    fontFamily="Clash Display"
                    width="100%"
                    justifyContent="space-between"
                    paddingInline="16px"
                    paddingBlockStart="16px"
                >
                    <HStack textColor="white">
                        <CalendarIcon height="15px" width="15px" />
                        <Text fontSize="12px">{date}</Text>
                    </HStack>
                    <HStack
                        padding="10px"
                        borderRadius="10px"
                        alignItems="center"
                        backgroundColor="rgba(255,255,255,.15)"
                    >
                        <Image width="15px" height="15px" src="images/circle.svg" />
                        <Text fontSize="12px" textColor="#DBF72C">
                            {_count.teams} Teams Registered
                        </Text>
                    </HStack>
                </HStack>
                <Image
                    marginInline="16px"
                    width="100%"
                    src={image}
                    objectFit="contain"
                    flexGrow="1"
                    paddingInline="8px"
                />
                <Box
                    width="100%" /* 
                    backgroundColor={teamID ? '#DBF72C' : '#E24C4B'} */
                    borderBottomStartRadius="10px"
                    padding="5px"
                    borderBottomEndRadius="10px"
                >
                    <Text
                        fontSize="18px"
                        fontWeight="medium"
                        textColor="#0C0F17"
                        textAlign="center"
                        fontFamily="Clash Display"
                    >
                        Registered
                        {/*  {teamID ? 'Registered 🎉' : 'Register Now'} */}
                    </Text>
                </Box>
            </VStack>
            <VStack
                width="100%"
                alignItems="flex-start"
                paddingInlineStart={{ base: '0px', md: '16px' }}
            >
                <Heading
                    textAlign="left"
                    textColor="white"
                    fontFamily="Clash Display"
                    fontSize="40px"
                >
                    {title}
                </Heading>
                <Text fontSize="18px" fontFamily="Clash Display" textColor="white" flexGrow="1">
                    {description}
                </Text>
                <HStack columnGap="15px">
                    <Button
                        /* onClick={
                            // eslint-disable-next-line no-nested-ternary
                            auth.currentUser
                                ? // eslint-disable-next-line no-nested-ternary
                                  teamID
                                    ? onOpenUpdateModal
                                    : isProfileComplete
                                    ? onOpenCreateModal
                                    : () =>
                                          toast({
                                              title: '✗ Please complete your Profile',
                                              status: 'error',
                                              // eslint-disable-next-line @typescript-eslint/no-shadow
                                              render: ({ title, status }) => (
                                                  <Toast title={title} status={status} />
                                              ),
                                          })
                                : () => signInWithPopup(auth, new GithubAuthProvider())
                        } */
                        fontFamily="Clash Display"
                        size="lg"
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
                    >
                        {/*  {teamID ? 'Edit Team' : 'Create Team'} */}
                    </Button>
                    <Button
                        fontFamily="Clash Display"
                        size="lg"
                        backgroundColor="rgba(255, 255, 255, 0.15)"
                        textColor="white"
                        _hover={{
                            textColor: '#0C0F17',
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
                            window.open(details, '_blank');
                        }}
                    >
                        More Info
                    </Button>
                </HStack>
            </VStack>
        </Flex>
    );
};

interface CurrentEventProps {
    event: any;
}

export default CurrentEvent;
