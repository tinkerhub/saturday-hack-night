import { VStack, Heading } from '@chakra-ui/react';
import React from 'react';
import { Accordion } from '../../components';

const faqs = [
    {
        question: 'What is Saturday Hacknight?',
        answer: 'Saturday Hack Night is bi-weekly hackathon that gives tech-savvy learners an opportunity to explore all the latest technology related concepts including APIs, frameworks and build some cool projects.',
    },
    {
        question: 'Who can Participate?',
        answer: 'Anyone who is interested in learning and building something new. You can be a student, a professional, or a hobbyist. All you need is a laptop and an internet connection.',
    },
    {
        question: 'What should be the team size?',
        answer: 'A Team should have minimum 2 Members & can be a maximum of 4 Member.',
    },
    {
        question: 'Is it Online?',
        answer: 'Yes. The first 5 hacknights will be conducted online & the 6th one will be conducted at TinkerSpace.',
    },
    {
        question: 'How do I participate in Offline HackNight?',
        answer: 'Physical HackNight is restricted to the teams who have submitted their projects in the Online HackNights.',
    },
    {
        question: 'What is the schedule of the program?',
        answer: ' The program will be conducted on every odd Saturday from 06:00 PM to 11:00 PM IST.',
    },
    {
        question: 'Still have questions?',
        answer: 'Feel free to reach out to us at hi@tinkerhub.org or in our Discord server.',
    },
];

const Faq = () => (
    <VStack
        width={{
            base: '100vw',
            xl: 'container.xl',
        }}
    >
        <Heading
            fontFamily="Clash Display"
            textColor="white"
            textAlign="left"
            width="100vw"
            paddingInline={{
                base: '18px',
                lg: '36px',
            }}
            fontSize="40px"
            marginBlockEnd="36px"
        >
            FREQUENTLY ASKED{' '}
            <span
                style={{
                    color: '#DBF72C',
                }}
            >
                QUESTIONS 💬
            </span>
        </Heading>
        <Accordion content={faqs} />
    </VStack>
);
export default Faq;
