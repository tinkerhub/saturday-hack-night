import React from 'react';
import { NavBar } from '../components';
import { Layout } from '../layout';
import { Faq, Home, How, Why } from '../views/Landing';

const Landing = () => (
    <Layout>
        <NavBar />
        <Home />
        <Why />
        <How />
        <Faq />
    </Layout>
);

export default Landing;
