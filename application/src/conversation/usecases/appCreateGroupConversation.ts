import {ConversationType, CreateGroupConversation} from "@message_now/core";
import {createConversation} from "../createConversation";
import {createAndBroadcastMessage} from "../../message/createAndBroadcastMessage";
import {createNewMessage} from "../../message/createNewMessage";
import {ConversationsRepository} from "../repository/ConversationsRepository";
import {UserEventChannelFactory} from "../../channel/user/UserEventChannelFactory";
import {MessagesRepository} from "../../message/repository/MessagesRepository";

export const appCreateGroupConversation = (
    conversationRepository: ConversationsRepository,
    messageRepository: MessagesRepository,
    userChannelFactory: UserEventChannelFactory): CreateGroupConversation => {
    return async (title, participants) => {
        const conversation = await createConversation(
            {
                type: ConversationType.group,
                participants: participants,
                title,
            },
            conversationRepository,
            userChannelFactory
        );
        await createAndBroadcastMessage(
            createNewMessage("Group created", "system", conversation.id),
            messageRepository,
            userChannelFactory,
            conversationRepository);
        return conversation;
    }
};
