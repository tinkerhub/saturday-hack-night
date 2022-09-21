import React from 'react';
import { NavBar } from '../components';
import { Layout } from '../layout';
import { Home, Why } from '../views/Landing';

const Landing = () => (
    <Layout>
        <NavBar />
        <Home />
        <Why />
    </Layout>
);

export default Landing;
