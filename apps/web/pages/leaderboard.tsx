import { UserLeaderboard, CampusLeaderboard } from '@app/components';
import { BaseLayout } from '@app/layouts';
import {
    Heading,
    HStack,
    Image,
    VStack,
    Text,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';
import { NextPageWithLayout } from './_app';

const Leaderboard: NextPageWithLayout = () => (
    <VStack
        marginTop="80px"
        rowGap="20px"
        paddingInline={{ base: '16px', md: '31px' }}
        width="100vw"
        fontFamily="Clash Display"
        backgroundImage={`
                linear-gradient(180deg, rgba(12, 15, 23, 0) 67.85%, #0C0F17 100%),
                linear-gradient(180deg, #0C0F17 0%, rgba(12, 15, 23, 0.8) 100%),
                `}
    >
        <HStack
            width="100%"
            paddingBlock={{
                base: '16px',
                md: 'none',
            }}
            paddingInline={{
                base: '16px',
                md: 'none',
            }}
            borderRadius="20px"
            background="rgba(255, 255, 255, 0.15)"
        >
            <Image
                display={{
                    base: 'none',
                    md: 'block',
                }}
                width={{
                    base: '0px',
                    md: '200px',
                    lg: '250px',
                }}
                src="/images/leaderboard.png"
            />
            <VStack alignItems="flex-start">
                <Heading
                    background="linear-gradient(91.07deg, #9976E9 0%, #D61F74 99.57%)"
                    fontSize={{
                        base: '36px',
                        md: '62px',
                        lg: '72px',
                    }}
                    fontWeight="700"
                    fontFamily="Clash Display"
                    style={{
                        WebkitTextFillColor: 'transparent',
                        WebkitBackgroundClip: 'text',
                    }}
                >
                    LEADERBOARD
                </Heading>
                <Text textColor="#E9E5E1">
                    Ascend to the apex of the leaderboard by crafting ingenious projects and obtain
                    enticing rewards!
                </Text>
            </VStack>
        </HStack>
        <Tabs variant="soft-rounded" width="100%">
            <TabList gap="10px">
                <Tab
                    paddingBlock="10px"
                    textColor=" #DBF72C"
                    fontSize={{
                        base: '16px',
                    }}
                    border="2px solid transparent"
                    _hover={{
                        background: 'rgba(255, 255, 255, 0.15)',
                    }}
                    _selected={{
                        border: '2px solid #DBF72C',
                        background: 'rgba(219, 247, 44, 0.15)',
                    }}
                >
                    🏆 INDIVIDUAL
                </Tab>
                <Tab
                    paddingBlock="10px"
                    textColor=" #DBF72C"
                    border="2px solid transparent"
                    _hover={{
                        background: 'rgba(255, 255, 255, 0.15)',
                    }}
                    _selected={{
                        border: '2px solid #DBF72C',
                        background: 'rgba(219, 247, 44, 0.15)',
                    }}
                >
                    🏫 CAMPUS
                </Tab>
            </TabList>

            <TabPanels>
                <TabPanel padding="0">
                    <UserLeaderboard />
                </TabPanel>
                <TabPanel padding="0">
                    <CampusLeaderboard />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </VStack>
);

Leaderboard.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
export default Leaderboard;
