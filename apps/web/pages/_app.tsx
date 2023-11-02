import React, { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { AuthProvider } from "@app/contexts";
import { DefaultSeo } from "next-seo";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ChakraProvider>
      <DefaultSeo
        title="Saturday HackNight"
        description="
            It’s a bi weekly hackathon that gives tech-savvy learners an oppurtunity to explore all the latest technology related concepts including APIs, frameworks and build some cool projects."
        openGraph={{
          type: "website",
          siteName: "Saturday HackNight",
          locale: "en_IE",
          url: "https://hacknight.tinkerhub.org/",
          images: [
            {
              url: "/images/seo-01.png",
              width: 800,
              height: 600,
              alt: "Saturday HackNight",
            },
          ],
        }}
      />
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    </ChakraProvider>
  );
};
export default MyApp;
