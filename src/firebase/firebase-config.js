import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDLzTOrn8prcb4bwNeWIMdQ_Iuyitk3E7Q",
    authDomain: "react-apps-cursos-e4f97.firebaseapp.com",
    databaseURL: "https://react-apps-cursos-e4f97.firebaseio.com",
    projectId: "react-apps-cursos-e4f97",
    storageBucket: "react-apps-cursos-e4f97.appspot.com",
    messagingSenderId: "860102744592",
    appId: "1:860102744592:web:fe999da606578e2f574895"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// base de datos
const db = firebase.firestore();

//referencia para poder loguearme con google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}