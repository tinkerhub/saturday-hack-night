import { VStack, Heading } from '@chakra-ui/react';
import React from 'react';
import { Accordion } from '../../components';

const faqs = [
    {
        question: 'What is Saturday Hacknight?',
        answer: 'Saturday Hack Night is a biweekly hackathon organized by TinkerHub. The focus of the event is to provide learners the opportunity to explore a unique API and build exciting projects. TinkerHub will provide any credits or mentorship needed while you only have to think of one thing, Build!',
        color: '#FC6565',
    },
    {
        question: 'Who can Participate?',
        answer: 'Anyone who is interested in learning and building something new. You can be a student, a professional, or a hobbyist. All you need is a laptop and an internet connection.',
        color: '#527D77',
    },
    {
        question: 'What should be the team size?',
        answer: 'You can work individually or in a team of 2-3 members.',
        color: '#FFCE51',
    },
    {
        question: 'What is the schedule of the program?',
        answer: ' The program will be conducted on every odd Saturday from 06:00 PM to 11:00 PM IST.',
        color: '#AD78FF',
    },
    {
        question: 'Still have questions?',
        answer: 'Feel free to reach out to us at hi@tinkerhub.org or in our Discord server.',
        color: '#FF781E',
    },
];

const Faq = () => (
    <VStack maxWidth={{ base: '100%', lg: 'container.lg' }}>
        <Heading
            fontWeight="700"
            color="#000000"
            textAlign="center"
            marginBlock="20px"
            letterSpacing="4px"
            fontSize={{
                base: '2rem',
                md: '3.5rem',
            }}
            textShadow="2px 2px #fff, 2px -2px #fff, -2px 2px #fff, -2px -2px #fff
                    ,3px 3px #951BF4, 3px -3px #951BF4, -3px 3px #951BF4, -3px -3px #951BF4"
        >
            FAQ
        </Heading>
        <Accordion content={faqs} />
    </VStack>
);
export default Faq;
