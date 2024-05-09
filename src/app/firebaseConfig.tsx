// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: "astute-being-384108.firebaseapp.com",
  databaseURL: "https://astute-being-384108-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "astute-being-384108",
  storageBucket: "astute-being-384108.appspot.com",
  messagingSenderId: "828110181908",
  appId: "1:828110181908:web:48cdb2326127fa307c3901",
  measurementId: "G-C9L2PG2X2D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);  