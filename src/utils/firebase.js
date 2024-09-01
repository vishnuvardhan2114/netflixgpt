// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnVyJmuWQ_S9wPU-RWXoIomSV2SIwT1Yk",
  authDomain: "netflixgpt-f8421.firebaseapp.com",
  projectId: "netflixgpt-f8421",
  storageBucket: "netflixgpt-f8421.appspot.com",
  messagingSenderId: "1057885845225",
  appId: "1:1057885845225:web:3562872dd4444167836278",
  measurementId: "G-EWE06DYB1S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();