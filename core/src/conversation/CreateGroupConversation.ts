import {Conversation} from "src/conversation/Conversation";

export interface CreateGroupConversation {
    (title: string, participants: string[]): Promise<Conversation>;
}
