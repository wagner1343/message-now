import {Conversation} from "@message_now/core";
import {Repository} from "src/repository/Repository";

export interface UserConversationRepository extends Repository<Conversation> {
    userId: string;
}

export interface UserConversationRepositoryFactory {
    (userId: string): UserConversationRepository;
}
