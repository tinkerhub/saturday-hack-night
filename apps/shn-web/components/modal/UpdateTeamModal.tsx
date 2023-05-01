import React, { useEffect, useState } from 'react';
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
    Text,
} from '@chakra-ui/react';

import { FormProvider, useForm } from 'react-hook-form';
import { InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Member } from '@app/components';
import { Toast } from '@app/components/utils';
import { TeamValidator } from '@app/utils/validators';
import { useAuth } from '@app/hooks';
import api from '@app/api';

type FormType = InferType<typeof TeamValidator>;

interface ModalType {
    isOpen: boolean;
    image: string;
    onClose: () => void;
    eventId: string;
    teamId: string;
    isEditable: boolean;
}

export const UpdateTeamModal = ({
    isOpen,
    onClose,
    image,
    eventId,
    teamId,
    isEditable,
}: ModalType) => {
    const methods = useForm<FormType>({
        resolver: yupResolver(TeamValidator),
    });
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = methods;
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const toast = useToast();

    useEffect(() => {
        (async () => {
            if (!user) return;
            try {
                setLoading(true);
                const { data } = await api.get(`/team/${eventId}`);
                if (!data.data.team) {
                    toast({
                        title: '✗ You are not part of any team',
                        status: 'error',
                        render: ({ title, status }) => <Toast title={title} status={status} />,
                    });
                    onClose();
                    return;
                }
                setValue('name', data.data.team.name);
                setValue('repo', data.data.team.repo);
                const members = data.data.team.members.map(
                    (member: { role: string; user: { githubid: string } }) => member.user.githubid,
                );
                setValue('members', members);
            } finally {
                setLoading(false);
            }
        })();
        return () => {
            setLoading(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, eventId]);

    const updateTeam = async (formData: FormType) => {
        const dbData = {
            eventId,
            name: undefined,
            repo: undefined,
            teamId,
            members: formData.members,
        };
        setLoading(true);
        try {
            const { data } = await api.patch(`/team`, dbData);
            if (!data.success) {
                toast({
                    title: '✗ Team Update Error',
                    status: 'error',
                    render: ({ title, status }) => <Toast title={title} status={status} />,
                });
                return;
            }
            toast({
                title: '✅ Team Updated',
                status: 'success',
                render: ({ title, status }) => <Toast title={title} status={status} />,
            });
        } catch (error) {
            toast({
                title: '✗ Team Update Error',
                status: 'error',
                render: ({ title, status }) => <Toast title={title} status={status} />,
            });
        } finally {
            setLoading(false);
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'full', lg: 'xl' }}>
            <ModalOverlay />
            <ModalContent
                borderRadius="10px"
                backgroundColor="#0C0F17"
                minWidth={{
                    base: 'full',
                    lg: 'container.md',
                }}
            >
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(updateTeam)}>
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
                            <Box
                                backgroundColor="rgba(50,186,124,0.15)"
                                paddingInline="10px"
                                borderRadius="5px"
                                paddingBlock="5px"
                                marginBlock="10px"
                            >
                                <Text
                                    fontFamily="Clash Display"
                                    fontSize="12px"
                                    textColor="#32BA7C"
                                >
                                    Your Team Members will appear here once they accept your team
                                    invitation
                                </Text>
                            </Box>
                            <Box
                                display={errors.members ? 'block' : 'none'}
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
                                        mt="10px"
                                        fontSize="16px"
                                        fontFamily="Clash Display"
                                    >
                                        <FormControl isInvalid>
                                            <FormLabel color="white">Team Name</FormLabel>
                                            <Input
                                                size="lg"
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
                                                {...register('name')}
                                            />
                                        </FormControl>

                                        <FormControl mt={4}>
                                            <FormLabel color="white">Github repository</FormLabel>
                                            <Input
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
                                                {...register('repo')}
                                            />
                                        </FormControl>
                                    </Flex>
                                </Box>
                                <Flex flexDirection="column" mt="20px">
                                    <Member isEditable={isEditable} loading={loading} />
                                    {errors.members && (
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
                                                User not found
                                            </Text>
                                        </Box>
                                    )}

                                    {errors.members && (
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
                                </Flex>
                            </Flex>
                        </ModalBody>

                        <ModalFooter justifyContent="flex-end">
                            <Button
                                size="lg"
                                backgroundColor="rgba(255, 255, 255, 1)"
                                type={isEditable ? 'submit' : 'button'}
                                disabled={loading}
                                isLoading={loading}
                                transition="all 0.2s ease"
                                onClick={() => {
                                    if (isEditable) {
                                        return;
                                    }
                                    onClose();
                                }}
                                _hover={{
                                    backgroundColor: '#DBF72C',
                                }}
                                _active={{
                                    backgroundColor: '#DBF72C',
                                }}
                                fontFamily="Clash Display"
                            >
                                {isEditable ? 'Update Team' : 'Close'}
                            </Button>
                        </ModalFooter>
                    </form>
                </FormProvider>
            </ModalContent>
        </Modal>
    );
};
