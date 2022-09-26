import { ConversationType, CreateGroupConversation} from "@message_now/core";
import {createAndBroadcastConversation} from "../conversation/createAndBroadcastConversation";
import {createAndBroadcastMessage} from "../message/createAndBroadcastMessage";
import {createNewMessage} from "../message/createNewMessage";
import {ConversationMessagesRepositoryFactory} from "../repository/factories/ConversationMessagesRepositoryFactory";
import {UserConversationRepositoryFactory} from "../repository/factories/UserConversationRepositoryFactory";
import {
    UserConversationMessagesRepositoryFactory
} from "../repository/factories/UserConversationMessagesRepositoryFactory";
import {ConversationRepository} from "../repository/ConversationRepository";

export const constructAppCreateGroupConversation = (
    conversationRepository: ConversationRepository,
    messageRepositoryFactory: ConversationMessagesRepositoryFactory,
    userConversationRepositoryFactory: UserConversationRepositoryFactory,
    userConversationMessagesRepositoryFactory: UserConversationMessagesRepositoryFactory): CreateGroupConversation => {
    return async (title, participants) => {
        const conversation = await createAndBroadcastConversation(
            {
                type: ConversationType.group,
                participants: participants,
                title,
            },
            conversationRepository,
            userConversationRepositoryFactory
        );
        createAndBroadcastMessage(
            createNewMessage("Group created", "system", conversation.id),
            messageRepositoryFactory(conversation.id),
            userConversationMessagesRepositoryFactory,
            userConversationRepositoryFactory,
            conversationRepository);
        return conversation;
    }
};
