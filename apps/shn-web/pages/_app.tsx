import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Footer, Navbar } from '../components';
import initAuth from '../auth';
import { AuthContext } from '../context';

const MyApp = ({ Component, pageProps }: AppProps) => {
    if (typeof window !== 'undefined') {
        initAuth();
    }
    return (
        <ChakraProvider>
            <Head>
                <title>Saturday HackNight</title>
            </Head>
            <AuthContext>
                <Navbar />
                <Component {...pageProps} />
                <Footer />
            </AuthContext>
        </ChakraProvider>
    );
};
export default MyApp;
