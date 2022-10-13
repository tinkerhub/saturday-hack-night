import { HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';

import thLogo from '../../assets/TH.svg';

const Footer = () => (
    <HStack
        width="95%"
        paddingInline="5px"
        paddingBlock="18px"
        marginBlockStart="18px"
        justifyContent="space-between"
    >
        <Image width="85px" src={thLogo} alt="TinkerHub Logo" />
        <Text fontSize="24px" fontWeight="bold" fontFamily="Clash Display" textColor="white">
            tinkerhub.org
        </Text>
    </HStack>
);

export default Footer;
