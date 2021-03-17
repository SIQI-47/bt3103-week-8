import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAXklTaqA8C4Dn-xOU8Y4nRk8KX8lar-ig",
    authDomain: "bt3103-week-6-1a7d6.firebaseapp.com",
    projectId: "bt3103-week-6-1a7d6",
    storageBucket: "bt3103-week-6-1a7d6.appspot.com",
    messagingSenderId: "752547108173",
    appId: "1:752547108173:web:3df683e912e643d3e35304",
    measurementId: "G-R2539VZR3J"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;