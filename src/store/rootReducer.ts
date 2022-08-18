import {combineReducers} from "@reduxjs/toolkit";
import {FirebaseReducer, firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";

import {Profile} from "src/context/hooks/auth/useAuth";


const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer as <
    Schema extends Record<string, any> = any
    >(state: any, action: any) => FirebaseReducer.Reducer<Profile, Schema>
});

export default rootReducer;