import "./App.css";

import { Workbox } from "workbox-window";
import { FirebaseApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import { HandleAppState } from "./components/HandleAppState";
import Home from "./Routes/Home";
import Event from "./Routes/Event";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});



export const App = ({wb, app}: { wb: Workbox; app: FirebaseApp}) => 
{
    const auth = getAuth(app);
    connectAuthEmulator(auth, "http://localhost:9099");

    const db = getFirestore(app);
    connectFirestoreEmulator(db, "localhost", 8080);

    return (
        <Router>
            <ThemeProvider theme={darkTheme}>
                <HandleAppState wb={wb} /> 
                <Switch>
                    <Route path="/join/:eventId/:teamId">
                    Not ready
                    </Route>
                    <Route path="/event">
                        <Event db={db} />
                    </Route>
                    <Route path="/">
                        <Home auth={auth} />
                    </Route>
                </Switch>
            </ThemeProvider>
        </Router>
    );
};
