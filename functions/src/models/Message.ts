import MessageMeta from "../models/MessageMeta";
import firebase from "firebase";

export default interface Message {
    id?: string;
    body: string;
    createdAt: firebase.firestore.Timestamp;
    meta: MessageMeta;
    authorId: string;
}