import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { Workbox } from 'workbox-window';
import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectFunctionsEmulator } from 'firebase/functions';
import { useFirebase } from './context/firebase';
import Landing from './routes/Landing';
import Events from './routes/Events';
import Join from './routes/Join';
import { NavBar, UpdateApp } from './components';
import '../assets/style/clashDisplay.css';

const App = () => {
    const { auth, db, functions } = useFirebase();
    const wb = new Workbox('sw.js');
    wb.register().catch((error) => {
        throw error;
    });

    /* if (location.hostname === 'localhost') {
        connectAuthEmulator(auth, 'http://localhost:9099');
        connectFirestoreEmulator(db, 'localhost', 8080);
        connectFunctionsEmulator(functions, 'localhost', 5001);
    } */
    return (
        <ChakraProvider>
            <BrowserRouter>
                <UpdateApp wb={wb} />
                <NavBar />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/join" element={<Join />} />
                    <Route path="*" element={<Landing />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
};
export default App;
