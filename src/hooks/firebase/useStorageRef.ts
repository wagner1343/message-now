import { useFirebase, useFirestore } from "react-redux-firebase";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import firebase from "firebase";
import useAuth from "src/context/hooks/auth/useAuth";

interface StorageRefOptions {
  docPath?: string;
  fieldName?: string;
  storagePath?: string;
  fileName?: string;
}
export default function useStorageRef(options?: StorageRefOptions) {
  const { auth } = useAuth();
  const firebaseRef = useFirebase();
  const firestore = useFirestore();
  const storage = firebaseRef.storage();

  const docPath = options?.docPath ?? `users/${auth.uid}/uploads/${uuidv4()}`;
  const fieldName = options?.fieldName ?? "fileUrl";
  const storagePath = options?.storagePath ?? docPath;
  const fileName = options?.fileName ?? "file";

  const [downloadUrl, setDownloadUrl] = useState<string | undefined>();
  const [uploadState, setUploadState] = useState<
    firebase.storage.UploadTaskSnapshot | undefined
  >();
  const uploadProgress = uploadState
    ? uploadState.bytesTransferred / uploadState.totalBytes
    : undefined;

  const uploadFile = async (file: File, filename?: string) => {
    const upload = storage
      .ref(storagePath)
      .child(filename ?? fileName)
      .put(file, { cacheControl: "public, max-age=864000" });
    upload.on(firebase.storage.TaskEvent.STATE_CHANGED, (taskSnapshot) =>
      setUploadState(taskSnapshot as any)
    );
    return upload.then(async (taskSnapshot) => {
      const downloadUrl = await taskSnapshot.ref.getDownloadURL();
      setDownloadUrl(downloadUrl);
      await firestore
        .doc(docPath)
        .set({ [fieldName]: downloadUrl }, { merge: true });
    });
  };

  return {
    uploadFile,
    uploadState,
    uploadProgress,
    docPath,
    fieldName,
    downloadUrl,
    setDownloadUrl,
  };
}
