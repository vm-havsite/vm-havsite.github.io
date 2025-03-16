
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
// Replace these placeholder values with your actual Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyDlQ_JWAToYyuintCnpzJQeURXq-p9C9XI",
    authDomain: "havsite-login-and-chat.firebaseapp.com",
    projectId: "havsite-login-and-chat",
    storageBucket: "havsite-login-and-chat.firebasestorage.app",
    messagingSenderId: "116998302820",
    appId: "1:116998302820:web:0c67e8f1b6bc9a8f200371"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
