import {MessagesRepository} from "./repository";
import {ConversationsRepository} from "../conversation";
import {broadcastUserEvent} from "../channel";
import {Create, IMessage} from "@message_now/core";
import {updateConversation} from "../conversation";
import {UserEventChannelFactory} from "../channel";

export const createAndBroadcastMessage = async (
    message: Create<IMessage>,
    messageRepository: MessagesRepository,
    userChannelFactory: UserEventChannelFactory,
    conversationRepository: ConversationsRepository) => {
    const createdMessage = await messageRepository.save(message);
    const conversation = await updateConversation(
        createdMessage.conversationId,
        {lastMessage: createdMessage},
        conversationRepository, userChannelFactory);
    broadcastUserEvent({
        type: "message-created",
        data: createdMessage
    }, conversation.participants, userChannelFactory);
    return createdMessage;
}