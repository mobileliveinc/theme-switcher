import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDt30_qvDBOzvAPSiO3GC-CKRr3OLed4AA",
  authDomain: "figma-plugin.firebaseapp.com",
  databaseURL: "https://figma-plugin.firebaseio.com",
  projectId: "figma-plugin",
  storageBucket: "figma-plugin.appspot.com",
  messagingSenderId: "492195904348",
  appId: "1:492195904348:web:71ecdc6c319b48d48c5f99",
  measurementId: "G-5164Y0M9DR",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
