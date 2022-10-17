import {isEmpty, useFirebase, useFirestore} from "react-redux-firebase";
import {useSelector} from "src/store";
import fire from "firebase"
import useDocument from "src/hooks/firebase/useDocument";
import {useEffect} from "react";
import axios from "src/axios/axios";
import {Profile, User} from "@message_now/core";

export default function useAuth() {
    const firestore = useFirestore();
    const firebase = useFirebase();
    const firebaseAuth = firebase.auth();
    const storage = firebase.storage();
    const profile = useSelector<Profile>((state) => state.firebase.profile);
    const userDataDoc = useDocument<User>("users", firebaseAuth.currentUser?.uid ?? "");

    useEffect(() => {
        const idTokenChangedUnsub = firebaseAuth.onIdTokenChanged(async (user) => {
            await setUserToken(user);
        })
        setUserToken(firebaseAuth.currentUser);

        return () => idTokenChangedUnsub();
    }, [])

    const setUserToken = async (user: any | null) => {
        const token = await user?.getIdToken();

        if (token) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        }
    }

    async function addContact(contactId: string) {
        const user = firebaseAuth.currentUser;
        if (!user) {
            return;
        }
        await firestore.collection("users").doc(user.uid).set({
            contacts: firebase.firestore.FieldValue.arrayUnion(contactId)
        }, {
            merge: true
        });
    }

    async function register(
        firstname: string,
        email: string,
        password: string,
    ) {
        const credential = await firebaseAuth.createUserWithEmailAndPassword(
            email,
            password
        );
        await credential.user?.sendEmailVerification();
        return credential.user;
    }

    async function signInWithGoogle() {
        await firebaseAuth.signInWithPopup(new fire.auth.GoogleAuthProvider());
    }

    async function updateEmail(email: string) {
        await firebaseAuth.currentUser?.updateEmail(email);
    }

    async function updatePassword(senha: string) {
        await firebaseAuth.currentUser?.updatePassword(senha);
    }

    async function login(email: string, password: string) {
        return await firebaseAuth.signInWithEmailAndPassword(email, password);
    }

    async function logout() {
        return await firebaseAuth.signOut();
    }

    const auth = useSelector((state) => state.firebase.auth);

    return {
        addContact,
        signInWithGoogle,
        register,
        login,
        userDataDoc,
        logout,
        updateEmail,
        updatePassword,
        auth,
        profile,
        isAuthenticated: !isEmpty(auth),
        firebaseAuth
    };
}
