import {FirebaseRepository} from "@message_now/firebase";
import {Message} from "@message_now/core";
import {firestore} from "../../firebase/firebase";
import {EntityConverter} from "@message_now/firebase";

const makeFirebaseUserConversationMessagesRepository =
    (userId: string, conversationId: string) => new FirebaseRepository<Message>(
        firestore
            .collection("users")
            .doc(userId)
            .collection("conversations")
            .doc(conversationId)
            .collection("messages")
            .withConverter(new EntityConverter<Message>()));

export default makeFirebaseUserConversationMessagesRepository;
