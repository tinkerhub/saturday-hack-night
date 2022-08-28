import ReactDOM from "react-dom";
import { App } from "./App";

import { Workbox } from "workbox-window";
import { initializeApp } from "firebase/app";
import {connectAuthEmulator, getAuth } from "firebase/auth";
import {connectFunctionsEmulator, getFunctions } from "firebase/functions";
import {connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import React from "react";

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

const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

if ("serviceWorker" in navigator && location.hostname !== "localhost") 
    wb.register().catch((error) => console.error(error));
else
{
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFirestoreEmulator(db, "localhost", 8080);
    connectFunctionsEmulator(functions, "localhost", 5001);
}

ReactDOM.render(<App wb={wb} auth={auth} db={db} functions={functions} />, document.getElementById("root"));
