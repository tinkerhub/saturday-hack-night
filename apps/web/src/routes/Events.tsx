import { VStack, Spinner, Heading, SimpleGrid } from '@chakra-ui/react';
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
import { NavBar, EventCard } from '../components';
import { useFirebase } from '../context/firebase';
import { Layout } from '../layout';
import { getColor } from '../utils/color';

const Events = () => {
    const { db } = useFirebase();
    const [currentEvents, setCurrentEvents] = useState<Array<QueryDocumentSnapshot<DocumentData>>>(
        []
    );
    const [exploredEvents, setExploredEvents] = useState<
        Array<QueryDocumentSnapshot<DocumentData>>
    >([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const eventSnapshot = await getDocs(
                query(collection(db, 'events'), where('registration', '==', true))
            );
            setCurrentEvents(eventSnapshot.docs);
            const exploredSnapshot = await getDocs(
                query(
                    collection(db, 'events'),
                    orderBy('time', 'desc'),
                    where('registration', '==', false)
                )
            );
            setExploredEvents(exploredSnapshot.docs);
            setLoading(false);
        })();
        return () => {};
    }, [db]);
    return (
        <Layout>
            <NavBar />
            <VStack rowGap="20px" width={{ base: 'full', lg: 'container.xl' }}>
                <Spinner
                    marginTop="50px"
                    size="xl"
                    thickness="4px"
                    color={getColor()}
                    display={loading ? 'block' : 'none'}
                />
                {currentEvents.length > 0 && (
                    <>
                        <Heading
                            fontWeight="700"
                            width="100%"
                            color="#000000"
                            textAlign={{ base: 'center', lg: 'center' }}
                            marginBlockStart="5px"
                            marginBlockEnd="10px"
                            letterSpacing="4px"
                            fontSize={{
                                base: '2rem',
                                md: '3.5rem',
                            }}
                            textShadow="2px 2px #fff, 2px -2px #fff, -2px 2px #fff, -2px -2px #fff
                    ,3px 3px #951BF4, 3px -3px #951BF4, -3px 3px #951BF4, -3px -3px #951BF4"
                        >
                            UPCOMING EVENTS
                        </Heading>
                        <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} gap={15}>
                            {currentEvents.map((event) => (
                                <EventCard
                                    id={event.id}
                                    key={event.id}
                                    image={event.get('image')}
                                    title={event.get('name')}
                                    description={event.get('about')}
                                    registration={event.get('registration')}
                                    results={event.get('results')}
                                />
                            ))}
                        </SimpleGrid>
                    </>
                )}
                {exploredEvents.length > 0 && (
                    <>
                        <Heading
                            fontWeight="700"
                            width="100%"
                            color="#000000"
                            textAlign={{ base: 'center', lg: 'center' }}
                            marginBlockStart="5px"
                            marginBlockEnd="10px"
                            letterSpacing="4px"
                            fontSize={{
                                base: '2rem',
                                md: '3.5rem',
                            }}
                            textShadow="2px 2px #fff, 2px -2px #fff, -2px 2px #fff, -2px -2px #fff
                    ,3px 3px #951BF4, 3px -3px #951BF4, -3px 3px #951BF4, -3px -3px #951BF4"
                        >
                            EXPLORED AREAS
                        </Heading>
                        <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} gap={15}>
                            {exploredEvents.map((event) => (
                                <EventCard
                                    id={event.id}
                                    key={event.id}
                                    image={event.get('image')}
                                    title={event.get('name')}
                                    registration={event.get('registration')}
                                    results={event.get('results')}
                                    description={event.get('about')}
                                />
                            ))}
                        </SimpleGrid>
                    </>
                )}
            </VStack>
        </Layout>
    );
};

export default Events;
