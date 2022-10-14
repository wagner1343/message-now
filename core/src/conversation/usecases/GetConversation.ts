import {Conversation} from "../Conversation";

export interface GetConversation {
    (conversationId: string): Promise<Conversation>;
}
