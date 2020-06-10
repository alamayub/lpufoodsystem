import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'
var firebaseConfig = {
  apiKey: "AIzaSyAQv7NciOuHBuqkpo-F2ncwynFNg5wV9uw",
  authDomain: "project-6145e.firebaseapp.com",
  databaseURL: "https://project-6145e.firebaseio.com",
  projectId: "project-6145e",
  storageBucket: "project-6145e.appspot.com",
  messagingSenderId: "976848846935",
  appId: "1:976848846935:web:96f81b86ac6108e2cba312",
  measurementId: "G-1X47E9C47Z"
};
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { fb, db }