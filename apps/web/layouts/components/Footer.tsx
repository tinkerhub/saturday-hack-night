import { HStack, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';

const Footer = () => (
    <HStack
        backgroundColor="#0C0F17"
        width="100vw"
        paddingInline={{
            base: '18px',
            lg: '36px',
        }}
        paddingBlock="18px"
        justifyContent="space-between"
    >
        <Image width="85px" src="images/TH.svg" alt="TinkerHub Logo" />
        <Link
            href="https://tinkerhub.org"
            _hover={{
                textDecoration: 'none',
            }}
        >
            <Text
                fontSize={{
                    base: '12px',
                    lg: '24px',
                }}
                fontWeight="bold"
                fontFamily="Clash Display"
                textColor="white"
            >
                tinkerhub.org
            </Text>
        </Link>
    </HStack>
);

export { Footer };
