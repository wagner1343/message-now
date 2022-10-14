import {ListMessagesForConversation} from "@message_now/core";
import {MessagesRepository} from "../repository/MessagesRepository";

export const appListMessagesForConversation = (
    messagesRepository: MessagesRepository
): ListMessagesForConversation => {
    return async (conversationId, limit, skip) => {
        return await messagesRepository.list({
            limit,
            offset: skip,
            whereClauses: [{field: "conversationId", operator: "==", value: conversationId}]
        });
    }
};
