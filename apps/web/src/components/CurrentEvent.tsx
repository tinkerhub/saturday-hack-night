import { CalendarIcon } from '@chakra-ui/icons';
import { Flex, HStack, VStack, Image, Text, Box, Heading, Button } from '@chakra-ui/react';
import React from 'react';
import airTable from '../../assets/Airtable.png';
import circleIcon from '../../assets/circle.svg';

const CurrentEvent = () => (
    <Flex
        width="100%"
        flexDirection={{
            base: 'column',
            md: 'row',
        }}
        paddingInline={{ base: '16px', md: '32px' }}
        rowGap="16px"
        paddingBlockStart="18px"
        justifyContent="space-between"
    >
        <VStack
            minWidth="55%"
            borderRadius="10px"
            rowGap="32px"
            background="rgba(255, 255, 255, 0.15);"
            style={{
                backdropFilter: 'blur(10px)',
            }}
        >
            <HStack
                fontFamily="Clash Display"
                width="100%"
                justifyContent="space-between"
                padding="16px"
            >
                <HStack textColor="white">
                    <CalendarIcon height="15px" width="15px" />
                    <Text fontSize="12px">15th March 2021</Text>
                </HStack>
                <HStack
                    paddingBlock="5px"
                    paddingInline="10px"
                    borderRadius="10px"
                    alignItems="center"
                    backgroundColor="rgba(255,255,255,.15)"
                >
                    <Image width="15px" height="15px" src={circleIcon} />
                    <Text fontSize="12px" textColor="#DBF72C">
                        15 Teams Registered
                    </Text>
                </HStack>
            </HStack>
            <Image src={airTable} objectFit="contain" flexGrow="1" paddingInline="8px" />
            <Box
                width="100%"
                backgroundColor="#DBF72C"
                borderBottomStartRadius="10px"
                padding="5px"
                borderBottomEndRadius="10px"
            >
                <Text
                    fontSize="18px"
                    fontWeight="medium"
                    textColor="#0C0F17"
                    textAlign="center"
                    fontFamily="Clash Display"
                >
                    Registered 🎉
                </Text>
            </Box>
        </VStack>
        <VStack
            width="100%"
            alignItems="flex-start"
            paddingInlineStart={{ base: '0px', md: '16px' }}
        >
            <Heading textAlign="left" textColor="white" fontFamily="Clash Display" fontSize="40px">
                Airtable API
            </Heading>
            <Text fontSize="18px" fontFamily="Clash Display" textColor="white" flexGrow="1">
                You can access the documentation for the public REST API here, or directly from your
                base by clicking on the Help button in the upper right-hand corner while you are
                logged in on a laptop or desktop. This will bring up a list of additional resources.
                You will find a link to the API documentation at the bottom of that list.
            </Text>
            <HStack>
                <Button
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
                >
                    View Team
                </Button>
                <Button
                    backgroundColor="rgba(255, 255, 255, 0.15)"
                    textColor="white"
                    _hover={{
                        textColor: '#0C0F17',
                        boxShadow: '0px 8px 16px rgba(255, 255, 255, 0.15)',
                        backgroundColor: '#DBF72C',
                    }}
                    _active={{
                        textColor: '#DBF72C',
                        background: 'rgba(219, 247, 44, 0.15)',
                        boxShadow: '0px 8px 16px rgba(219, 247, 44, 0.15)',
                        backdropFilter: 'blur(25px)',
                    }}
                >
                    More Info
                </Button>
            </HStack>
        </VStack>
    </Flex>
);

export default CurrentEvent;
