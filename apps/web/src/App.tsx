import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectFunctionsEmulator } from 'firebase/functions';
import { useFirebase } from './context/firebase';
import Landing from './routes/Landing';
import Events from './routes/Events';
import Join from './routes/Join';
import { NavBar } from './components';
import '../assets/style/clashDisplay.css';

const App = () => {
    const { auth, db, functions } = useFirebase();

    // if (location.hostname === 'localhost') {
    //     connectAuthEmulator(auth, 'http://localhost:9099');
    //     connectFirestoreEmulator(db, 'localhost', 8080);
    //     connectFunctionsEmulator(functions, 'localhost', 5001);
    // }
    return (
        <ChakraProvider>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/join" element={<Join />} />
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
};
export default App;
