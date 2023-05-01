import React, { useState } from 'react';
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
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType } from 'yup';
import { Member } from '@app/components';
import { useAuth } from '@app/hooks';
import { Toast } from '@app/components/utils';
import { TeamValidator } from '@app/utils/validators';
import api from '@app/api';

type FormType = InferType<typeof TeamValidator>;

export const CreateTeamModal = ({ isOpen, onClose, eventId }: CreateTeamModalProps) => {
    const { user } = useAuth();
    const methods = useForm<FormType>({
        resolver: yupResolver(TeamValidator),
    });
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = methods;

    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const createTeam = async (formData: FormType) => {
        setLoading(true);
        const { name, repo, members } = formData;
        const teamMembers = new Set(members);
        try {
            const { data } = await api.post('/team', {
                name,
                repo,
                members: Array.from(teamMembers),
                eventId,
            });
            if (data.data) {
                toast({
                    title: '✅ Team Registered',
                    status: 'success',
                    render: ({ title, status }) => <Toast title={title} status={status} />,
                });
                window.location.reload();
                onClose();
            }
        } catch (err) {
            toast({
                title: '✗ Team Registration Failed',
                status: 'error',
                render: ({ title, status }) => <Toast title={title} status={status} />,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'full', lg: 'xl' }} isCentered>
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
                    <form onSubmit={handleSubmit(createTeam)}>
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
                                    {user?.email}
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
                                            isRequired
                                            size="lg"
                                            disabled={loading}
                                            placeholder="Team Name"
                                            _focus={{
                                                boxShadow: '0px 3px 8px rgba(219, 247, 44, 0.15)',
                                            }}
                                            _placeholder={{
                                                textColor: 'rgba(255, 255, 255, 0.25)',
                                            }}
                                            backgroundColor="rgba(255, 255, 255, 0.25)"
                                            textColor="white"
                                            border="none"
                                            width="325px"
                                            borderRadius="10px"
                                            {...register('name')}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel color="white">Github Repository</FormLabel>
                                        <Input
                                            disabled={loading}
                                            placeholder="www.github.com/example/exampleRepo"
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
                                            width="325px"
                                            borderRadius="10px"
                                            {...register('repo')}
                                        />
                                    </FormControl>
                                    <Member isEditable loading={loading} />
                                </Flex>
                                <Flex
                                    flexDirection="column"
                                    marginTop="20px"
                                    rowGap={{
                                        base: '20px',
                                        lg: '20px',
                                    }}
                                >
                                    {errors.name && (
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
                                                Team Name should be Alpha Numeric & should not
                                                contain any special characters
                                            </Text>
                                        </Box>
                                    )}
                                    {errors.repo && (
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
                        <ModalFooter justifyContent="flex-end">
                            <Button
                                isLoading={loading}
                                type="submit"
                                size="lg"
                                backgroundColor="rgba(255, 255, 255, 1)"
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
                    </form>
                </FormProvider>
            </ModalContent>
        </Modal>
    );
};
interface CreateTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventId: string;
}
