// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";

// Your Firebase Config
const firebaseConfig = {
apiKey: "AIzaSyBHZ-foHQqLTArmNhLmhsZbRazqKWWKvlM",
authDomain: "freshmart-ghosi.firebaseapp.com",
projectId: "freshmart-ghosi",
storageBucket: "freshmart-ghosi.firebasestorage.app",
messagingSenderId: "613992585524",
appId: "1:613992585524:web:444a44d92a783e5be2ad61"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Export Everything

export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

export default app;
