import React, { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import Head from 'next/head';
import { NextPage } from 'next';
import initAuth from '@app/auth';
import { AuthProvider } from '@app/contexts';
import { DefaultSeo } from 'next-seo';
import { GoogleAnalytics, event } from 'nextjs-google-analytics';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: React.ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export function reportWebVitals({ id, name, label, value }: NextWebVitalsMetric) {
    event(name, {
        category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        label: id,
        nonInteraction: true,
    });
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    if (typeof window !== 'undefined') {
        initAuth();
    }
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <ChakraProvider>
            <Head>
                <link rel="icon" type="image/x-icon" href="/images/logo.png" />
            </Head>
            <GoogleAnalytics trackPageViews />
            <DefaultSeo
                title="Saturday HackNight"
                description="
            It’s a bi weekly hackathon that gives tech-savvy learners an oppurtunity to explore all the latest technology related concepts including APIs, frameworks and build some cool projects."
                openGraph={{
                    type: 'website',
                    siteName: 'Saturday HackNight',
                    locale: 'en_IE',
                    url: 'https://hacknight.tinkerhub.org/',
                    images: [
                        {
                            url: '/images/seo-01.png',
                            width: 800,
                            height: 600,
                            alt: 'Saturday HackNight',
                        },
                    ],
                }}
            />
            <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
        </ChakraProvider>
    );
};
export default MyApp;
