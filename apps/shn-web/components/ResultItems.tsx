import { Box, useToast, Grid, VStack, HStack, Avatar, Button, Text, Link } from '@chakra-ui/react';
import { Toast } from '@app/components/utils';

const ResultItems = ({ filteredResults }: ItemsProps) => {
    const toast = useToast();
    return (
        <Grid
            templateColumns={{
                base: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                xl: 'repeat(4, 1fr)',
            }}
            gap={{
                base: '18px',
                lg: '48x',
            }}
            paddingBlockStart={{
                base: '18px',
                lg: '36px',
            }}
            paddingBlockEnd="36px"
            paddingInline={{
                base: '16px',
                lg: '32px',
            }}
        >
            {filteredResults.map((result) => (
                <VStack
                    width="280px"
                    backgroundColor="rgba(255,255,255,.15)"
                    alignItems="flex-start"
                    borderRadius="10px"
                >
                    <Box backgroundColor="white" padding="30px" width="100%" borderTopRadius="10px">
                        <Text textAlign="center" fontSize="18px">
                            <b>{result.name}</b>
                        </Text>
                    </Box>
                    <VStack
                        width="100%"
                        paddingInline="16px"
                        alignItems="flex-start"
                        flexGrow="1"
                        rowGap="5px"
                        justifyContent="space-around"
                    >
                        {result.members.map((member) => (
                            <Link href={`https://www.github.com/${member.githubid}`} isExternal>
                                <HStack key={member.name}>
                                    <Avatar
                                        height="30px"
                                        width="30px"
                                        src={member.avatar}
                                        name={member.githubid}
                                    />
                                    <Text
                                        fontSize="14px"
                                        fontFamily="Clash Display"
                                        textColor="white"
                                    >
                                        {member.githubid}
                                    </Text>
                                </HStack>
                            </Link>
                        ))}
                        <HStack
                            width="100%"
                            borderEndRadius="10px"
                            justifyContent="flex-end"
                            paddingBlock="8px"
                        >
                            <Button
                                width="130px"
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
                                    window.open(result.repo, '_blank');
                                }}
                            >
                                View Project
                            </Button>
                            <Button
                                width="130px"
                                background="rgba(255, 255, 255, 0.15)"
                                textColor="white"
                                _hover={{
                                    textColor: 'black',
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
                                    navigator.clipboard.writeText(result.repo).then(() => {
                                        toast({
                                            title: '✅Copied to clipboard!',
                                            status: 'success',
                                            position: 'bottom',
                                            render: ({ title, status }) => (
                                                <Toast title={title} status={status} />
                                            ),
                                        });
                                    });
                                }}
                            >
                                Copy Link
                            </Button>
                        </HStack>
                    </VStack>
                </VStack>
            ))}
        </Grid>
    );
};

export { ResultItems };

interface ItemsProps {
    filteredResults: Projects[];
}

export interface Projects {
    name: string;
    repo: string;
    projectStatus: string;
    members: {
        name: string;
        githubid: string;
        avatar: string;
    }[];
}
