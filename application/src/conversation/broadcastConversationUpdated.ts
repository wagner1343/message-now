import {Conversation} from "@message_now/core";
import {UserConversationRepositoryFactory} from "../repository/factories/UserConversationRepositoryFactory";

export const broadcastConversationUpdated = async (conversation: Conversation, userConversationRepositoryFactory: UserConversationRepositoryFactory) => {
    const {participants} = conversation;
    await Promise.all(
        participants.map(
            (participantId) =>
                userConversationRepositoryFactory(participantId)
                    .put(conversation.id, conversation)));
}