import {constructAppAddMessageToConversation} from "@message_now/application";
import makeFirebaseConversationMessagesRepository
    from "../../factories/repositories/makeFirebaseConversationMessagesRepository";
import makeFirebaseConversationRepository from "../../factories/repositories/makeFirebaseConversationRepository";
import makeFirebaseUserConversationMessagesRepository
    from "../../factories/repositories/makeFirebaseUserConversationMessagesRepository";
import makeFirebaseUserConversationsRepository from "../repositories/makeFirebaseUserConversationsRepository";

const makeAddConversationMessage = () => constructAppAddMessageToConversation(
    makeFirebaseConversationMessagesRepository,
    makeFirebaseUserConversationMessagesRepository,
    makeFirebaseConversationRepository(),
    makeFirebaseUserConversationsRepository
)

export default makeAddConversationMessage;