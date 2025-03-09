// Firebase Auth Setup
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyDlQ_JWAToYyuintCnpzJQeURXq-p9C9XI",
    authDomain: "havsite-login-and-chat.firebaseapp.com",
    projectId: "havsite-login-and-chat",
    storageBucket: "havsite-login-and-chat.firebasestorage.app",
    messagingSenderId: "116998302820",
    appId: "1:116998302820:web:0c67e8f1b6bc9a8f200371"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup
async function signUp(email, password, username) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save username to Firestore
        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            username: username,
            createdAt: new Date()
        });

        console.log('Signup successful:', user);
    } catch (error) {
        console.error('Signup error:', error.message);
    }
}

// Signin
async function signIn(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Signin successful:', userCredential.user);
    } catch (error) {
        console.error('Signin error:', error.message);
    }
}

// Signout
async function signOutUser() {
    try {
        await signOut(auth);
        console.log('Signout successful');
    } catch (error) {
        console.error('Signout error:', error.message);
    }
}

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is signed in:', user);
    } else {
        console.log('No user signed in');
    }
});

export { signUp, signIn, signOutUser };

// Example usage
// signUp('test@example.com', 'password123', 'testuser');
// signIn('test@example.com', 'password123');
// signOutUser();
