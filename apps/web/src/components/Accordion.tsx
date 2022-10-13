import React from 'react';
import {
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Accordion as ChakraAccordion,
    Text,
} from '@chakra-ui/react';

const Accordion = ({ content }: AccordionProps) => (
    <ChakraAccordion>
        {content.map((item) => (
            <AccordionItem
                borderRadius="10px"
                width={{ base: 'full', lg: 'container.lg' }}
                fontFamily="Clash Display"
                border="1px solid #0C0F17"
                textColor="white"
                padding="15px"
                _hover={{
                    color: '#DBF72C',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid #DBF72C',
                }}
            >
                <AccordionButton>
                    <Text flex="1" textAlign="left" fontSize="32px" fontWeight="bold">
                        {item.question}
                    </Text>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel fontSize="24px" pb={4}>
                    {item.answer}
                </AccordionPanel>
            </AccordionItem>
        ))}
    </ChakraAccordion>
);
export default Accordion;

interface AccordionProps {
    content: {
        question: string;
        answer: string;
    }[];
}
