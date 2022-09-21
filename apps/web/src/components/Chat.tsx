import { HStack, VStack, Text, Avatar } from '@chakra-ui/react';
import React from 'react';

const Chat = ({ profileUrl, name, org, message, color }: ChatProps) => (
    <VStack width={{ base: '350px', sm: '460px' }}>
        <HStack
            marginInlineStart={{ base: '-50px', sm: '-150px' }}
            zIndex="1"
            background={color}
            borderRadius="26px"
            paddingInlineEnd="15px"
            border="1px solid #000"
        >
            <Avatar size="lg" src={profileUrl} />
            <VStack alignItems="flex-start">
                <Text color="#fff" fontWeight="600" fontSize="18px">
                    {name}
                </Text>
                <Text
                    color="#eeeeee"
                    fontWeight="400"
                    fontSize="16px"
                    style={{
                        marginBlockStart: '0px',
                    }}
                >
                    {org}
                </Text>
            </VStack>
        </HStack>
        <Text
            zIndex="0"
            position="relative"
            top="-30px"
            color="#fff"
            borderRadius="21px"
            fontSize="16px"
            border="1px solid #000"
            paddingInline="18px"
            paddingBlockStart="20px"
            paddingBlockEnd="10px"
            background={color}
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
    color: string;
}
