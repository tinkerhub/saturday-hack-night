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
    <ChakraAccordion
        style={{
            marginInline: '9px',
        }}
    >
        {content.map((item) => (
            <AccordionItem
                borderRadius="10px"
                fontFamily="Clash Display"
                marginBlock="9px"
                key={item.question}
                transition="all 0.2s ease-in"
                width={{
                    base: '100%',
                    xl: 'container.xl',
                }}
                border="1px solid #0C0F17"
                textColor="white"
                _hover={{
                    color: '#DBF72C',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid #DBF72C',
                }}
            >
                <AccordionButton>
                    <Text
                        flex="1"
                        textAlign="left"
                        fontSize={{ base: '24px', lg: '36px' }}
                        fontWeight="bold"
                    >
                        {item.question}
                    </Text>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel
                    fontSize={{
                        base: '18px',
                        lg: '22px',
                    }}
                >
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
