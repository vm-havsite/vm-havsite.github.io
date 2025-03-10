// Firebase Chat Setup
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';
import { checkAuthState } from './firebase_auth.js';

const db = getFirestore();

// Get chat ID for one-on-one chats
function getChatId(user1, user2) {
    return [user1, user2].sort().join('_');
}

// Send message
async function sendMessage(sender, receiver, message) {
    const chatId = getChatId(sender, receiver);
    const messagesRef = collection(db, `chats/${chatId}/messages`);
    try {
        await addDoc(messagesRef, {
            sender: sender,
            receiver: receiver,
            message: message,
            timestamp: new Date()
        });
        console.log('Message sent');
    } catch (error) {
        console.error('Error sending message:', error.message);
    }
}

// Listen for messages in real time
function listenForMessages(sender, receiver, renderMessages) {
    const chatId = getChatId(sender, receiver);
    const messagesRef = collection(db, `chats/${chatId}/messages`);
    const q = query(messagesRef, orderBy('timestamp'));
    onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderMessages(messages);
    });
}

// Delete message
async function deleteMessage(chatId, messageId) {
    try {
        await deleteDoc(doc(db, `chats/${chatId}/messages/${messageId}`));
        console.log('Message deleted');
    } catch (error) {
        console.error('Error deleting message:', error.message);
    }
}

export { sendMessage, listenForMessages, deleteMessage };
