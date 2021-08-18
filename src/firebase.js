import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA00aNs-g-umI6y2XZX5tzMIk7Mc29ZXmE",
    authDomain: "whatsapp-mern-6d45e.firebaseapp.com",
    projectId: "whatsapp-mern-6d45e",
    storageBucket: "whatsapp-mern-6d45e.appspot.com",
    messagingSenderId: "225550208765",
    appId: "1:225550208765:web:020665463be0123884f894"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;