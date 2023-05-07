import api from '@app/api';
import { CampusPoints } from '@app/types';
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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const CampusRow = ({ campus, index }: CampusRowProps) => (
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
            >{`0${index}`}</Text>
        </Td>
        <Td
            paddingInline="0"
            fontWeight="semibold"
            fontSize="16px"
            textColor="white"
            whiteSpace="pre-wrap"
            maxWidth={{
                base: '210px',
                md: 'none',
            }}
            fontFamily="Clash Display"
        >
            <HStack>
                <Text fontWeight="semibold">{campus.name} </Text>
            </HStack>
        </Td>
        <Td textAlign="right" isNumeric paddingInline="0px">
            <Text textColor="white" fontSize="25px" fontWeight="600" fontFamily="Clash Display">
                {campus.points}
            </Text>
        </Td>
    </Tr>
);

const CampusLeaderboard = () => {
    const [campus, setCampus] = useState<Array<CampusPoints>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { data } = await api.get('/points/college');
                setCampus(data.data);
                setLoading(false);
            } catch (err) {
                setCampus([]);
            } finally {
                setLoading(false);
            }
        })();
        return () => {
            setCampus([]);
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
                            Campus Name
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
                        campus.map((camp, index) => (
                            <CampusRow key={camp.id} campus={camp} index={index + 1} />
                        ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

type CampusRowProps = {
    campus: CampusPoints;
    index: number;
};
export { CampusLeaderboard };
