import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwofnyaVjWGLlLk3PXEmAUt59EcgoxrnE",
  authDomain: "supervisor-4d300.firebaseapp.com",
  projectId: "supervisor-4d300",
  storageBucket: "supervisor-4d300.firebasestorage.app",
  messagingSenderId: "1095924864691",
  appId: "1:1095924864691:web:d3a14088b2f631604142c6",
  measurementId: "G-VLZ539G714"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
