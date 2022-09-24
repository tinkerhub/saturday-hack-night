import { Heading, Text, Image, VStack, Button, Flex } from '@chakra-ui/react';
import React from 'react';

const EventCard = ({ image, title, description }: EventCardProps) => (
    <Flex
        flexDirection="column"
        bg="#5B9E7D"
        textColor="#fff"
        width="300px"
        borderRadius="8px"
        minHeight="320px"
    >
        <Image
            objectFit="cover"
            width="300px"
            height="150px"
            borderRadius="8px 8px 0 0 "
            src={image}
        />
        <VStack alignItems="flex-start" marginInline="10px" marginBlock="5px" flexGrow="1">
            <Heading>{title}</Heading>
            <Text fontSize="16px">{description}</Text>
        </VStack>
        <Flex marginInline="10px" marginBlockEnd="5px" marginTop="auto" justifyContent="flex-end">
            <Button>Register</Button>
        </Flex>
    </Flex>
);

interface EventCardProps {
    title: string;
    image: string;
    description: string;
}
export default EventCard;
