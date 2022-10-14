import {Conversation} from "../Conversation";

export interface ListConversationsForUser {
    (userId: string, limit: number, skip: number): Promise<Conversation[]>;
}
