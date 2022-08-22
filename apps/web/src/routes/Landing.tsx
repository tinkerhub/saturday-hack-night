import React from 'react';
import { NavBar } from '../components';
import { Layout } from '../layout';
import { Home, How, Queries, Why } from '../views/Landing';

const Landing = () => (
    <Layout>
        <NavBar />
        <Home />
        <Why />
        <How />
        <Queries />
    </Layout>
);

export default Landing;
