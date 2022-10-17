import { HStack, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';

import thLogo from '../../assets/TH.svg';

const Footer = () => (
    <HStack
        width="100vw"
        paddingInline={{
            base: '18px',
            lg: '36px',
        }}
        paddingBlock="18px"
        justifyContent="space-between"
    >
        <Image width="85px" src={thLogo} alt="TinkerHub Logo" />
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

export default Footer;
