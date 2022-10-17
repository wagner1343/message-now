import makeFirebaseMessagesRepository from "../../repositories/makeFirebaseMessagesRepository";
import {appListMessagesForConversation} from "@message_now/application";

const makeListMessagesForConversation = () => appListMessagesForConversation(
    makeFirebaseMessagesRepository(),
)

export default makeListMessagesForConversation;
