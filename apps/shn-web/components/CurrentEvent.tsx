import React, { useEffect, useState } from 'react';
import { CalendarIcon } from '@chakra-ui/icons';
import { Activity, Team } from '@prisma/client';
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
import moment from 'moment';
import { api } from '@app/api';
import { CreateTeamModal, UpdateTeamModal } from '@app/components/modal';
import { Toast } from '@app/components/';
import { useAuthCtx } from '@app/hooks';

const CurrentEvent = ({ event }: CurrentEventProps) => {
    const toast = useToast();
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { id, title, description, date, image, details, _count } = event;
    const [team, setTeam] = useState<Team | null>(null);
    const { isProfileComplete, user, login } = useAuthCtx();

    useEffect(() => {
        (async () => {
            if (user) {
                const { data } = await api.get(`/team/${id}`);
                if (data.data) setTeam(data.data.team);
            }
        })();
        return () => {
            setTeam(null);
        };
    }, [isProfileComplete, user, login, id]);

    const {
        isOpen: isOpenUpdateModal,
        onOpen: onOpenUpdateModal,
        onClose: onCloseUpdateModal,
    } = useDisclosure();
    const {
        isOpen: isOpenCreateModal,
        onOpen: onOpenCreateModal,
        onClose: onCloseCreateModal,
    } = useDisclosure();
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
            {team && isOpenUpdateModal && (
                <UpdateTeamModal
                    teamId={team.id}
                    isOpen={isOpenUpdateModal}
                    onClose={onCloseUpdateModal}
                    image={image}
                    eventId={id}
                />
            )}
            {user && isOpenCreateModal && (
                <CreateTeamModal
                    isOpen={isOpenCreateModal}
                    onClose={onCloseCreateModal}
                    eventId={id}
                />
            )}
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
                        <Text fontSize="12px">{moment(date).format('ll')}</Text>
                    </HStack>
                    <HStack
                        padding="10px"
                        borderRadius="10px"
                        alignItems="center"
                        backgroundColor="rgba(255,255,255,.15)"
                    >
                        <Image width="15px" height="15px" src="images/circle.svg" />
                        <Text fontSize="12px" textColor="#DBF72C">
                            {_count!.teams || 0} Teams Registered
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
                    width="100%"
                    backgroundColor={team ? '#DBF72C' : '#E24C4B'}
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
                        {team ? 'Registered 🎉' : 'Register Now'}
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
                        onClick={
                            // eslint-disable-next-line no-nested-ternary
                            user
                                ? // eslint-disable-next-line no-nested-ternary
                                  team
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
                                : () => login()
                        }
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
                        {team ? 'Edit Team' : 'Create Team'}
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

export interface CurrentEventProps {
    event: Activity & { _count?: { teams: number } };
}

export { CurrentEvent };
