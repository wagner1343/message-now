import {appAddMessageToConversation} from "@message_now/application";
import makeFirebaseMessagesRepository from "../../repositories/makeFirebaseMessagesRepository";
import makeFirebaseConversationsRepository from "../../repositories/makeFirebaseConversationsRepository";
import {makeLoggingEventChannelFactory} from "../../event/makeLoggingEventChannelFactory";

const makeAddConversationMessage = () => appAddMessageToConversation(
    makeFirebaseMessagesRepository(),
    makeFirebaseConversationsRepository(),
    makeLoggingEventChannelFactory()
)

export default makeAddConversationMessage;
