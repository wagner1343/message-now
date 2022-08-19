import {Conversation} from "@message_now/core";
import {ConversationRepository} from "src/conversation/ConversationRepository";
import {ConversationMessagesRepository} from "src/message/ConversationMessagesRepository";
import {broadcastConversationUpdated} from "src/conversation/broadcastConversationUpdated";
import {UserConversationRepositoryFactory} from "src/conversation/UserConversationRepository";

export const createAndBroadcastConversation = async (
    conversation: Conversation,
    conversationRepository: ConversationRepository,
    messageRepository: ConversationMessagesRepository,
    userConversationRepositoryFactory: UserConversationRepositoryFactory,
): Promise<Conversation> => {
    const createdConversation = await conversationRepository.save(conversation);
    await broadcastConversationUpdated(createdConversation, userConversationRepositoryFactory)
    return createdConversation;
};
