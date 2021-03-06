import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCYvrH5enKFmqWr0M8Is14ryzfND3JejDY",
    authDomain: "crwn-db-13add.firebaseapp.com",
    databaseURL: "https://crwn-db-13add.firebaseio.com",
    projectId: "crwn-db-13add",
    storageBucket: "crwn-db-13add.appspot.com",
    messagingSenderId: "501519408374",
    appId: "1:501519408374:web:032bc9b59fab50749d20d7",
    measurementId: "G-Y3YZHYQV3J"
  };

  export const createUserProfileDocument = async ( userAuth, additionalData) => {
      if (!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);
      const snapShot = await userRef.get();
      
      if(!snapShot.exists) {
          const { displayName, email } = userAuth;
          const createdAt = new Date();

          try {
              await userRef.set({
                  displayName,
                  email,
                  createdAt,
                  ...additionalData
              })

          } catch (error) {
              console.log('error creating user', error.message);
          }
      }

      return userRef;



  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase; 