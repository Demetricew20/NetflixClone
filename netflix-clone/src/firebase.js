// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiQ9lR0K2YE-WTitXnZaSktNIw_aSIe9M",
  authDomain: "netflix-clone-fd696.firebaseapp.com",
  projectId: "netflix-clone-fd696",
  storageBucket: "netflix-clone-fd696.appspot.com",
  messagingSenderId: "356728070999",
  appId: "1:356728070999:web:22f5c9557410bedcc19412"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = app.auth();

export { auth };
export default db;