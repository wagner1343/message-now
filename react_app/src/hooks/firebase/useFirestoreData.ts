import { useSelector } from "src/store";

export default function useFirestoreData<T>(storeAs: string) {
  const storeAsComponents = storeAs?.split("/");
  const isDocument = storeAsComponents.length % 2 === 0;
  const collectionStoreAs = storeAsComponents
    .slice(0, storeAsComponents.length - (isDocument ? 1 : 0))
    .join("/");
  const data = useSelector<Record<string, T>>(
    (state) => state.firestore.data[collectionStoreAs]
  );
  const ordered = useSelector<T[]>(
    (state) => state.firestore.ordered[collectionStoreAs]
  );
  const isLoaded = useSelector(
    (state) => state.firestore.status.requested[collectionStoreAs]
  );
  const isLoading = useSelector(
    (state) => state.firestore.status.requesting[collectionStoreAs]
  );

  return {
    data,
    isLoaded,
    isLoading,
    ordered,
  };
}
