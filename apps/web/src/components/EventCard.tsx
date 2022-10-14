import { VStack, Image, Box, Text, HStack, Button } from '@chakra-ui/react';
import React from 'react';
import airTable from '../../assets/AirtableBlack.png';

const EventCard = () => (
    <VStack
        maxWidth="300px"
        backgroundColor="rgba(255,255,255,.15)"
        alignItems="flex-start"
        borderTopRadius="10px"
    >
        <Box backgroundColor="white" padding="30px" borderTopRadius="10px">
            <Image width="300px" src={airTable} />
        </Box>
        <VStack paddingInline="16px" alignItems="flex-start">
            <Box backgroundColor="rgba(219,247,44,.15)" borderRadius="15px">
                <Text
                    paddingBlock="5px"
                    paddingInline="10px"
                    fontSize="12px"
                    textColor="#DBF72C"
                    fontFamily="Clash Display"
                    fontWeight="medium"
                >
                    ✅ 20 Submissions
                </Text>
            </Box>
            <Text fontSize="12px" textColor="white" fontFamily="Clash Display" fontWeight="medium">
                You can access the documentation for the public REST API here, or directly from your
                base by clicking on the button in the
            </Text>
            <HStack
                width="100%"
                borderEndRadius="10px"
                justifyContent="space-between"
                paddingBlock="16px"
            >
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
                    View Projects
                </Button>
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
                    More Info
                </Button>
            </HStack>
        </VStack>
    </VStack>
);

export default EventCard;
