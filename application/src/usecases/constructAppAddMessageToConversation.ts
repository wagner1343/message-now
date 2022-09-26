import {AddMessageToConversation} from "@message_now/core";
import {createAndBroadcastMessage} from "../message/createAndBroadcastMessage";
import {createNewMessage} from "../message/createNewMessage";
import {ConversationMessagesRepositoryFactory} from "../repository/factories/ConversationMessagesRepositoryFactory";
import {
    UserConversationMessagesRepositoryFactory
} from "../repository/factories/UserConversationMessagesRepositoryFactory";
import {ConversationRepository} from "../repository/ConversationRepository";
import {UserConversationRepositoryFactory} from "../repository/factories/UserConversationRepositoryFactory";

export const constructAppAddMessageToConversation = (
    messageRepositoryFactory: ConversationMessagesRepositoryFactory,
    userConversationMessagesRepositoryFactory: UserConversationMessagesRepositoryFactory,
    conversationRepository: ConversationRepository,
    userConversationRepositoryFactory: UserConversationRepositoryFactory
    ): AddMessageToConversation => {
    return async (conversationId, authorId, body) => {
        return await createAndBroadcastMessage(
            createNewMessage(body, conversationId, authorId),
            messageRepositoryFactory(conversationId),
            userConversationMessagesRepositoryFactory,
            userConversationRepositoryFactory,
            conversationRepository
        );
    }
};
