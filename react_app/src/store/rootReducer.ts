import {combineReducers, compose, createStore} from "@reduxjs/toolkit";
import {FirebaseReducer, firebaseReducer} from "react-redux-firebase";
import {firestoreReducer, reduxFirestore} from "redux-firestore";
import {Profile} from "@message_now/core";

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer as <
    Schema extends Record<string, any> = any
    >(state: any, action: any) => FirebaseReducer.Reducer<Profile, Schema>
});

export default rootReducer;