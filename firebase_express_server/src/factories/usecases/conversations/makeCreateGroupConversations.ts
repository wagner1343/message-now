import {appCreateGroupConversation} from "@message_now/application";
import makeFirebaseConversationsRepository from "../../repositories/makeFirebaseConversationsRepository";
import makeFirebaseMessagesRepository from "../../repositories/makeFirebaseMessagesRepository";
import {makeSocketIoUserEventChannel} from "../../event/makeSocketIoUserEventChannel";

const makeCreateGroupConversations =
    () => appCreateGroupConversation(
        makeFirebaseConversationsRepository(),
        makeFirebaseMessagesRepository(),
        makeSocketIoUserEventChannel()
    );

export default makeCreateGroupConversations;
