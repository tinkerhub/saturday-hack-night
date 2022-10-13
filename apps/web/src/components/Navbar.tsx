import React, { useEffect, useState } from 'react';
import { Flex, HStack, VStack, Text, Image, Avatar, Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import {
    GithubAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
    User,
} from 'firebase/auth';
import { HamburgerIcon } from '@chakra-ui/icons';
import logo from '../../assets/logo.svg';

import { useFirebase } from '../context/firebase';

const Navbar = () => {
    const { auth } = useFirebase();
    const [user, setUser] = useState<User | null>();
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
        });
    }, [auth]);

    const login = () => {
        signInWithPopup(auth, new GithubAuthProvider());
    };
    const logout = () => {
        signOut(auth);
    };

    return (
        <VStack
            paddingBlock="16px"
            as="nav"
            fontFamily="Clash Display"
            position="fixed"
            width="100vw"
            alignItems="stretch"
            paddingInline={{ base: '16px', md: '32px' }}
            zIndex="3"
            style={{
                backdropFilter: 'blur(10px)',
            }}
        >
            <Flex alignItems="center" justifyContent="space-between">
                <Image src={logo} height="32px" transition="all 0.2s ease-in-out" />
                <HStack
                    gap="18px"
                    display={{
                        base: 'flex',
                        lg: 'none',
                    }}
                >
                    {user ? (
                        <VStack alignItems="flex-end">
                            <Text as="span" fontSize="16px" fontWeight="bold" color="white">
                                {user.displayName}
                            </Text>
                            <Text
                                as="span"
                                fontSize="14px"
                                color="#DBF72C"
                                fontWeight="medium"
                                style={{
                                    marginTop: '0px',
                                }}
                            >
                                view profile
                            </Text>
                        </VStack>
                    ) : (
                        <Button
                            display={{ base: 'block', lg: 'none' }}
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
                            onClick={login}
                        >
                            LOGIN
                        </Button>
                    )}
                    <HamburgerIcon
                        color="white"
                        display={{ base: 'block', lg: 'none' }}
                        height="35px"
                        width="35px"
                        onClick={() => {
                            setShowMenu(!showMenu);
                        }}
                    />
                </HStack>
                <Flex
                    columnGap="30px"
                    display={{ base: 'none', lg: 'flex' }}
                    flexDirection="row"
                    alignItems="center"
                >
                    <NavLink to="/">
                        <Text
                            as="span"
                            fontSize="18px"
                            color="white"
                            transition="all 0.2s  ease-in-out"
                            _hover={{
                                color: '#DBF72C',
                            }}
                        >
                            HOME
                        </Text>
                    </NavLink>
                    <NavLink to="/events">
                        <Text
                            as="span"
                            fontSize="18px"
                            color="white"
                            transition="all 0.2s  ease-in-out"
                            _hover={{
                                color: '#DBF72C',
                            }}
                        >
                            EVENT
                        </Text>
                    </NavLink>
                    <HStack
                        display={{
                            base: 'none',
                            lg: 'flex',
                        }}
                    >
                        {user ? (
                            <HStack>
                                <Avatar
                                    src={user.photoURL!}
                                    border="2px solid #DBF72C"
                                    onClick={logout}
                                />
                                <VStack alignItems="flex-start">
                                    <Text as="span" fontSize="16px" fontWeight="bold" color="white">
                                        {user.displayName}
                                    </Text>
                                    <Text
                                        as="span"
                                        fontSize="14px"
                                        color="#DBF72C"
                                        fontWeight="medium"
                                        style={{
                                            marginTop: '0px',
                                        }}
                                    >
                                        view profile
                                    </Text>
                                </VStack>
                            </HStack>
                        ) : (
                            <Button
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
                                onClick={login}
                            >
                                LOGIN
                            </Button>
                        )}
                    </HStack>
                </Flex>
            </Flex>
        </VStack>
    );
};
export default Navbar;
