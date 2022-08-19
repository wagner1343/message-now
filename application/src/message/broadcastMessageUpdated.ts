import {Message} from "@message_now/core";
import {ConversationRepository} from "src/conversation/ConversationRepository";
import {UserConversationMessagesRepositoryFactory} from "src/repository/UserConversationMessagesRepository";

export const broadcastMessageUpdated = async (
    message: Message,
    conversationRepository: ConversationRepository,
    userConversationMessagesRepositoryFactory: UserConversationMessagesRepositoryFactory) => {
    const {participants} = await conversationRepository.get(message.conversationId);
    await Promise.all(participants.map((participantId) => userConversationMessagesRepositoryFactory(participantId, message.conversationId).put(message.id, message)));
}