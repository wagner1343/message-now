import {FirebaseRepository} from "@message_now/firebase";
import {Conversation} from "@message_now/core";
import {firestore} from "../../firebase/firebase";
import {EntityConverter} from "@message_now/firebase";

const makeFirebaseUserConversationsRepository =
    (userId: string) => new FirebaseRepository<Conversation>(
        firestore.collection("users")
            .doc(userId)
            .collection("conversations")
            .withConverter<Conversation>(new EntityConverter<Conversation>()));

export default makeFirebaseUserConversationsRepository;
