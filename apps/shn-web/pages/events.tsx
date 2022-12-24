import { VStack, Heading, Grid } from '@chakra-ui/react';
import { EventCard, CurrentEvent } from '../components';
import { api } from '../api';
import { BaseLayout } from '../layout';
import { NextPageWithLayout } from './_app';

const Events: NextPageWithLayout = ({ currentEvents, pastEvents }: EventProps) => (
    <>
        {currentEvents.length > 0 && (
            <VStack
                marginTop="80px"
                alignItems="flex-start"
                width={{
                    base: '100vw',
                    lg: 'container.xl',
                }}
                backgroundImage={`
                linear-gradient(180deg, rgba(12, 15, 23, 0) 67.85%, #0C0F17 100%),
                linear-gradient(180deg, #0C0F17 0%, rgba(12, 15, 23, 0.8) 100%),
                url('images/bg.png') `}
            >
                <Heading
                    fontSize="40px"
                    color="white"
                    fontFamily="Clash Display"
                    paddingInline={{
                        base: '16px',
                        lg: '32px',
                    }}
                >
                    Ongoing Events🚀
                </Heading>
                <CurrentEvent event={currentEvents[0]} />
            </VStack>
        )}
        {/* <VStack
            marginTop="50px"
            alignItems="center"
            width={{
                base: '100vw',
                xl: 'container.xl',
            }}
        >
            <Heading
                fontSize="40px"
                color="white"
                fontFamily="Clash Display"
                paddingInline={{
                    base: '16px',
                    lg: '32px',
                }}
                width="100%"
                textAlign="left"
                style={{
                    marginTop: '36px',
                }}
            >
                Explored Areas🌟
            </Heading>
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
                {pastEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </Grid>
        </VStack> */}
    </>
);

export async function getServerSideProps() {
    const { data } = await api.get('/activity');
    const currentEvents = data.data.filter((event) => event.status === 'REGISTRATION');
    const pastEvents = data.data.filter(
        (event) => event.status === 'RESULT' || event.status === 'PENDING',
    );
    return {
        props: {
            currentEvents,
            pastEvents,
        },
    };
}

interface EventProps {
    currentEvents: [];
    pastEvents: [];
}

Events.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
export default Events;
