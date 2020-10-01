import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyCfD321xJMor9MK9g74T6iGqUQ50f6NWws",
    authDomain: "clone-3b84b.firebaseapp.com",
    databaseURL: "https://clone-3b84b.firebaseio.com",
    projectId: "clone-3b84b",
    storageBucket: "clone-3b84b.appspot.com",
    messagingSenderId: "731477814523",
    appId: "1:731477814523:web:0c59ad39d635e57c84545e",
    measurementId: "G-W8MXV4W23Z"
  };

const firebaseApp=firebase.initializeApp(firebaseConfig);

const db=firebaseApp.firestore();
const auth=firebase.auth();

export {db,auth};