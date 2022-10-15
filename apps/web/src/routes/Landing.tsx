import React from 'react';
import { Footer } from '../components';
import { Layout } from '../layout';
import { Faq, Hear, Home, How, Why } from '../views/Landing';

const Landing = () => (
    <Layout>
        <Home />
        <Why />
        <How />
        <Hear />
        <Faq />
        {/* 
        <Queries /> */}
        <Footer />
    </Layout>
);

export default Landing;
