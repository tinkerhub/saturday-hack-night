import ReactDOM from "react-dom";
import { App } from "./App";

import { Workbox } from "workbox-window";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCLIjetLAJ_ApQIIwmVByTdVcgx7sSZV1o",
    authDomain: "saturday-hack-night.firebaseapp.com",
    projectId: "saturday-hack-night",
    storageBucket: "saturday-hack-night.appspot.com",
    messagingSenderId: "645219994222",
    appId: "1:645219994222:web:3cfb8d679435ee7027747f",
    measurementId: "G-Q3ZZY8KWKX"
};

const wb = new Workbox("sw.js");
const app = initializeApp(firebaseConfig);

ReactDOM.render(<App wb={wb} app={app} />, document.getElementById("root"));

if ("serviceWorker" in navigator && location.hostname !== "localhost") 
    wb.register();
    
