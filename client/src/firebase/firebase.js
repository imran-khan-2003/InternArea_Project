// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBibQk3GMuj41JiEvwcuFaZ-SlB-n2ys5k",
  authDomain: "internarea-b947e.firebaseapp.com",
  projectId: "internarea-b947e",
  storageBucket: "internarea-b947e.appspot.com",
  messagingSenderId: "427595985099",
  appId: "1:427595985099:web:b94becd49b2e2c2e412b4e",
  measurementId: "G-R68HDEWJ8J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export {auth,provider}