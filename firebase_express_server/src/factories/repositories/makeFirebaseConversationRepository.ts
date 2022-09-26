import {FirebaseRepository} from "@message_now/firebase";
import {Conversation} from "@message_now/core";
import {firestore} from "../../firebase/firebase";
import {EntityConverter} from "@message_now/firebase";

const makeFirebaseConversationRepository =
    () => new FirebaseRepository<Conversation>(
        firestore
            .collection("conversations")
            .withConverter(new EntityConverter<Conversation>()));

export default makeFirebaseConversationRepository;