import {MessagesRepository} from "../MessagesRepository";

export interface ConversationMessagesRepositoryFactory {
    (conversationId: string): MessagesRepository;
}