import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBgjG1kvunt93x4QUB2nwnOpwOfvPGotvc",
    authDomain: "ecommerce-48ce6.firebaseapp.com",
    projectId: "ecommerce-48ce6",
    storageBucket: "ecommerce-48ce6.appspot.com",
    messagingSenderId: "918947886761",
    appId: "1:918947886761:web:6fdc7d09159ceb68f69bb8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;