// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFQY2vDx_6kb5Q362Q2nNwjBf9wqJFazY",
  authDomain: "flashcard-saas-caf9b.firebaseapp.com",
  projectId: "flashcard-saas-caf9b",
  storageBucket: "flashcard-saas-caf9b.appspot.com",
  messagingSenderId: "651505280203",
  appId: "1:651505280203:web:41c42639136fff8e98274e",
  measurementId: "G-V34CQ1KJ4H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, analytics };
