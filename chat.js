// Firebase Chat Setup
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';
import { checkAuthState } from './firebase_auth.js';

const db = getFirestore();
const messagesRef = collection(db, 'messages');

// Send message
async function sendMessage(username, message) {
    try {
        await addDoc(messagesRef, {
            username: username,
            message: message,
            timestamp: new Date()
        });
        console.log('Message sent');
    } catch (error) {
        console.error('Error sending message:', error.message);
    }
}

// Listen for new messages in real time
function listenForMessages(renderMessages) {
    const q = query(messagesRef, orderBy('timestamp'));
    onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => doc.data());
        renderMessages(messages);
    });
}

export { sendMessage, listenForMessages };
