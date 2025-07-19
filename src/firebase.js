// ==== 1. firebase.js ====
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB06jg_bzQ8lVIDIn2I3y-yKaMVc-l-LKY",
  authDomain: "kalipersacademy-25ca8.firebaseapp.com",
  projectId: "kalipersacademy-25ca8",
  storageBucket: "kalipersacademy-25ca8.appspot.com",
  messagingSenderId: "311844063179",
  appId: "1:311844063179:web:0de0a78b8ab567917fd84e",
  measurementId: "G-C2JPHVSBXW"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
