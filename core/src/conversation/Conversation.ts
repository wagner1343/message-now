import {Entity} from "src/entity/Entity";
import {Message} from "src/message/Message";

export abstract class Conversation extends Entity {
    avatarUrl: string;
    type: ConversationType;
    participants: string[];
    title?: string;
    lastMessage?: Message;

    getTitle(currentUserId: string): string {
        return this.type === ConversationType.group ? this.title ?? "Group Conversation" : this.participants.find((pId) => pId !== currentUserId) ?? "Conversation";
    }
}

export enum ConversationType {
    group = "group",
    direct = "direct"
}
