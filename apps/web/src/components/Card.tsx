import { HStack, VStack, Text, Heading } from '@chakra-ui/react';
import React from 'react';

const Card = ({ num, heading, text }: CardProps) => (
    <HStack
        borderRadius="10px"
        padding="18px"
        background="rgba(255, 255, 255, 0.15)"
        maxWidth="400px"
        fontFamily="Clash Display"
        style={{
            backdropFilter: 'blur(25px)',
        }}
    >
        <Text
            position="absolute"
            fontSize="150px"
            zIndex={-1}
            background="#62684E"
            backgroundClip="text"
        >
            {num}
        </Text>
        <VStack alignItems="flex-start" zIndex={3}>
            <Heading fontSize="24px" textColor="#DBF72C">
                {heading}
            </Heading>
            <Text fontSize="18px" color="white">
                {text}
            </Text>
        </VStack>
    </HStack>
);

export default Card;

export interface CardProps {
    num: string;
    heading: string;
    text: string;
}
