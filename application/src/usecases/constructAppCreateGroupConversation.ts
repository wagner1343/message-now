import {ConversationType, CreateGroupConversation} from "@message_now/core";
import {ConversationRepository} from "src/conversation/ConversationRepository";
import {createAndBroadcastConversation} from "src/conversation/createAndBroadcastConversation";
import {createAndBroadcastMessage} from "src/message/createAndBroadcastMessage";
import {constructMessage} from "@message_now/core/dist/message/Message";
import {UserConversationMessagesRepositoryFactory} from "src/repository/UserConversationMessagesRepository";
import {UserConversationRepositoryFactory} from "src/repository/UserConversationRepository";
import {ConversationMessagesRepository} from "src/repository/ConversationMessagesRepository";

export const constructAppCreateDirectConversation = (
    conversationRepository: ConversationRepository,
    messageRepository: ConversationMessagesRepository,
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
            messageRepository,
            userConversationRepositoryFactory
        );
        createAndBroadcastMessage(constructMessage("Group created", "system", conversation.id), messageRepository, userConversationMessagesRepositoryFactory, conversationRepository);
        return conversation;
    }
};
