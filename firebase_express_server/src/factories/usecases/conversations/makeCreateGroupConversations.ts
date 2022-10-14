import {appCreateGroupConversation} from "@message_now/application";
import makeFirebaseConversationsRepository from "../../repositories/makeFirebaseConversationsRepository";
import makeFirebaseMessagesRepository from "../../repositories/makeFirebaseMessagesRepository";
import {makeLoggingEventChannelFactory} from "../../event/makeLoggingEventChannelFactory";

const makeCreateGroupConversations =
    () => appCreateGroupConversation(
        makeFirebaseConversationsRepository(),
        makeFirebaseMessagesRepository(),
        makeLoggingEventChannelFactory()
    );

export default makeCreateGroupConversations;
