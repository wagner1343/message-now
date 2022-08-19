import {ConversationMessagesRepository} from "src/repository/ConversationMessagesRepository";

export interface UserConversationMessagesRepository extends ConversationMessagesRepository {
    userId: string;
    conversationId: string;
}

export interface UserConversationMessagesRepositoryFactory {
    (userId: string, conversationId: string): UserConversationMessagesRepository;
}
