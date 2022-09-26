import {MessagesRepository} from "../MessagesRepository";

export interface UserConversationMessagesRepositoryFactory {
    (userId: string, conversationId: string): MessagesRepository;
}
