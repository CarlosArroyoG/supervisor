// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
