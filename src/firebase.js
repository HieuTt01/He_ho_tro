import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage"; 

var firebaseConfig = {
    apiKey: "AIzaSyBLU_lmAwAZzSPifQlwEOe5vWnRYmTMO5c",
    authDomain: "dsshehotro2020.firebaseapp.com",
    projectId: "dsshehotro2020",
    storageBucket: "dsshehotro2020.appspot.com",
    messagingSenderId: "941728526273",
    appId: "1:941728526273:web:58db3d0183cebefe0b8940",
    measurementId: "G-PT44XJCS31"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
  export default firebase; 