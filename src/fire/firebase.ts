import firebase from "firebase";
import emulatorsConfig from "src/config/emulators";
import firebaseConfig from "src/config/firebase";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firestore = firebaseApp.firestore();
firestore.settings({ ignoreUndefinedProperties: true });
if (emulatorsConfig.useFirestoreEmulator) {
  firestore.useEmulator(
    emulatorsConfig.firestoreHost,
    emulatorsConfig.firestorePort
  );
}

const firebaseAuth = firebaseApp.auth();
if (emulatorsConfig.useAuthEmulator) {
  firebaseAuth.useEmulator(emulatorsConfig.authUrl);
}

const firebaseFunctions = firebaseApp.functions();
if (emulatorsConfig.useFirestoreEmulator) {
  firebaseFunctions.useEmulator(
    emulatorsConfig.functionsHost,
    emulatorsConfig.functionsPort
  );
}

const firebaseStorage = firebaseApp.storage();
const analytics = firebaseApp.analytics();

export { firestore, firebaseApp, firebaseAuth, analytics, firebaseStorage };
export default firebase;
