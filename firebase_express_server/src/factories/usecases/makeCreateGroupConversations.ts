import {constructAppCreateGroupConversation} from "@message_now/application";
import makeFirebaseConversationRepository from "../../factories/repositories/makeFirebaseConversationRepository";
import makeFirebaseConversationMessagesRepository
    from "../../factories/repositories/makeFirebaseConversationMessagesRepository";
import makeFirebaseUserConversationsRepository
    from "../../factories/repositories/makeFirebaseUserConversationsRepository";
import makeFirebaseUserConversationMessagesRepository
    from "../../factories/repositories/makeFirebaseUserConversationMessagesRepository";

const makeCreateGroupConversations =
    () => constructAppCreateGroupConversation(
        makeFirebaseConversationRepository(),
        makeFirebaseConversationMessagesRepository,
        makeFirebaseUserConversationsRepository,
        makeFirebaseUserConversationMessagesRepository);

export default makeCreateGroupConversations;
