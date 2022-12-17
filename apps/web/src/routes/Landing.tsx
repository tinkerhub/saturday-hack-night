import React from 'react';
import { Footer } from '../components';
import { Layout } from '../layout';
import { Faq, Hear, Home, How, What, Stats } from '../views/Landing';

const Landing = () => (
    <Layout>
        <Home />
        <What />
        <Stats />
        <How />
        <Hear />
        <Faq />
        {/* 
        <Queries /> */}
        <Footer />
    </Layout>
);

export default Landing;
