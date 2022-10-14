import { VStack, Heading, Grid } from '@chakra-ui/react';
import {
    QueryDocumentSnapshot,
    DocumentData,
    getDocs,
    query,
    collection,
    where,
    orderBy,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/firebase';
import { Layout } from '../layout';
import bg from '../../assets/bg01.png';
import { CurrentEvent, EventCard } from '../components';

const Events = () => {
    const { db } = useFirebase();
    const [currentEvents, setCurrentEvents] = useState<Array<QueryDocumentSnapshot<DocumentData>>>(
        [],
    );
    const [exploredEvents, setExploredEvents] = useState<
        Array<QueryDocumentSnapshot<DocumentData>>
    >([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const eventSnapshot = await getDocs(
                query(collection(db, 'events'), where('registration', '==', true)),
            );
            setCurrentEvents(eventSnapshot.docs);
            const exploredSnapshot = await getDocs(
                query(
                    collection(db, 'events'),
                    orderBy('time', 'desc'),
                    where('registration', '==', false),
                ),
            );
            setExploredEvents(exploredSnapshot.docs);
            setLoading(false);
        })();
        return () => {};
    }, [db]);
    return (
        <Layout>
            <VStack
                marginTop="80px"
                backgroundImage={`
                linear-gradient(180deg, rgba(12, 15, 23, 0) 67.85%, #0C0F17 100%),
                linear-gradient(180deg, #0C0F17 0%, rgba(12, 15, 23, 0.8) 100%),
                url(${bg}) `}
            >
                <Heading
                    fontSize="40px"
                    color="white"
                    width="100vw"
                    fontFamily="Clash Display"
                    paddingInline={{
                        base: '16px',
                        lg: '32px',
                    }}
                >
                    Ongoing Events🚀
                </Heading>
                <CurrentEvent />
                <Heading
                    fontSize="40px"
                    color="white"
                    width="100vw"
                    fontFamily="Clash Display"
                    paddingInline={{
                        base: '16px',
                        lg: '32px',
                    }}
                    style={{
                        marginTop: '36px',
                    }}
                >
                    Explored Areas🌟
                </Heading>
                <Grid
                    templateColumns={{
                        base: 'repeat(1, 1fr)',
                        md: 'repeat(4, 1fr)',
                    }}
                    gap={{
                        base: '18px',
                        lg: '48x',
                    }}
                    paddingBlock={{
                        base: '18px',
                        lg: '36px',
                    }}
                    paddingBlockEnd="36px"
                >
                    <EventCard />
                    <EventCard />
                    <EventCard />
                    <EventCard />
                    <EventCard />
                </Grid>
            </VStack>
        </Layout>
    );
};

export default Events;
