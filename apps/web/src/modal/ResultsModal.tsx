import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    AvatarGroup,
    Box,
    Button,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Avatar,
    Table,
    TableContainer,
    Tbody,
    Td,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { getDocs, query, collection, where, getDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/firebase';
import { getColor } from '../utils/color';

const ProjectStatus = [
    { code: 101, status: 'Best Overall Project' },
    { code: 102, status: 'Best Group Projects' },
    { code: 100, status: 'Best Individual Projects' },
    { code: 50, status: 'Completed Projects' },
];

const ResultsModal = ({ id, onClose, isOpen }: ResultsModalProps) => {
    const [results, setResults] = useState<Array<Results>>([]);
    const [loading, setLoading] = useState(true);
    const { db } = useFirebase();
    useEffect(() => {
        (async () => {
            const resultsSnapshot = await getDocs(
                query(collection(db, `events/${id}/teams`), where('projectStatus', '>', -1))
            );
            resultsSnapshot.docs.forEach(async (resultsSnap) => {
                let memberList = resultsSnap.get('members').concat([resultsSnap.get('lead')]);
                memberList = [...new Set(memberList)];
                const members = memberList.map(async (member: string) => {
                    const memberSnapshot = await getDoc(doc(db, `users/${member}`));
                    return memberSnapshot.data();
                });
                const membersData = await Promise.all(members);
                setResults((value) => [
                    ...value,
                    {
                        name: resultsSnap.get('name'),
                        repo: resultsSnap.get('repo'),
                        projectStatus: resultsSnap.get('projectStatus'),
                        members: membersData,
                    },
                ]);
            });
            setLoading(false);
        })();
        return () => {
            setLoading(false);
        };
    }, [db, id]);
    return (
        <Modal size="xl" onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Results</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <>
                        {loading && <Spinner color={getColor()} />}
                        {!loading && (
                            <Accordion allowToggle>
                                {ProjectStatus.map((status) => {
                                    const filteredResults = results.filter(
                                        (result) => result.projectStatus === status.code
                                    );
                                    return (
                                        filteredResults.length > 0 && (
                                            <AccordionItem key={status.code}>
                                                <AccordionButton>
                                                    <Box flex="1" textAlign="left">
                                                        {status.status}
                                                    </Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                                <AccordionPanel pb={4}>
                                                    <TableContainer>
                                                        <Table size="md">
                                                            <Thead>
                                                                <Tr>
                                                                    <Td>Team Name</Td>
                                                                    <Td>Members</Td>
                                                                    <Td>Repo</Td>
                                                                </Tr>
                                                            </Thead>
                                                            <Tbody>
                                                                {filteredResults.map((result) => (
                                                                    <Tr key={result.name}>
                                                                        <Td>{result.name}</Td>
                                                                        <Td>
                                                                            <AvatarGroup>
                                                                                {result.members.map(
                                                                                    (member) => (
                                                                                        <Avatar
                                                                                            key={
                                                                                                member.uid
                                                                                            }
                                                                                            src={
                                                                                                member.avatar
                                                                                            }
                                                                                            name={
                                                                                                member.githubID
                                                                                            }
                                                                                        />
                                                                                    )
                                                                                )}
                                                                            </AvatarGroup>
                                                                        </Td>
                                                                        <Td>
                                                                            <Link
                                                                                href={result.repo}
                                                                            >
                                                                                Click Here
                                                                            </Link>
                                                                        </Td>
                                                                    </Tr>
                                                                ))}
                                                            </Tbody>
                                                        </Table>
                                                    </TableContainer>
                                                </AccordionPanel>
                                            </AccordionItem>
                                        )
                                    );
                                })}
                            </Accordion>
                        )}
                    </>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

interface ResultsModalProps {
    id: string;
    onClose: () => void;
    isOpen: boolean;
}
interface Results {
    name: string;
    repo: string;
    projectStatus: number;
    members: Array<any>;
}
export default ResultsModal;
