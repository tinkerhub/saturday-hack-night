import React from 'react';
import {
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Accordion as ChakraAccordion,
    Box,
} from '@chakra-ui/react';

const Accordion = ({ content }: AccordionProps) => (
    <ChakraAccordion>
        {content.map((item) => (
            <AccordionItem
                borderRadius="8px"
                background={item.color}
                width={{ base: 'full', lg: 'container.lg' }}
                marginBlock="10px"
                textColor="#fff"
                padding="15px"
            >
                <AccordionButton>
                    <Box flex="1" textAlign="left" fontSize="18px">
                        {item.question}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel fontSize="16px" pb={4}>
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
        color: string;
    }[];
}
