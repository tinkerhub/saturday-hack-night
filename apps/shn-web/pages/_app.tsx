import React, { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { NextPage } from 'next';
import initAuth from '@app/auth';
import { AuthContext } from '@app/contexts';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};
const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    if (typeof window !== 'undefined') {
        initAuth();
    }
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <ChakraProvider>
            <Head>
                <title>Saturday HackNight</title>
                <link rel="icon" type="image/x-icon" href="/images/logo.png" />
            </Head>
            <AuthContext>{getLayout(<Component {...pageProps} />)}</AuthContext>
        </ChakraProvider>
    );
};
export default MyApp;
