import React, { useCallback, useEffect, useState } from 'react';
import {
    Flex,
    HStack,
    VStack,
    Text,
    Image,
    Avatar,
    Button,
    Box,
    useDisclosure,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import {
    GithubAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
    User,
} from 'firebase/auth';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { MobileBar } from './MobileBar';
import logo from '../../assets/images/logo.svg';
import logoHover from '../../assets/images/logo_hover.svg';
import userFallback from '../../assets/images/userFallback.png';

import { useFirebase } from '../context/firebase';
import { ProfileModal } from '../modal';

const Navbar = () => {
    const { auth } = useFirebase();
    const [user, setUser] = useState<User | null>();
    const [showMenu, setShowMenu] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const imageRef = React.useRef<HTMLImageElement>(null);
    const handleWindowResize = useCallback(() => {
        if (window.innerWidth > 991) {
            setShowMenu(false);
        }
    }, []);

    const closeModal = () => {
        setShowMenu(false);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [handleWindowResize]);
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
        <Box>
            <ProfileModal isOpen={isOpen} onClose={onClose} />
            <VStack
                paddingBlock="16px"
                as="nav"
                fontFamily="Clash Display"
                position="fixed"
                width="100vw"
                alignItems="stretch"
                paddingInline={{ base: '16px', md: '32px' }}
                zIndex="3"
                backgroundColor="rgba(13,16,24,0.75)"
                style={{
                    backdropFilter: 'blur(10px)',
                }}
            >
                <Flex alignItems="center" justifyContent="space-between">
                    <NavLink to="/">
                        <Image
                            src={logo}
                            height="32px"
                            transition="all 0.4s ease-in"
                            ref={imageRef}
                            onMouseOver={() => {
                                imageRef.current!.src = logoHover;
                            }}
                            onMouseOut={() => {
                                imageRef.current!.src = logo;
                            }}
                        />
                    </NavLink>
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
                                    _hover={{ cursor: 'pointer' }}
                                    as="span"
                                    fontSize="14px"
                                    color="#DBF72C"
                                    fontWeight="medium"
                                    style={{
                                        marginTop: '0px',
                                    }}
                                    onClick={onOpen}
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

                        {!showMenu ? (
                            <HamburgerIcon
                                _hover={{ cursor: 'pointer' }}
                                color="white"
                                display={{ base: 'block', lg: 'none' }}
                                height="35px"
                                width="35px"
                                onClick={() => {
                                    setShowMenu(!showMenu);
                                }}
                            />
                        ) : (
                            <CloseIcon
                                _hover={{ cursor: 'pointer' }}
                                color="white"
                                display={{ base: 'block', lg: 'none' }}
                                height="25px"
                                width="35px"
                                onClick={() => {
                                    setShowMenu(!showMenu);
                                }}
                            />
                        )}
                    </HStack>
                    <Flex
                        columnGap="30px"
                        display={{ base: 'none', lg: 'flex' }}
                        flexDirection="row"
                        alignItems="center"
                    >
                        <NavLink
                            to="/"
                            style={({ isActive }) =>
                                isActive
                                    ? {
                                          color: '#DBF72C',
                                      }
                                    : {
                                          color: 'white',
                                      }
                            }
                        >
                            <Text
                                as="span"
                                fontSize="18px"
                                transition="all 0.2s  ease-in-out"
                                _hover={{
                                    color: '#DBF72C',
                                }}
                            >
                                HOME
                            </Text>
                        </NavLink>
                        <NavLink
                            to="/events"
                            style={({ isActive }) =>
                                isActive
                                    ? {
                                          color: '#DBF72C',
                                      }
                                    : {
                                          color: 'white',
                                      }
                            }
                        >
                            <Text
                                as="span"
                                fontSize="18px"
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
                                        src={user.photoURL || userFallback}
                                        border="2px solid #DBF72C"
                                        onClick={logout}
                                    />
                                    <VStack alignItems="flex-start">
                                        <Text
                                            as="span"
                                            fontSize="16px"
                                            fontWeight="bold"
                                            color="white"
                                        >
                                            {user.displayName}
                                        </Text>
                                        <Text
                                            _hover={{ cursor: 'pointer' }}
                                            as="span"
                                            fontSize="14px"
                                            color="#DBF72C"
                                            fontWeight="medium"
                                            style={{
                                                marginTop: '0px',
                                            }}
                                            onClick={onOpen}
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
            {showMenu && <MobileBar closeModal={closeModal} />}
        </Box>
    );
};
export default Navbar;
