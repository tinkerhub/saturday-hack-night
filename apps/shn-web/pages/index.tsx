import { Button, Container, Heading, Text, VStack, Image, Flex, Grid } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { Card, ParallaxView, Accordion } from '@app/components';
import { useAuth } from '@app/hooks';
import { BaseLayout } from '@app/layouts';
import { NextPageWithLayout } from '@app/pages/_app';

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
        answer: 'You can work individually or in a team of 1-3 members.',
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

const Home: NextPageWithLayout = () => {
    const { user, login } = useAuth();
    const router = useRouter();
    return (
        <>
            <VStack
                marginTop="72px"
                rowGap="20px"
                width="100vw"
                fontFamily="Clash Display"
                backgroundImage={`
                linear-gradient(180deg, rgba(12, 15, 23, 0) 67.85%, #0C0F17 100%),
                linear-gradient(180deg, #0C0F17 0%, rgba(12, 15, 23, 0.8) 100%),
                url('/images/codeBg.png') `}
            >
                <Heading
                    fontSize={{ base: '48px', lg: '100px' }}
                    fontWeight="bold"
                    fontFamily="Clash Display"
                    textAlign="center"
                    textColor="white"
                >
                    SATURDAY
                    <br />
                    <span style={{ color: '#DBF72C' }}>HACKNIGHT</span>
                </Heading>
                <Container maxW="720px">
                    <Text
                        textAlign="center"
                        textColor="#E9E5E1"
                        fontSize={{
                            base: '18px',
                            lg: '24px',
                        }}
                    >
                        It’s a bi weekly hackathon that gives tech-savvy learners an oppurtunity to
                        explore all the latest technology related concepts including APIs,
                        frameworks and build some cool projects.
                    </Text>
                </Container>
                <Button
                    width="250px"
                    backgroundColor="white"
                    fontSize="18px"
                    fontWeight="medium"
                    height="45px"
                    transition=".5s all ease"
                    _hover={{
                        boxShadow: '0px 8px 16px rgba(255, 255, 255, 0.15)',
                        backgroundColor: '#DBF72C',
                    }}
                    _active={{
                        textColor: '#DBF72C',
                        background: 'rgba(219, 247, 44, 0.15)',
                        boxShadow: '0px 8px 16px rgba(219, 247, 44, 0.15)',
                        backdropFilter: 'blur(25px)',
                    }}
                    onClick={() => {
                        if (user) {
                            router.push('/events');
                        } else {
                            login();
                        }
                    }}
                >
                    REGISTER NOW
                </Button>
            </VStack>
            <Image top="500px" position="absolute" src="/images/neon01.svg" right="0" zIndex="0" />
            <VStack
                marginTop="36px"
                paddingInline={{ base: '18px', lg: '36px' }}
                fontFamily="Clash Display"
                width={{
                    base: '100vw',
                    xl: 'container.xl',
                }}
                alignItems="flex-start"
            >
                <Flex
                    alignItems="flex-start"
                    flexDirection={{
                        base: 'column-reverse',
                        lg: 'row',
                    }}
                >
                    <VStack
                        alignItems="flex-start"
                        justifyContent="center"
                        minHeight={{ base: '0px', md: '450px' }}
                    >
                        <Heading
                            fontFamily="Clash Display"
                            textColor="white"
                            fontSize="40px"
                            textAlign="left"
                            zIndex="1"
                        >
                            WHAT IS{' '}
                            <span
                                style={{
                                    color: '#DBF72C',
                                }}
                            >
                                SATURDAY HACKNIGHT &nbsp;
                            </span>
                            ?
                        </Heading>
                        <Text
                            fontSize={{ base: '18px', lg: '24px' }}
                            textColor="white"
                            marginBlock="18px"
                        >
                            Saturday Hack Night is a bi weekly hackathon that gives tech-savvy
                            learners an oppurtunity to explore all the latest technology related
                            concepts including APIs, frameworks and build some cool projects.
                        </Text>
                    </VStack>
                    <Image zIndex="1" height="100%" width="100%" src="/images/physicalHack.png" />
                </Flex>
            </VStack>
            <Flex
                marginBlock="28px"
                columnGap={{
                    lg: '50px',
                    xl: '100px',
                }}
                justifyContent="center"
                alignItems="center"
                rowGap="25px"
                flexDirection={{ base: 'column', lg: 'row' }}
            >
                <VStack spacing="36px">
                    <Heading fontFamily="Clash Display" textColor="#DBF72C" fontSize="80px">
                        1000+
                    </Heading>
                    <Text
                        textColor="white"
                        fontFamily="Clash Display"
                        fontSize="24px"
                        style={{
                            marginTop: '0px',
                        }}
                    >
                        Participants
                    </Text>
                </VStack>
                <VStack>
                    <Heading fontFamily="Clash Display" textColor="#DBF72C" fontSize="80px">
                        200+
                    </Heading>
                    <Text
                        textColor="white"
                        fontFamily="Clash Display"
                        fontSize="24px"
                        style={{
                            marginTop: '0px',
                        }}
                    >
                        Projects
                    </Text>
                </VStack>
                <VStack>
                    <Heading fontFamily="Clash Display" textColor="#DBF72C" fontSize="80px">
                        13+
                    </Heading>
                    <Text
                        textColor="white"
                        fontFamily="Clash Display"
                        fontSize="24px"
                        style={{
                            marginTop: '0px',
                        }}
                    >
                        HackNights
                    </Text>
                </VStack>
                <VStack>
                    <Heading fontFamily="Clash Display" textColor="#DBF72C" fontSize="80px">
                        01
                    </Heading>
                    <Text
                        textColor="white"
                        fontFamily="Clash Display"
                        fontSize="24px"
                        whiteSpace="nowrap"
                        textAlign="center"
                        style={{
                            marginTop: '0px',
                        }}
                    >
                        Physical HackNight
                    </Text>
                </VStack>
            </Flex>
            <VStack
                width={{
                    base: '100vw',
                    xl: 'container.xl',
                }}
                paddingInline={{ base: '18px', lg: '36px' }}
                backgroundImage={`linear-gradient(180deg, rgba(12, 15, 23, 0.2) 67.85%, #0C0F17 100%), linear-gradient(180deg, #0C0F17 0%, rgba(12, 15, 23, 0.4) 100%), url('/images/codeClub.png');`}
            >
                <Heading
                    textColor="white"
                    textAlign="left"
                    fontSize="40px"
                    width="100%"
                    paddingInline={{
                        base: '18px',
                        lg: '36px',
                    }}
                    paddingBlockStart={{
                        base: '18px',
                        lg: '48px',
                    }}
                    fontFamily="Clash Display"
                >
                    HOW TO <span style={{ color: '#DBF72C' }}>REGISTER?</span>
                </Heading>
                <Grid
                    templateColumns={{
                        base: 'repeat(1, 1fr)',
                        md: 'repeat(2, 1fr)',
                    }}
                    gap={{
                        base: '18px',
                        lg: '48x',
                    }}
                    paddingBlock={{
                        base: '18px',
                        lg: '36px',
                    }}
                >
                    <Card
                        num="1"
                        heading="Create a Repo"
                        text="Create a repo & initialize it with ReadMe"
                    />
                    <Card
                        num="2"
                        heading="Create a Team"
                        text="Create a team of 1-3 members and register for HackNight"
                    />
                    <Card
                        num="3"
                        heading="Discuss Ideas"
                        text="Discuss and finalize the project idea and building process"
                    />
                    <Card
                        num="4"
                        heading="Build it"
                        text="Build it together at Saturday Hack Night"
                    />
                </Grid>
            </VStack>
            <VStack alignItems="flex-start" marginBlock="32px">
                <Heading
                    fontFamily="Clash Display"
                    textColor="white"
                    textAlign="left"
                    width="100vw"
                    paddingInline={{ base: '18px', lg: '36px' }}
                    fontSize="40px"
                >
                    HEAR FROM{' '}
                    <span
                        style={{
                            color: '#DBF72C',
                        }}
                    >
                        PEOPLE 🔊
                    </span>
                </Heading>
                <VStack>
                    <ParallaxView
                        text="A bi-weekly hackathon that gives tech-savvy learners an opportunity to explore all the latest technology related concepts including APIs, frameworks and build some cool projects."
                        duration={10}
                    />
                    <ParallaxView
                        text="You. Are you passionate about tech? Do you like to build something unique? Are you that curious cat who loves to explore uncharted territory? Then this is your opportunity."
                        duration={15}
                    />
                    <ParallaxView
                        text="Saturday evening 6 PM to 11 PM every odd saturday you will be able to take part in the program. Yes it is a recurring event and yes, you are welcome every time."
                        duration={20}
                    />
                </VStack>
            </VStack>
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
        </>
    );
};
Home.getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>;

export default Home;
