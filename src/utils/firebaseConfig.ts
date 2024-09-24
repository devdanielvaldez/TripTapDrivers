import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseEnv = {
    "NEXT_PUBLIC_FIREBASE_API_KEY": "AIzaSyB6F6JLL0W1mVRZt1rhqLDMIruvzwzrmfY",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN": "triptap-dev.firebaseapp.com",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID": "triptap-dev",
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET": "triptap-dev.appspot.com",
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID": "53473091149",
    "NEXT_PUBLIC_FIREBASE_APP_ID": "1:53473091149:web:2f9f035fa1467ca92e4604",
    "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID": "G-5FEWGMF705",
    "NEXT_AWS_ACCESS_KEY": "AKIA3C6FMCXMEM3K2EXA",
    "NEXT_AWS_SECRET_KEY": "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"
}


const firebaseConfig = {
    apiKey: firebaseEnv.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: firebaseEnv.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: firebaseEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: firebaseEnv.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: firebaseEnv.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: firebaseEnv.NEXT_PUBLIC_FIREBASE_APP_ID
};

let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
export const auth = getAuth(firebase_app);
export const db = getFirestore(firebase_app);