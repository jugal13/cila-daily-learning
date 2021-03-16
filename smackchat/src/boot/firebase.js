import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: process.env.VUE_FIREBASE_API_KEY,
  authDomain: process.env.VUE_FIREBASE_AUTH_DOMAIN_KEY,
  projectId: process.env.VUE_FIREBASE_PROJECT_ID_KEY,
  storageBucket: process.env.VUE_FIREBASE_STORAGE_BUCKET_KEY,
  messagingSenderId: process.env.VUE_FIREBASE_MESSAGING_SENDER_ID_KEY,
  appId: process.env.VUE_FIREBASE_APP_ID_KEY
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth();
const firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb };
