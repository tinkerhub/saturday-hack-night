import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectFunctionsEmulator } from 'firebase/functions';
import { useFirebase } from './firebase';
import Home from './routes/Home';

const App = () => {
    const { auth, db, functions } = useFirebase();

    // eslint-disable-next-line no-restricted-globals
    if (location.hostname === 'localhost') {
        connectAuthEmulator(auth, 'http://localhost:9099');
        connectFirestoreEmulator(db, 'localhost', 8080);
        connectFunctionsEmulator(functions, 'localhost', 5001);
    }
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
};

export default App;
