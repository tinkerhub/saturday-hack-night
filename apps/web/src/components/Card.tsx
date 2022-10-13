import { HStack, VStack, Text } from '@chakra-ui/react';
import React from 'react';

const Card = ({ num, heading, text }: CardProps) => (
    <HStack
        background="rgba(255, 255, 255, 0.15)"
        borderRadius="10px"
        padding="24px"
        style={{
            backdropFilter: 'blur(25px)',
        }}
    >
        <Text>{num}</Text>
        <VStack>
            <Text>{heading}</Text>
            <Text>{text}</Text>
        </VStack>
    </HStack>
);

export default Card;

export interface CardProps {
    num: string;
    heading: string;
    text: string;
}
