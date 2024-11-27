// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA3x3zxzzQtKDZUspujQMfO3F1PxQCskg",
  authDomain: "notekeeping-e82b6.firebaseapp.com",
  projectId: "notekeeping-e82b6",
  storageBucket: "notekeeping-e82b6.firebasestorage.app",
  messagingSenderId: "968641296270",
  appId: "1:968641296270:web:5205d7cbca48ab5875d6df",
  measurementId: "G-59QHNEK6W0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
