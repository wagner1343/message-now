import {ConversationRepository} from "../ConversationRepository";

export interface UserConversationRepositoryFactory {
    (userId: string): ConversationRepository;
}
