import {FirebaseRepository} from "@message_now/firebase";
import {Message} from "@message_now/core";
import {firestore} from "../../firebase/firebase";
import {EntityConverter} from "@message_now/firebase";

const makeFirebaseMessagesRepository =
    () => new FirebaseRepository<Message>(
        firestore.collection("messages")
            .withConverter(new EntityConverter<Message>()));

export default makeFirebaseMessagesRepository;
