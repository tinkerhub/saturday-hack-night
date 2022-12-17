import { VStack, Heading, Grid } from '@chakra-ui/react';
import React from 'react';
import codeClub from '../../../assets/images/codeClub.png';
import { Card } from '../../components';

const How = () => (
    <VStack
        width={{
            base: '100vw',
            xl: 'container.xl',
        }}
        paddingInline={{ base: '18px', lg: '36px' }}
        backgroundImage={`linear-gradient(180deg, rgba(12, 15, 23, 0.2) 67.85%, #0C0F17 100%), linear-gradient(180deg, #0C0F17 0%, rgba(12, 15, 23, 0.4) 100%), url(${codeClub});`}
    >
        <Heading
            textColor="white"
            textAlign="left"
            fontSize="40px"
            width="100%"
            paddingInline={{
                base: '18px',
                lg: '36px',
            }}
            paddingBlockStart={{
                base: '18px',
                lg: '48px',
            }}
            fontFamily="Clash Display"
        >
            HOW TO <span style={{ color: '#DBF72C' }}>REGISTER?</span>
        </Heading>
        <Grid
            templateColumns={{
                base: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
            }}
            gap={{
                base: '18px',
                lg: '48x',
            }}
            paddingBlock={{
                base: '18px',
                lg: '36px',
            }}
        >
            <Card
                num="1"
                heading="Create a Repo"
                text="Create a repo & initialize it with ReadMe"
            />
            <Card
                num="2"
                heading="Create a Team"
                text="Create a team of 1-3 members and register for HackNight"
            />
            <Card
                num="3"
                heading="Discuss Ideas"
                text="Discuss and finalize the project idea and building process"
            />
            <Card num="4" heading="Build it" text="Build it together at Saturday Hack Night" />
        </Grid>
    </VStack>
);
export default How;
