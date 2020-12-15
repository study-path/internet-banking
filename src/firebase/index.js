import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAsVaYp-YOL3cCBVbX87a1bXZFUMUiqDRM",
  authDomain: "test-internet-banking.firebaseapp.com",
  databaseURL: "https://test-internet-banking.firebaseio.com",
  projectId: "test-internet-banking",
  storageBucket: "test-internet-banking.appspot.com",
  messagingSenderId: "877765360243",
  appId: "1:877765360243:web:0bb31bada9fb616d714806"
};
// Initialize Firebase
const app  = firebase.initializeApp(firebaseConfig);

 export const db = app.database();
// export const auth = app.auth();



