import {appAddMessageToConversation} from "@message_now/application";
import makeFirebaseMessagesRepository from "../../repositories/makeFirebaseMessagesRepository";
import makeFirebaseConversationsRepository from "../../repositories/makeFirebaseConversationsRepository";
import {makeSocketIoUserEventChannel} from "../../event/makeSocketIoUserEventChannel";

const makeAddConversationMessage = () => appAddMessageToConversation(
    makeFirebaseMessagesRepository(),
    makeFirebaseConversationsRepository(),
    makeSocketIoUserEventChannel()
)

export default makeAddConversationMessage;
