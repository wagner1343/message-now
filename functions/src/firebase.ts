import * as admin from "firebase-admin";
const firebaseConfig = {
    apiKey: "AIzaSyCqohZ7_KklINa4Jkx0GB0O7YJalgGOEvA",
    authDomain: "wagner-whatsapp-clone.firebaseapp.com",
    projectId: "wagner-whatsapp-clone",
    storageBucket: "wagner-whatsapp-clone.appspot.com",
    messagingSenderId: "118175880497",
    appId: "1:118175880497:web:8aed782fad55246d44cc10",
    measurementId: "G-8YF8PD26KR"
};
export const firebaseApp = admin.initializeApp(firebaseConfig);
export const firebaseAdmin = admin;
export const firestore = firebaseApp.firestore();
export const firebaseAuth = firebaseApp.auth();

firestore.settings({ignoreUndefinedProperties: true})

