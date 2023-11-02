// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  getDoc,
} from "@firebase/firestore";
import Typesense from "typesense";
import { College } from "@app/types";

const firebaseConfig = {
  apiKey: "AIzaSyCLIjetLAJ_ApQIIwmVByTdVcgx7sSZV1o",
  authDomain: "saturday-hack-night.firebaseapp.com",
  projectId: "saturday-hack-night",
  storageBucket: "saturday-hack-night.appspot.com",
  messagingSenderId: "645219994222",
  appId: "1:645219994222:web:3cfb8d679435ee7027747f",
  measurementId: "G-Q3ZZY8KWKX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const typesense = new Typesense.Client({
  nodes: [
    {
      host: "jb4cdwp1a3sf8ugrp-1.a1.typesense.net",
      port: 443,
      protocol: "https",
    },
  ],
  apiKey: "Tu9wjCTQbG7nCyREXAfrvLSmRltAeFJN",
  connectionTimeoutSeconds: 2,
});

export async function getCollege(search: string) {
  try {
    const searchParameters = {
      q: search,
      query_by: "name", // Assuming "name" is the field in colleges collection you want to search
      prefix: true, // Assuming you want prefix-based search
    };

    const result = await typesense
      .collections("colleges")
      .documents()
      .search(searchParameters);

    return (
      result.hits?.map((hit) => ({
        label: (hit.document as College).name,
        value: (hit.document as College).id,
      })) || []
    );
  } catch (error) {
    console.error("Error fetching colleges from Typesense:", error);
    return [];
  }
}
