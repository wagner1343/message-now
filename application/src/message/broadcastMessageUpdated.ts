import {Message} from "@message_now/core";
import {ConversationRepository} from "../repository/ConversationRepository";
import {
    UserConversationMessagesRepositoryFactory
} from "../repository/factories/UserConversationMessagesRepositoryFactory";


export const broadcastMessageUpdated = async (
    message: Message,
    conversationRepository: ConversationRepository,
    userConversationMessagesRepositoryFactory: UserConversationMessagesRepositoryFactory) => {
    const {participants} = await conversationRepository.get(message.conversationId);
    await Promise.all(
        participants.map((participantId) =>
            userConversationMessagesRepositoryFactory(participantId, message.conversationId)
                .put(message.id, message)));
}