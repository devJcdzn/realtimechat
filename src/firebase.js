import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBhRvEnNmQrwC2BfX0_Phvmx1G_wcJ7Qfw",
    authDomain: "realtime-chat-33ab7.firebaseapp.com",
    projectId: "realtime-chat-33ab7",
    storageBucket: "realtime-chat-33ab7.appspot.com",
    messagingSenderId: "943027542796",
    appId: "1:943027542796:web:a57140cb12d1b2ba07c729"
};

//Initialize App

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);