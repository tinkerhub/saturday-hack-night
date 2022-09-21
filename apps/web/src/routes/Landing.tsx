import React from 'react';
import { NavBar } from '../components';
import { Layout } from '../layout';
import { Home, How, Why } from '../views/Landing';

const Landing = () => (
    <Layout>
        <NavBar />
        <Home />
        <Why />
        <How />
    </Layout>
);

export default Landing;
