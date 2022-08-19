import firebase from "firebase"

import firebaseConfig from "src/config/firebase";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore(firebaseApp);

const firebaseAuth = firebase.auth(firebaseApp);

const firebaseStorage = firebase.storage(firebaseApp);
const analytics = firebase.analytics(firebaseApp);

export {firestore, firebaseApp, firebaseAuth, analytics, firebaseStorage, firebase};
