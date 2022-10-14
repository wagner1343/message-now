import {Conversation} from "../Conversation";

export interface CreateGroupConversation {
    (title: string, participants: string[]): Promise<Conversation>;
}
