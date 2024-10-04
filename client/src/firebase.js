import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAK-mlQsiqA6M4TqM-bOLeh6Cdkj1R0udA",
  authDomain: "e-store-e34f4.firebaseapp.com",
  projectId: "e-store-e34f4",
  storageBucket: "e-store-e34f4.appspot.com",
  messagingSenderId: "510996032693",
  appId: "1:510996032693:web:7d20f44a016083f4bfa2fc",
  measurementId: "G-S8S59K144Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();











