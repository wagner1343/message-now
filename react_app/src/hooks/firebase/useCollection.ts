import {useState} from "react";
import {ReduxFirestoreQuerySetting, useFirestore, useFirestoreConnect,} from "react-redux-firebase";
import useFirestoreData from "src/hooks/firebase/useFirestoreData";
import {v4 as uuidv4} from "uuid";

export default function useCollection<T>(
    collection: string,
    queryConfig?: ReduxFirestoreQuerySetting
) {
    const [storeAsValue] = useState(queryConfig?.storeAs ?? uuidv4());

    const firestore = useFirestore();
    const [currentLimit, setLimit] = useState(queryConfig?.limit);
    useFirestoreConnect({
        ...queryConfig,
        collection,
        storeAs: storeAsValue,
        limit: currentLimit,
    });

    const {data, ordered, isLoading, isLoaded} =
        useFirestoreData<T>(storeAsValue);

    const hasMore = (ordered?.length ?? 0) === currentLimit;
    const loadMore = (count: number) =>
        currentLimit && setLimit(currentLimit + count);
    const getDocumentPath = (id: string) => `${collection}/${id}`;

    const create = async (data: Partial<T>) => {
        return await firestore.add<T>(collection, data);
    };
    const update = async (id: string, data: Partial<T>) => {
        return await firestore.update<T>(getDocumentPath(id), data);
    };

    const set = async (id: string, data: Partial<T>) => {
        return await firestore.set<T>(getDocumentPath(id), data);
    };

    const deleteDoc = async (id: string) => {
        return await firestore.delete(getDocumentPath(id));
    };

    const reference = firestore.collection(collection);
    return {
        setLimit,
        currentLimit,
        reference,
        data,
        ordered,
        isLoaded,
        isLoading,
        update,
        create,
        deleteDoc,
        hasMore,
        loadMore,
        set,
    };
}
