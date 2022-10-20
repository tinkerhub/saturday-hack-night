import React from 'react';
import { Footer } from '../components';
import { Layout } from '../layout';
import { Faq, Hear, Home, How, What } from '../views/Landing';

const Landing = () => (
    <Layout>
        <Home />
        <What />
        <How />
        <Hear />
        <Faq />
        {/* 
        <Queries /> */}
        <Footer />
    </Layout>
);

export default Landing;
