import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyCeJ8lGTqwAjCEaT6i6hdXG3naX6NQdz8g",
    authDomain: "linkmee-8aecf.firebaseapp.com",
    databaseURL: "https://linkmee-8aecf.firebaseio.com",
    projectId: "linkmee-8aecf",
    storageBucket: "linkmee-8aecf.appspot.com",
    messagingSenderId: "416100227519",
    appId: "1:416100227519:web:05759cd51ff17809be290a",
    measurementId: "G-M38MRT3645"
}


const firebaseApp = firebase.initializeApp(firebaseConfig)


const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()


export { db, auth, provider }