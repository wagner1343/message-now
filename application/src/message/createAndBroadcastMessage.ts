import {broadcastMessageUpdated} from "./broadcastMessageUpdated";
import {Create, IMessage} from "@message_now/core";
import {MessagesRepository} from "../repository/MessagesRepository";
import {
    UserConversationMessagesRepositoryFactory
} from "../repository/factories/UserConversationMessagesRepositoryFactory";
import {ConversationRepository} from "../repository/ConversationRepository";
import {broadcastConversationUpdated} from "../conversation/broadcastConversationUpdated";
import {UserConversationRepositoryFactory} from "../repository/factories/UserConversationRepositoryFactory";

export const createAndBroadcastMessage = async (
    message: Create<IMessage>,
    messageRepository: MessagesRepository,
    userConversationMessagesRepositoryFactory: UserConversationMessagesRepositoryFactory,
    userConversationRepositoryFactory: UserConversationRepositoryFactory,
    conversationRepository: ConversationRepository) => {
    const createdMessage = await messageRepository.save(message);
    await conversationRepository.update(createdMessage.conversationId, {lastMessage: createdMessage});
    const  conversation = await conversationRepository.get(createdMessage.conversationId);

    broadcastMessageUpdated(createdMessage, conversationRepository, userConversationMessagesRepositoryFactory);
    broadcastConversationUpdated(conversation, userConversationRepositoryFactory);

    return createdMessage;
}