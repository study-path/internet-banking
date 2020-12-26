import 'firebase/database';

import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDDgxqe0slXm5-CzEbKa-A5fdrDc-craVA1",
  authDomain: "internet-banking-study-project.firebaseapp.com",
  projectId: "internet-banking-study-project",
  storageBucket: "internet-banking-study-project.appspot.com",
  messagingSenderId: "209063939992",
  appId: "1:209063939992:web:615928ebe6c7f602d8a5ed"
};
// Initialize Firebase
const app  = firebase.initializeApp(firebaseConfig);

 export const db = app.database();



