import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const callsCollection = collection(db, 'calls');

if (import.meta.env.MODE === 'development') {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
  } catch (error) {
    console.log('Firestore emulator connection failed:', error);
  }
}

export default app;

export { addDoc, doc, getDocs, deleteDoc };
