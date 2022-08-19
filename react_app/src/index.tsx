import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider as ReactReduxProvider} from "react-redux";
import {ReactReduxFirebaseProvider} from "react-redux-firebase";
import {createFirestoreInstance} from "redux-firestore";
import store from "src/store";
import {firebase} from "src/fire/firebase";
import {render} from "react-dom";

const rrfConfig = {
    userProfile: "profiles",
    useFirestoreForProfile: true,
};

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
};
render(
    <React.StrictMode>
        <ReactReduxProvider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <App/>
            </ReactReduxFirebaseProvider>
        </ReactReduxProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
