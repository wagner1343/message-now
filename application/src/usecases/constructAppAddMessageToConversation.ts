import {
    AddMessageToConversation,
    Message
} from "@message_now/core";
import {constructMessage} from "@message_now/core/dist/message/Message";
import {createAndBroadcastMessage} from "src/message/createAndBroadcastMessage";
import {ConversationRepository} from "src/conversation/ConversationRepository";
import {UserConversationMessagesRepositoryFactory} from "src/repository/UserConversationMessagesRepository";
import {ConversationMessagesRepository} from "src/repository/ConversationMessagesRepository";

export const constructAppAddMessageToConversation = (
    messageRepository: ConversationMessagesRepository,
    userConversationMessagesRepositoryFactory: UserConversationMessagesRepositoryFactory,
    conversationRepository: ConversationRepository): AddMessageToConversation => {
    return async (conversationId, authorId, body) => {
        return await createAndBroadcastMessage(
            constructMessage(body, authorId, conversationId),
            messageRepository,
            userConversationMessagesRepositoryFactory,
            conversationRepository
        );
    }
};
