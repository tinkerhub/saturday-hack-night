import "./App.css";

import { Workbox } from "workbox-window";
import { FirebaseApp } from "firebase/app";


import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import { HandleAppState } from "./components/HandleAppState";
import Home from "./Routes/Home";
import Event from "./Routes/Event";


export const App = ({wb, app}: { wb: Workbox; app: FirebaseApp}) => 
{
    return (
        <Router>
            <HandleAppState wb={wb} /> 
            <Switch>
                <Route path="/join/:eventId/:teamId">
                    <Home />
                </Route>
                <Route path="/event">
                    <Event app={app} />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
};
