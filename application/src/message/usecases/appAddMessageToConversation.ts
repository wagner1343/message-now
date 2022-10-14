import {AddMessageToConversation} from "@message_now/core";
import {createAndBroadcastMessage} from "../createAndBroadcastMessage";
import {createNewMessage} from "../createNewMessage";
import {ConversationsRepository} from "../../conversation";
import {UserEventChannelFactory} from "../../channel";
import {MessagesRepository} from "../repository";

export const appAddMessageToConversation = (
    messageRepository: MessagesRepository,
    conversationRepository: ConversationsRepository,
    userChannelFactory: UserEventChannelFactory
    ): AddMessageToConversation => {
    return async (conversationId, authorId, body) => {
        return await createAndBroadcastMessage(
            createNewMessage(body, authorId, conversationId),
            messageRepository,
            userChannelFactory,
            conversationRepository
        );
    }
};
