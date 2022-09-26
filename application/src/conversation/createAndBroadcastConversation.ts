import {Conversation} from "@message_now/core";
import {broadcastConversationUpdated} from "./broadcastConversationUpdated";
import {Create} from "@message_now/core/src";
import {IConversation} from "@message_now/core";
import {ConversationRepository} from "../repository/ConversationRepository";
import {UserConversationRepositoryFactory} from "../repository/factories/UserConversationRepositoryFactory";

export const createAndBroadcastConversation = async (
    conversation: Create<IConversation>,
    conversationRepository: ConversationRepository,
    userConversationRepositoryFactory: UserConversationRepositoryFactory,
): Promise<Conversation> => {
    const createdConversation = await conversationRepository.save(conversation);
    await broadcastConversationUpdated(createdConversation, userConversationRepositoryFactory)
    return createdConversation;
};
