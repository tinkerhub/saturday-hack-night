import api from '@app/api';
import { UserPoints } from '@app/types';
import {
    TableContainer,
    Text,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Image,
    HStack,
    VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const UserRow = ({ user, index }: UserRowProps) => (
    <Tr>
        <Td maxWidth="44px" paddingInline="0" paddingBlock="8px">
            {index === 1 && <Image maxHeight="80px" src="/images/medal-gold.png" />}
            {index === 2 && <Image maxHeight="80px" src="/images/medal-silver.png" />}
            {index === 3 && <Image maxHeight="80px" src="/images/medal-bronze.png" />}
            <Text
                textColor="white"
                fontSize="25px"
                fontWeight="600"
                fontFamily="Clash Display"
                width="44px"
                display={index > 3 ? 'block' : 'none'}
            >
                {index < 10 ? `0${index}` : index}
            </Text>
        </Td>
        <Td
            paddingInline="0"
            fontWeight="400"
            textColor="rgba(255,255,255,0.5)"
            fontFamily="Clash Display"
        >
            <HStack>
                <Image
                    width="50px"
                    display={{
                        base: 'none',
                        md: 'block',
                    }}
                    height="50px"
                    src={user.avatar || '/images/userFallback.png'}
                    __css={{
                        borderRadius: '10px',
                        '@supports (-webkit-mask-image: paint(squircle))': {
                            borderRadius: 'unset',
                            '--squircle-radius': '50px',
                            '--squircle-smooth': '0.9',
                            WebkitMaskImage: 'paint(squircle)',
                        },
                    }}
                />

                <VStack
                    gap=".5"
                    textColor="white"
                    alignItems="flex-start"
                    cursor="pointer"
                    onClick={() => {
                        window.open(`https://www.github.com/${user.githubid}`, '_blank');
                    }}
                >
                    <Text fontWeight="semibold">{user.name || user.githubid} </Text>
                    <Text
                        fontSize="14px"
                        fontWeight="regular"
                        whiteSpace="pre-wrap"
                        maxWidth={{
                            base: '200px',
                            md: 'none',
                        }}
                        style={{
                            marginTop: '0px',
                        }}
                    >
                        {user.college}
                    </Text>
                </VStack>
            </HStack>
        </Td>
        <Td textAlign="right" isNumeric paddingInline="0px">
            <Text textColor="white" fontSize="25px" fontWeight="600" fontFamily="Clash Display">
                {user.points}
            </Text>
        </Td>
    </Tr>
);

const UserLeaderboard = () => {
    const [users, setUsers] = useState<Array<UserPoints>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { data } = await api.get('/points/user');
                setUsers(data.data);
                setLoading(false);
            } catch (err) {
                setUsers([]);
            } finally {
                setLoading(false);
            }
        })();
        return () => {
            setUsers([]);
            setLoading(true);
        };
    }, []);

    return (
        <TableContainer width="100%" paddingBlock="10px">
            <Table variant="unstyled" fontFamily="Clash Display">
                <Thead borderBottom="0.5px solid rgba(255,255,255,0.3)">
                    <Tr>
                        <Th
                            fontWeight="400"
                            textColor="rgba(255,255,255,0.5)"
                            fontFamily="Clash Display"
                            paddingInline="0px"
                        >
                            Rank
                        </Th>
                        <Th
                            fontWeight="400"
                            textColor="rgba(255,255,255,0.5)"
                            fontFamily="Clash Display"
                            paddingInline="0px"
                        >
                            Individual Details
                        </Th>
                        <Th
                            fontWeight="400"
                            textColor="rgba(255,255,255,0.5)"
                            fontFamily="Clash Display"
                            textAlign="right"
                            isNumeric
                            paddingInline="0px"
                        >
                            Points
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {!loading &&
                        users.map((user, index) => (
                            <UserRow key={user.id} user={user} index={index + 1} />
                        ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

type UserRowProps = {
    user: UserPoints;
    index: number;
};
export { UserLeaderboard };
