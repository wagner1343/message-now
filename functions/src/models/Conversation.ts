import Message from "../models/Message";

export default interface Conversation {
    avatarUrl?: string;
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