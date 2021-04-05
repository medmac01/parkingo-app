import * as firebase from 'firebase';

import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDmZ0OurZJwTx0WLJ2tw6hwS4rvIHUf0Zo",
    authDomain: "uemf-park-27c5e.firebaseapp.com",
    projectId: "uemf-park-27c5e",
    storageBucket: "uemf-park-27c5e.appspot.com",
    messagingSenderId: "347364684378",
    appId: "1:347364684378:web:8052f2272879abeee41e63"
  };

  let app;

  if(firebase.app.length === 0) {
      app = firebase.initializeApp(firebaseConfig);
  } else {
      app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth()