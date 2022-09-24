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
        <Image width={{ base: '100px', lg: '150px' }} src={thLogo} alt="TinkerHub Logo" />
        <Text fontSize="16px">tinkerhub.org</Text>
    </HStack>
);

export default Footer;
