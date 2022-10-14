import {Message} from "../Message";

export interface ListMessagesForConversation {
    (conversationId: string, limit: number, skip: number): Promise<Message[]>;
}
