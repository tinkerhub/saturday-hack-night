import React, { useEffect, useState } from 'react';
import { Flex, HStack, Box } from '@chakra-ui/layout';
import { NavLink } from 'react-router-dom';
import { Avatar } from '@chakra-ui/react';
import {
    GithubAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
    User,
} from 'firebase/auth';
import { useFirebase } from '../firebase';

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
            as="nav"
            position="absolute"
            marginBlockStart="4"
            fontFamily="Poppins"
            background="#E2DAD4"
            width="95%"
            color="#000"
            justifyContent="space-between"
            paddingInline={{ base: 2, md: 5 }}
            alignItems="center"
            fontSize="18px"
            borderRadius="15px"
        >
            <HStack spacing={{ base: '2', sm: '5' }} paddingBlock="24px">
                <NavLink to="/">HOME</NavLink>
                <NavLink to="/">EVENTS</NavLink>
                <NavLink to="/">LEADERBOARD</NavLink>
                <Box display={{ base: 'none', md: 'block' }}>
                    <NavLink to="/">DASHBOARD</NavLink>
                </Box>
            </HStack>
            {user ? (
                <Avatar src={user.photoURL!} name={user.displayName!} onClick={logout} />
            ) : (
                <Box onClick={login}>LOGIN</Box>
            )}
        </Flex>
    );
};
export default Navbar;
