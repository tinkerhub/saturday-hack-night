import "./App.css";

import {Workbox} from "workbox-window";
import {Functions} from "firebase/functions";
import {Firestore} from "firebase/firestore";
import {Auth} from "firebase/auth";

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

interface AppProps
{
    wb: Workbox;
    auth: Auth;
    db: Firestore;
    functions: Functions;
}

export const App = ({wb, auth, db, functions, }: AppProps) =>
{
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

