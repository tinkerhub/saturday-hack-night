import "./App.css";

import {Workbox} from "workbox-window";
import {Functions} from "firebase/functions";
import {Firestore} from "firebase/firestore";
import {Auth} from "firebase/auth";

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import {HandleAppState} from "./components/HandleAppState";
import Header from "./components/Header";

import Profile from "./Routes/Profile";
import Home from "./Routes/Home";
import Event from "./Routes/Event";
import Join from "./Routes/join";

import {createTheme, ThemeProvider} from "@mui/material/styles";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

interface AppProps
{
    wb: Workbox;
    auth: Auth;
    db: Firestore;
    functions: Functions;
}

export const App = ({wb, auth, db, functions}: AppProps) =>
{
    return (
        <Router>
            <ThemeProvider theme={darkTheme}>
                <HandleAppState wb={wb}/>
                <Header auth={auth}/>
                <Routes>
                    <Route path="/profile" element={<Profile auth={auth} db={db}/>}/>
                    <Route path="/join" element={ <Join functions={functions} auth={auth}/> }/>
                    <Route path="/event" element={ <Event db={db} auth={auth}/>}/>
                    <Route path="/" element={ <Home/> }/>
                </Routes>
            </ThemeProvider>
        </Router>
    );
};

