// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDerZgIyt6MlVD-j_dGvyGRnyVOj1LrNIw",
    authDomain: "fms-exhibition2025.firebaseapp.com",
    projectId: "fms-exhibition2025",
    storageBucket: "fms-exhibition2025.firebasestorage.app",
    messagingSenderId: "893953950553",
    appId: "1:893953950553:web:bdab7e8bbc25966f5d0248","
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };