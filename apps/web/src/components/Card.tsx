import { HStack, VStack, Text } from '@chakra-ui/react';
import React from 'react';

const Card = ({ num, heading, text, color }: CardProps) => (
    <HStack
        height="150px"
        width="350px"
        padding="18px"
        border="1px solid #000"
        color="#fff"
        background={color}
        borderRadius="8px"
        transition="all 0.3s ease-in"
        _hover={{
            border: '1px solid #EADADA',
        }}
    >
        <Text
            fontWeight="500"
            fontSize="20px"
            borderRadius="50%"
            border="1.5px solid #000"
            paddingInline="8px"
            paddingBlock="3px"
        >
            {num}
        </Text>
        <VStack paddingInlineStart="15" alignItems="flex-start">
            <Text fontSize="24px" fontWeight="500">
                {heading}
            </Text>
            <Text fontSize="16px">{text}</Text>
        </VStack>
    </HStack>
);

export default Card;

export interface CardProps {
    num: string;
    heading: string;
    text: string;
    color: string;
}
