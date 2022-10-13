import { VStack, Heading } from '@chakra-ui/react';
import React from 'react';
import { Accordion } from '../../components';

const faqs = [
    {
        question: 'What is Saturday Hacknight?',
        answer: 'Saturday Hack Night is a biweekly hackathon organized by TinkerHub. The focus of the event is to provide learners the opportunity to explore a unique API and build exciting projects. TinkerHub will provide any credits or mentorship needed while you only have to think of one thing, Build!',
    },
    {
        question: 'Who can Participate?',
        answer: 'Anyone who is interested in learning and building something new. You can be a student, a professional, or a hobbyist. All you need is a laptop and an internet connection.',
    },
    {
        question: 'What should be the team size?',
        answer: 'You can work individually or in a team of 2-4 members.',
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
    <VStack width="100vw">
        <Heading
            fontFamily="Clash Display"
            textColor="white"
            textAlign="left"
            width="100vw"
            paddingInline="36px"
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
