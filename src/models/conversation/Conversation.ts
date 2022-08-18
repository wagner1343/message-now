import {Model} from "src/models/Model";
import Message from "src/models/message/Message";

export default interface Conversation extends Model {
    avatarUrl: string;
    type: ConversationType;
    participants: string[];
    title?: string;
    lastMessage?: Message;
}

export enum ConversationType {
    group = "group",
    direct = "direct"
}

export function getTitle(conversation: Conversation, currentUserId: string) {
    return conversation.type === ConversationType.group ? conversation.title ?? "Group Conversation" : conversation.participants.find((pId) => pId !== currentUserId) ?? "Conversation";
}