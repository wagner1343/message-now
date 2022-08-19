import {Message} from "src/message/Message";

export interface AddMessageToConversation {
    (conversationId: string, authorId: string, body: string): Promise<Message>;
}
