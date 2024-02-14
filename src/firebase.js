import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8R18e_z7ddFB791n4LjHPPlGYb-35J-E",
  authDomain: "react-quizapp-c62d3.firebaseapp.com",
  projectId: "react-quizapp-c62d3",
  storageBucket: "react-quizapp-c62d3.appspot.com",
  messagingSenderId: "573069028727",
  appId: "1:573069028727:web:20d2109cd62814cddc8572"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage();

export default db;
export const auth = getAuth();
