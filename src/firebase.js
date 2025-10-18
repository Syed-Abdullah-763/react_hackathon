import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcSCiQOpGBN53D0_DFiG9giiepJxpW2nc",
  authDomain: "react-todo-a279a.firebaseapp.com",
  projectId: "react-todo-a279a",
  storageBucket: "react-todo-a279a.firebasestorage.app",
  messagingSenderId: "778875296917",
  appId: "1:778875296917:web:5ef7389ef450b36162cf9c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
