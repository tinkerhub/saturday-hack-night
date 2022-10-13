import { VStack, Heading } from '@chakra-ui/react';
import React from 'react';
import { Card } from '../../components';

const How = () => (
    <VStack width="100vw">
        <Heading textColor="white" textAlign="left" width="100vw" paddingInline="36px">
            HOW TO <span style={{ color: '#DBF72C' }}>REGISTER?</span>
        </Heading>
        <Card num="1" heading="Create a Repo" text="Create a repo & initialize it with ReadMe" />
    </VStack>
);
export default How;
