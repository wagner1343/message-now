import {Entity} from "@message_now/core";
import admin from "firebase-admin";

export class EntityConverter<T extends Entity> implements admin.firestore.FirestoreDataConverter<T> {

    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): T;
    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): T;
    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): T {
        return {id: snapshot.id, ...snapshot.data()} as T;
    }

    toFirestore(modelObject: T): FirebaseFirestore.DocumentData;
    toFirestore(modelObject: Partial<T>, options: FirebaseFirestore.SetOptions): FirebaseFirestore.DocumentData;
    toFirestore(modelObject: T): FirebaseFirestore.DocumentData;
    toFirestore(modelObject: Partial<T>, options: FirebaseFirestore.SetOptions): FirebaseFirestore.DocumentData;
    toFirestore(modelObject: T | Partial<T>, options?: FirebaseFirestore.SetOptions): FirebaseFirestore.DocumentData {
        return JSON.parse(JSON.stringify(modelObject));
    }

}