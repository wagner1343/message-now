import {broadcastMessageUpdated} from "src/message/broadcastMessageUpdated";
import {ConversationRepository} from "src/conversation/ConversationRepository";
import {UserConversationMessagesRepositoryFactory} from "src/repository/UserConversationMessagesRepository";
import {ConversationMessagesRepository} from "src/repository/ConversationMessagesRepository";
import {Message} from "@message_now/core";

export const createAndBroadcastMessage = async (
    message: Message,
    messageRepository: ConversationMessagesRepository,
    userConversationMessagesRepositoryFactory: UserConversationMessagesRepositoryFactory,
    conversationRepository: ConversationRepository) => {
    const createdMessage = await messageRepository.save(message);
    broadcastMessageUpdated(createdMessage, conversationRepository, userConversationMessagesRepositoryFactory);
    return createdMessage;
}