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
import logo from '../../assets/logo.svg';

import { useFirebase } from '../context/firebase';

const Navbar = () => {
    const { auth } = useFirebase();
    const [user, setUser] = useState<User | null>();

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
        <Flex
            paddingBlock="16px"
            as="nav"
            fontFamily="Clash Display"
            position="fixed"
            justifyContent="space-between"
            paddingInline={{ base: 2, md: 5 }}
            width="full"
            alignItems="center"
            style={{
                backdropFilter: 'blur(10px)',
            }}
        >
            <Image src={logo} height="32px" transition="all 0.2s ease-in-out" />
            <HStack spacing="32px">
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
                <HStack>
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
                        <Button onClick={login}>LOGIN</Button>
                    )}
                </HStack>
            </HStack>
        </Flex>
    );
};
export default Navbar;
