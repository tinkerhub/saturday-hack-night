import { Heading, VStack, Text, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import physicalhack from '../../../assets/images/physicalHack.png';
import neon from '../../../assets/images/neon01.svg';

const What = () => (
    <>
        <Image top="500px" position="absolute" src={neon} right="0" zIndex="0" />
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
                        Saturday Hack Night is a bi weekly hackathon that provides a unique
                        opportunity for tech-savvy learners to expand their knowledge and explore
                        the latest technology-related concepts, including APIs and frameworks.
                    </Text>
                </VStack>
                <Image zIndex="1" height="100%" width="100%" src={physicalhack} />
            </Flex>
        </VStack>
    </>
);

export default What;
