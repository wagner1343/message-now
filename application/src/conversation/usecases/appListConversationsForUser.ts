import {ListConversationsForUser} from "@message_now/core";
import {ConversationsRepository} from "../repository/ConversationsRepository";

export const appListConversationsForUser = (
    conversationsRepository: ConversationsRepository
): ListConversationsForUser => {
    return async (userId, limit, skip) => {
        return await conversationsRepository.list({
            limit,
            offset: skip,
            whereClauses: [{field: "participants", operator: "array-contains", value: userId}]
        });
    }
};
