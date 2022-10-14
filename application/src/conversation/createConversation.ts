import {Conversation} from "@message_now/core";
import {Create} from "@message_now/core";
import {IConversation} from "@message_now/core";
import {ConversationsRepository} from "./repository/ConversationsRepository";
import {UserEventChannelFactory} from "../channel/user/UserEventChannelFactory";
import {broadcastUserEvent} from "../channel/user/broadcastUserEvent";

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
