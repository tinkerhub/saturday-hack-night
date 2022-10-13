import React from 'react';
import { Footer, NavBar } from '../components';
import { Layout } from '../layout';
import { Faq, Hear, Home, How, Queries, Why } from '../views/Landing';

const Landing = () => (
    <Layout>
        <NavBar />
        <Home />
        <Why />
        <How />
        <Hear />
        <Faq />
        <Queries />
        <Footer />
    </Layout>
);

export default Landing;
