import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyDhujhs0QryVyer5sZIK8BgsvTQ49B15FY",
    authDomain: "crwn-db-5ae19.firebaseapp.com",
    projectId: "crwn-db-5ae19",
    storageBucket: "crwn-db-5ae19.appspot.com",
    messagingSenderId: "64253319077",
    appId: "1:64253319077:web:0535afb7180644fd9bba4c",
    measurementId: "G-NYGDT32D2B"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// Trigger Google pop up when using Google Auth Provider for authentication
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;