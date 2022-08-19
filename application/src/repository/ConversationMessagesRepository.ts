import {Message} from "@message_now/core";
import {Repository} from "src/repository/Repository";
import {ConversationRepository} from "src/conversation/ConversationRepository";

export interface ConversationMessagesRepository extends Repository<Message> {
    conversationId: string;
}

export interface ConversationMessagesRepositoryFactory extends ConversationRepository {
    (conversationId: string): ConversationMessagesRepository;
}