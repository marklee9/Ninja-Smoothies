import firebase from 'firebase/app';
import firestore from 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyC_orDLOWwhl_cXJtwlvFEkPIWQQC5Bmlk",
  authDomain: "sample1-c5488.firebaseapp.com",
  databaseURL: "https://sample1-c5488.firebaseio.com",
  projectId: "sample1-c5488",
  storageBucket: "sample1-c5488.appspot.com",
  messagingSenderId: "910696363382",
  appId: "1:910696363382:web:20b26b36cc2e32d0"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// by exporting we can later on import it and interact with our database
export default firebaseApp.firestore();