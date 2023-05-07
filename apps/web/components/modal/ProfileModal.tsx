import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Avatar,
    Center,
    Heading,
    Flex,
    FormControl,
    Text,
    ModalHeader,
    Button,
    Input,
    FormErrorMessage,
    useToast,
} from '@chakra-ui/react';

import React, { useCallback, useEffect } from 'react';
import AsyncSelect from 'react-select/async';

import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { InferType } from 'yup';
import { Toast } from '@app/components/utils';
import { profileModalValidator } from '@app/utils/validators';
import { useAuth } from '@app/hooks';
import api from '@app/api';
import { debounce } from '@app/utils';

type FormType = InferType<typeof profileModalValidator>;

interface ProfileMod {
    isOpen: boolean;
    onClose: () => void;
}

interface Clg {
    name: string;
    id: string;
}
const selectStyle = {
    control: (styles: any, state: { isFocused: any }) => ({
        ...styles,
        ':hover': {
            borderColor: 'rgba(255, 255, 255, 0.15)',
        },
        color: 'white',
        paddingInline: '10px',
        fontFamily: 'Clash Display',
        fontSize: '16px',
        height: '45px',
        fontWeight: 'regular',
        background: 'rgba(255,255,255,0.15)',
        boxShadow: state.isFocused ? '0px 3px 8px rgba(219, 247, 44, 0.15)' : 'none',
        outline: 'none',
        borderRadius: '10px',
        border: state.isFocused
            ? '1px solid rgba(219, 247, 44, 0.15)'
            : '1px solid rgba(255, 255, 255, 0.15)',
    }),
    menu: (styles: any) => ({
        ...styles,
        color: 'white',
        borderRadius: '10px',
        fontFamily: 'Clash Display',
        fontSize: '16px',
    }),
    menuList: (styles: any) => ({
        ...styles,
        borderRadius: '10px',
        padding: '10px',
        backgroundColor: 'rgba(0,0,0)',
    }),
    singleValue: (styles: any) => ({
        ...styles,
        color: 'white',
    }),
    option: (styles: any) => ({
        ...styles,
        border: '1px solid rgba(255, 255, 255, 0.15)',
        backgroundColor: 'rgba(255,255,255,0.15)',
    }),
};

export const ProfileModal = ({ isOpen, onClose }: ProfileMod) => {
    const methods = useForm<FormType>({
        resolver: yupResolver(profileModalValidator),
    });
    const {
        handleSubmit,
        register,
        control,
        setValue,
        formState: { errors },
    } = methods;
    const { user, setUser } = useAuth();
    const [loading, setLoading] = React.useState(false);
    const toast = useToast();

    const getCollege = async (input: string) => {
        const { data } = await api.get(`college?search=${input}&limit=20&page=1`);
        const college = await data.map((el: Clg) => ({ label: el.name, value: el.id }));
        return college;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const loadOptionsDebounced = useCallback(
        debounce((inputValue: string, callback: (options: any) => void) => {
            getCollege(inputValue).then((options) => {
                callback(options);
            });
        }, 500),
        [],
    );
    const updateProfile = async (data: FormType) => {
        const DbData = {
            mobile: data.mobile,
            collegeId: data?.college.value || '',
            name: data?.name,
        };
        try {
            setLoading(true);
            setTimeout(() => {}, 3000);
            api.patch('profile', DbData).then((res) => {
                if (res.data.success) {
                    toast({
                        title: '✅ Profile Updated',
                        status: 'success',
                        render: ({ title, status }) => <Toast title={title} status={status} />,
                    });
                    setUser(res.data.data);
                    onClose();
                }
                setLoading(false);
            });
        } catch (err) {
            toast({
                title: '❌ Something went wrong',
                status: 'error',
                render: ({ title, status }) => <Toast title={title} status={status} />,
            });
            setLoading(false);
        }
    };
    useEffect(() => {
        if (user) {
            setValue('mobile', user.mobile || '');
            setValue('college', { label: user.college?.name || '', value: user.college?.id || '' });
            setValue('name', user.name || '');
        }
    }, [setValue, user]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'full', lg: 'xl' }}>
            <ModalOverlay />
            <ModalContent
                border="none"
                borderRadius="10px"
                minWidth={{
                    base: 'full',
                    lg: 'container.md',
                }}
            >
                <ModalHeader
                    border="none"
                    minHeight="200px"
                    borderTopRadius="10px"
                    backgroundImage={`
                    linear-gradient(180deg, rgba(12, 15, 23, 100) 67.85%, #0C0F17 100%),
                    linear-gradient(180deg, #0C0F17 0%, rgba(12, 15, 23, 0.8) 100%),
                    url('images/codeBg.png') `}
                >
                    <ModalCloseButton
                        padding="15px"
                        color="rgba(226, 76, 75, 1)"
                        border="2px solid rgba(226, 76, 75, 1)"
                        borderRadius="full"
                    />
                </ModalHeader>
                <ModalBody backgroundColor="#0C0F17" borderBottomRadius="10px" border="none">
                    <Center flexDirection="column" marginBlockStart="-120px">
                        <Avatar
                            src={user?.avatar || 'images/userFallback.png'}
                            border="3px solid #DBF72C"
                            width="150px"
                            height="150px"
                        />
                        <Heading color="white" fontSize="40" fontFamily="Clash Display">
                            {user?.name}
                        </Heading>
                        <Text
                            color="rgba(233, 229, 225, 1)"
                            fontFamily="Clash Display"
                            fontSize="18px"
                            opacity="0.5"
                        >
                            {user?.email}
                        </Text>
                    </Center>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(updateProfile)}>
                            <Flex
                                marginTop="25px"
                                rowGap="30px"
                                flexDirection="column"
                                alignItems="stretch"
                            >
                                <FormControl isRequired label="Full Name" id="Name">
                                    <Input
                                        disabled={loading}
                                        placeholder="Full Name"
                                        variant="filled"
                                        height="45px"
                                        fontWeight="regular"
                                        transition="0.3s ease-in all"
                                        defaultValue={user?.mobile}
                                        fontSize="16px"
                                        backgroundColor="rgba(255,255,255,0.15)"
                                        textColor="white"
                                        fontFamily="Clash Display"
                                        border="none"
                                        borderRadius="10px"
                                        _placeholder={{
                                            textColor: 'rgba(255, 255, 255, 0.25)',
                                        }}
                                        _focus={{
                                            boxShadow: '0px 3px 8px rgba(219, 247, 44, 0.15)',
                                            border: '1px solid rgba(219, 247, 44, 0.15)',
                                        }}
                                        _hover={{
                                            backgroundColor: 'rgba(255,255,255,0.25)',
                                        }}
                                        {...register('name')}
                                    />
                                    <Text
                                        display={errors.name ? 'block' : 'none'}
                                        backgroundColor="rgba(226,76,75,0.4)"
                                        marginTop="15px"
                                        paddingInline="10px"
                                        borderRadius="5px"
                                        paddingBlock="5px"
                                        fontFamily="Clash Display"
                                        fontSize="12px"
                                        textColor="#E24C4B"
                                    >
                                        {errors.name?.message}
                                    </Text>
                                </FormControl>

                                <Flex
                                    flexDirection={{ base: 'column', lg: 'row' }}
                                    columnGap="25px"
                                    rowGap="25px"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <FormControl isRequired label="Mobile Number" id="Mobile">
                                        <Input
                                            disabled={loading}
                                            placeholder="Mobile Number"
                                            variant="filled"
                                            height="45px"
                                            fontWeight="regular"
                                            transition="0.3s ease-in all"
                                            defaultValue={user?.mobile}
                                            fontSize="16px"
                                            backgroundColor="rgba(255,255,255,0.15)"
                                            textColor="white"
                                            fontFamily="Clash Display"
                                            border="none"
                                            borderRadius="10px"
                                            _placeholder={{
                                                textColor: 'rgba(255, 255, 255, 0.25)',
                                            }}
                                            _focus={{
                                                boxShadow: '0px 3px 8px rgba(219, 247, 44, 0.15)',
                                                border: '1px solid rgba(219, 247, 44, 0.15)',
                                            }}
                                            _hover={{
                                                backgroundColor: 'rgba(255,255,255,0.25)',
                                            }}
                                            {...register('mobile')}
                                        />
                                        <Text
                                            display={errors.mobile ? 'block' : 'none'}
                                            backgroundColor="rgba(226,76,75,0.4)"
                                            marginTop="15px"
                                            paddingInline="10px"
                                            borderRadius="5px"
                                            paddingBlock="5px"
                                            fontFamily="Clash Display"
                                            fontSize="12px"
                                            textColor="#E24C4B"
                                        >
                                            {errors.mobile?.message}
                                        </Text>
                                    </FormControl>
                                    <Controller
                                        control={control}
                                        name="college"
                                        render={({ field, fieldState: { error: collegeErr } }) => (
                                            <FormControl
                                                label="College"
                                                isInvalid={!!collegeErr}
                                                id="College"
                                            >
                                                <AsyncSelect
                                                    placeholder="College"
                                                    isDisabled={loading}
                                                    {...field}
                                                    isClearable
                                                    defaultOptions
                                                    loadOptions={loadOptionsDebounced}
                                                    styles={{
                                                        ...selectStyle,
                                                    }}
                                                />
                                                {collegeErr && (
                                                    <FormErrorMessage>
                                                        Please pick an option
                                                    </FormErrorMessage>
                                                )}
                                            </FormControl>
                                        )}
                                    />
                                </Flex>

                                <Center paddingBlockEnd="30px">
                                    <Button
                                        isDisabled={loading}
                                        width="250px"
                                        backgroundColor="rgba(256, 256, 256, 0.15)"
                                        fontSize="18px"
                                        fontWeight="medium"
                                        textColor="rgba(255,255,255,0.5)"
                                        height="45px"
                                        transition=".5s all ease"
                                        _hover={{
                                            boxShadow: '0px 8px 16px rgba(255, 255, 255, 0.15)',
                                            backgroundColor: '#DBF72C',
                                            textColor: '#0C0F17',
                                        }}
                                        _active={{
                                            textColor: '#DBF72C',
                                            background: 'rgba(219, 247, 44, 0.15)',
                                            boxShadow: '0px 8px 16px rgba(219, 247, 44, 0.15)',
                                            backdropFilter: 'blur(25px)',
                                        }}
                                        _focus={{
                                            border: '1px solid rgba(219, 247, 44, 0.15)',
                                        }}
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </Center>
                            </Flex>
                        </form>
                    </FormProvider>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
