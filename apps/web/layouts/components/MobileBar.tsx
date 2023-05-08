import { Center, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Handler {
    closeModal: () => void;
}

export const MobileBar = ({ closeModal }: Handler) => {
    const router = useRouter();
    const items = [
        {
            name: 'HOME',
            path: '/',
        },
        {
            name: 'LEADERBOARD',
            path: 'leaderboard',
        },
        {
            name: 'EVENTS',
            path: 'events',
        },
    ];

    const navList = {
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.07,
            },
        },
        hidden: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
    };

    const navItem = {
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100 },
            },
        },
        hidden: {
            y: 50,
            opacity: 0,
            transition: {
                y: { stiffness: 1000, velocity: -100 },
            },
        },
    };

    return (
        <Center bg="#0c0f17" h="100vh" zIndex="2" position="fixed" w="100%">
            <Center
                mt="100px"
                zIndex="100"
                h="400px"
                w="400px"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
            >
                <motion.ul
                    className="navList"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={navList}
                >
                    {items.map(({ name, path }) => (
                        <motion.li style={{ listStyle: 'none' }} variants={navItem} key={name}>
                            <Link href={path} onClick={closeModal}>
                                <Text
                                    fontSize="45px"
                                    color={router.pathname === path ? '#DBF72C' : 'white'}
                                    _hover={{ color: '#DBF72C', cursor: 'pointer' }}
                                    fontFamily="Clash Display"
                                >
                                    {name}
                                </Text>
                            </Link>
                        </motion.li>
                    ))}
                </motion.ul>
            </Center>
        </Center>
    );
};
