import React from 'react';
import { VStack } from '@chakra-ui/react';

const Layout = ({ children }: { children: React.ReactNode }) => (
    <VStack background="#2A1437" color="white">
        <VStack width={{ base: '100%', '2xl': '1368px' }}>{children}</VStack>
    </VStack>
);

export default Layout;
