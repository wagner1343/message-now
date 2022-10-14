import {MessagesRepository} from "./repository/MessagesRepository";
import {ConversationsRepository} from "../conversation/repository/ConversationsRepository";
import {broadcastUserEvent} from "../channel/user/broadcastUserEvent";
import {Create, IMessage} from "@message_now/core";
import {updateConversation} from "../conversation/updateConversation";
import {UserEventChannelFactory} from "../channel/user/UserEventChannelFactory";

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