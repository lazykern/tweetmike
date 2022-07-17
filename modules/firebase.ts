// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBdrJp_PE4CBvvYScb96R26XEFLyMaEQTY',
  authDomain: 'tweetmike-714db.firebaseapp.com',
  projectId: 'tweetmike-714db',
  storageBucket: 'tweetmike-714db.appspot.com',
  messagingSenderId: '199958691923',
  appId: '1:199958691923:web:1cada5ab1f2c6accc806a6',
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(firebase_app);
