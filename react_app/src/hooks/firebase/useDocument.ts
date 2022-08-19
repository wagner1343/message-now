import { useFirestore, useFirestoreConnect } from "react-redux-firebase";

import { useSelector } from "src/store";

export default function useDocument<T>(collection: string, documentId: string) {
  const firestore = useFirestore();
  useFirestoreConnect({ collection, doc: documentId });

  const path = `${collection}/${documentId}`;

  const data = useSelector<T | undefined>(
    (state) => state.firestore.data[collection]?.[documentId]
  );
  const isLoaded = useSelector(
    (state) => state.firestore.status.requested[path]
  );
  const isLoading = useSelector(
    (state) => state.firestore.status.requesting[path]
  );

  const set = async (data: Partial<T>) => {
    return await firestore.set(path, data);
  };
  const update = async (data: Partial<T>) => {
    return await firestore.update(path, data);
  };
  const deleteDocument = async () => {
    return await firestore.delete(path);
  };

  const reference = firestore.doc(path);
  return {
    path,
    reference,
    data: data
      ? ({ ...data, id: documentId } as T & { id: string })
      : undefined,
    isLoaded,
    isLoading,
    update,
    set,
    deleteDocument,
    firestore,
  };
}
