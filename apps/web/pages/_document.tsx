/* eslint-disable @next/next/no-css-tags */
import React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <Script
            id="css-houdini-squircle"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: ` if ("paintWorklet" in CSS) { CSS.paintWorklet.addModule( "https://www.unpkg.com/css-houdini-squircle/squircle.min.js" ); } `,
            }}
          />
          <style>
            {`
                            body {
                                scrollbar-width: none;
                            }
                            ::-webkit-scrollbar {
                                width: '0px';
                                background: transparent;
                                display: none;
                            }
                        `}
          </style>
          <link href="/style/clashDisplay.css" rel="stylesheet" />
          <link rel="icon" type="image/x-icon" href="/images/logo.png" />
          <Script src="https://www.googletagmanager.com/gtag/js?id=GTM-K7C335P" />
          <Script id="google-analytics">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'GTM-K7C335P');
        `}
          </Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
