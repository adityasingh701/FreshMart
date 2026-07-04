import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";


import {
getFirestore
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";


import {
getStorage
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";


/* ==========================
FIREBASE CONFIG
========================== */


const firebaseConfig = {
apiKey: "AIzaSyBHZ-foHQqLTArmNhLmhsZbRazqKWWKvlM",
authDomain: "freshmart-ghosi.firebaseapp.com",
projectId: "freshmart-ghosi",
storageBucket: "freshmart-ghosi.firebasestorage.app",
messagingSenderId: "613992585524",
appId: "1:613992585524:web:444a44d92a783e5be2ad61"
};


/* ==========================
INIT APP
========================== */


const app = initializeApp(firebaseConfig);


/* ==========================
SERVICES
========================== */


const db = getFirestore(app);
const storage = getStorage(app);


export { db, storage };
