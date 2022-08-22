import React from 'react';
import { VStack } from '@chakra-ui/react';

const Layout = ({ children }: { children: React.ReactNode }) => (
    <VStack background="#2A1437" color="white">
        {children}
    </VStack>
);

export default Layout;
