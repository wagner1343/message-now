import {isEmpty, useFirebase, useFirestore} from "react-redux-firebase";
import {useParams} from "react-router";

import {useSelector} from "src/store";

export interface Profile {
  name: string;
  id: string;
  coverUrl?: string;
  avatarUrl?: string;
  organizations?: string[];
  status: string;
  about: string;
  phone?: string;
  city?: string;
}

export default function useAuth() {
  const firestore = useFirestore();
  const firebase = useFirebase();
  const firebaseAuth = firebase.auth();
  const storage = firebase.storage();
  const {organizationId}: any = useParams();
  const profile = useSelector((state) => state.firebase.profile);
  
  async function register(
    firstname: string,
    email: string,
    password: string,
    privacyTermsAccepted: boolean,
    avatarPhoto?: File
  ) {
    const credential = await firebaseAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    const user = credential.user;
    
    if (!user) {
      return;
    }
    
    let avatarUrl: string | undefined = undefined;
    if (avatarPhoto) {
      const upload = await storage
        .ref(`users/${user.uid}/avatar`)
        .put(avatarPhoto);
      avatarUrl = await upload.ref.getDownloadURL();
    }
    await user.updateProfile({
      displayName: firstname?.split(" ")[0],
      photoURL: avatarUrl,
    });
    
    await firestore.set(
      {collection: "users", doc: user.uid},
      {
        avatarUrl,
        name: firstname,
        email,
        privacyTermsAccepted,
        id: user.uid,
      },
      {merge: true}
    );
    
    await user.sendEmailVerification();
    
    return user;
  }
  
  async function joinOrganization(userId, values) {
    await firestore.set(
      {collection: `organizations/${organizationId}/members`, doc: userId},
      {
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        isAdmin: false,
      },
      {merge: true}
    );
    
    await firestore.set({collection: "users", doc: userId}, {
      ...values,
      organizations: firestore.FieldValue.arrayUnion(organizationId)
    }, {
      merge: true,
    });
    
    
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
    register,
    login,
    logout,
    updateEmail,
    updatePassword,
    auth,
    profile,
    isAuthenticated: !isEmpty(auth),
    joinOrganization,
  };
}
