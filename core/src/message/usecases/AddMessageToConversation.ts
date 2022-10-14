import {Message} from "../Message";

export interface AddMessageToConversation {
    (conversationId: string, authorId: string, body: string): Promise<Message>;
}
