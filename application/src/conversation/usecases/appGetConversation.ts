import {GetConversation} from "@message_now/core";
import {ConversationsRepository} from "../repository/ConversationsRepository";

export const appGetConversation = (
    conversationsRepository: ConversationsRepository
): GetConversation => {
    return async (conversationId) => {
        return await conversationsRepository.get(conversationId);
    }
};
