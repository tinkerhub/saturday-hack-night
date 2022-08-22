import { HStack, VStack, Text } from '@chakra-ui/react';
import React from 'react';

const Card = ({ num, heading, text }: CardProps) => (
    <HStack
        height="150px"
        width="350px"
        padding="18px"
        border="1px solid #FFE3D3"
        color="#2A1437"
        background="#FFE3D3"
        borderRadius="21px"
        _hover={{
            background: '#2A1437',
            color: '#FFE3D3',
            border: '1px solid #FFE3D3',
        }}
    >
        <Text
            fontWeight="500"
            fontSize="20px"
            borderRadius="50%"
            border="1.5px solid #2A1437"
            paddingInline="8px"
            paddingBlock="3px"
            _groupHover={{
                border: '1px solid #2A1437',
            }}
        >
            {num}
        </Text>
        <VStack paddingInlineStart="15" alignItems="flex-start">
            <Text fontSize="22px" fontWeight="500">
                {heading}
            </Text>
            <Text fontSize="20px">{text}</Text>
        </VStack>
    </HStack>
);

export default Card;

export interface CardProps {
    num: string;
    heading: string;
    text: string;
}
