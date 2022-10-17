import {Conversation, Create, IConversation} from "@message_now/core";
import {ConversationsRepository} from "./repository";
import {UserEventChannelFactory} from "../channel";
import {broadcastUserEvent} from "../channel";

export const createConversation = async (
    conversation: Create<IConversation>,
    conversationRepository: ConversationsRepository,
    userChannelFactory: UserEventChannelFactory
): Promise<Conversation> => {
    const createdConversation = await conversationRepository.save(conversation);
    await broadcastUserEvent({
        type: "conversation-created",
        data: createdConversation
    }, conversation.participants, userChannelFactory);
    return createdConversation;
};
