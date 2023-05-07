import { BaseLayout } from '@app/layouts';
import { Button, Heading, Input, useToast, VStack } from '@chakra-ui/react';
import api from '@app/api';
import { useState } from 'react';
import { Toast } from '@app/components/utils';
import { NextPageWithLayout } from './_app';

const Admin: NextPageWithLayout = () => {
    const [eventId, setEventId] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();
    const updateLeaderboard = async () => {
        setLoading(true);
        try {
            const { data } = await api.post(`/points/${eventId}`);
            if (data.success) {
                toast({
                    title: 'Leaderboard Updated',
                    status: 'success',
                    render: ({ title, status }) => <Toast title={title} status={status} />,
                });
            }
        } catch (error: any) {
            toast({
                title: error.response.data.error,
                status: 'error',
                render: ({ title, status }) => <Toast title={title} status={status} />,
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <VStack
            justifyContent="center"
            alignItems="center"
            height="100vh"
            width="100vw"
            backgroundImage={`
        linear-gradient(180deg, rgba(12, 15, 23, 0) 67.85%, #0C0F17 100%),
        linear-gradient(180deg, #0C0F17 0%, rgba(12, 15, 23, 0.8) 100%),
        url('/images/codeBg.png') `}
        >
            <Heading
                fontFamily="Clash Display"
                textAlign="center"
                textColor="white"
                fontWeight="500"
                fontSize="40px"
            >
                Update Leaderboard
            </Heading>
            <Heading
                fontFamily="Clash Display"
                textColor="#DBF72C"
                fontWeight="500"
                fontSize="20px"
            >
                For Admin Use Only
            </Heading>
            <Input
                disabled={loading}
                width="300px"
                placeholder="Enter Event ID"
                variant="filled"
                height="45px"
                fontWeight="regular"
                transition="0.3s ease-in all"
                fontSize="16px"
                backgroundColor="rgba(255,255,255,0.15)"
                textColor="white"
                fontFamily="Clash Display"
                border="none"
                borderRadius="10px"
                _placeholder={{
                    textColor: 'rgba(255, 255, 255, 0.25)',
                }}
                _focus={{
                    boxShadow: '0px 3px 8px rgba(219, 247, 44, 0.15)',
                    border: '1px solid rgba(219, 247, 44, 0.15)',
                }}
                _hover={{
                    backgroundColor: 'rgba(255,255,255,0.25)',
                }}
                onChange={(e) => setEventId(e.target.value)}
            />

            <Button
                isLoading={loading}
                width="300px"
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
                onClick={updateLeaderboard}
            >
                UPDATE
            </Button>
        </VStack>
    );
};
Admin.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default Admin;
