import "./App.css";

import {Workbox} from "workbox-window";
import {FirebaseApp} from "firebase/app";
import {getAuth, connectAuthEmulator} from "firebase/auth";
import {getFirestore, connectFirestoreEmulator} from "firebase/firestore";
import {getFunctions, connectFunctionsEmulator} from "firebase/functions";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import {HandleAppState} from "./components/HandleAppState";
import Header from "./components/Header";

import Home from "./Routes/Home";
import Event from "./Routes/Event";
import Join from "./Routes/join";

import {createTheme, ThemeProvider} from "@mui/material/styles";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});


export const App = ({wb, app}: { wb: Workbox; app: FirebaseApp }) =>
{
    const auth = getAuth(app);
    const db = getFirestore(app);
    const functions = getFunctions(app);

    if (location.hostname === "localhost")
    {
        connectAuthEmulator(auth, "http://10.147.19.203:9099");
        connectFirestoreEmulator(db, "10.147.19.203", 8080);
        connectFunctionsEmulator(functions, "10.147.19.203", 5001);
    }

    return (
        <Router>
            <ThemeProvider theme={darkTheme}>
                <HandleAppState wb={wb}/>
                <Header auth={auth}/>
                <Switch>
                    <Route path="/join" exact>
                        <Join functions={functions} auth={auth}/>
                    </Route>
                    <Route path="/event" exact>
                        <Event db={db} auth={auth}/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </ThemeProvider>
        </Router>
    );
};

