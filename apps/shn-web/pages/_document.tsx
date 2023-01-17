import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang="en">
                <Head>
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
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
