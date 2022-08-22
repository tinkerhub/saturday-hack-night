import React from 'react';
import { Footer, NavBar } from '../components';
import { Layout } from '../layout';
import { Home, How, Queries, Why } from '../views/Landing';

const Landing = () => (
    <Layout>
        <NavBar />
        <Home />
        <Why />
        <How />
        <Queries />
        <Footer />
    </Layout>
);

export default Landing;
