// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPy7TmC_O-V91O6-WXJsMjcXwdUdabtAY",
  authDomain: "ferremas-28c22.firebaseapp.com",
  projectId: "ferremas-28c22",
  storageBucket: "ferremas-28c22.firebasestorage.app",
  messagingSenderId: "152216909235",
  appId: "1:152216909235:web:698f6736aa33f7f58947c6",
  measurementId: "G-8GJYNC2D6J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
