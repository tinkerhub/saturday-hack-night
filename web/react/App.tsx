import "./App.css";

import { Workbox } from "workbox-window";

import { HandleAppState } from "./components/HandleAppState";
import { Home } from "./Routes/home";


export const App = ({wb}: { wb: Workbox; }) => 
{
    return (
        <>
            <HandleAppState wb={wb} /> 
            <Home />
        </>
    );
};
