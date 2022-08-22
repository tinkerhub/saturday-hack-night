import { HStack, VStack, Text, Avatar } from '@chakra-ui/react';
import React from 'react';

const Chat = ({ profileUrl, name, org, message }: ChatProps) => (
    <VStack width={{ base: '350px', sm: '460px' }}>
        <HStack
            marginInlineStart={{ base: '-50px', sm: '-150px' }}
            zIndex="1"
            background="#E2DAD4"
            borderRadius="26px"
            paddingInlineEnd="15px"
            border="1px solid #000"
        >
            <Avatar width="50px" height="50px" src={profileUrl} />
            <VStack>
                <Text color="#000" fontWeight="600" fontSize="18px">
                    {name}
                    <br />
                    {org}
                </Text>
            </VStack>
        </HStack>
        <Text
            zIndex="0"
            position="relative"
            top="-30px"
            color="#000"
            borderRadius="21px"
            fontSize="20px"
            border="1px solid #000"
            paddingInline="18px"
            paddingBlock="25px"
            backgroundColor="#E2DAD4"
        >
            {message}
        </Text>
    </VStack>
);
export default Chat;

export interface ChatProps {
    profileUrl: string;
    name: string;
    org: string;
    message: string;
}
