// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'

import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYOIVZqI4KK0EIy9eZZ8gWt7j0tvlrt6E",
  authDomain: "qipa-project.firebaseapp.com",
  projectId: "qipa-project",
  storageBucket: "qipa-project.appspot.com",
  messagingSenderId: "1001885740223",
  appId: "1:1001885740223:web:275975aa14f64569a5aa0a",
  measurementId: "G-3XKHVC0R92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

// console.log(db)
// const analytics = getAnalytics(app);