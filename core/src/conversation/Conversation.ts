import {Entity, IEntity} from "../entity/Entity";
import {Message} from "../message/Message";

export interface IConversation extends IEntity {
    avatarUrl?: string;
    type: ConversationType;
    participants: string[];
    title?: string;
    lastMessage?: Message;
}

export class Conversation extends Entity implements IConversation {
    avatarUrl?: string;
    type: ConversationType;
    participants: string[];
    title?: string;
    lastMessage?: Message;

    getTitle(currentUserId: string): string {
        return this.type === ConversationType.group ? this.title ?? "Group Conversation" : this.participants.find((pId) => pId !== currentUserId) ?? "Conversation";
    }

    constructor(conversation: IConversation) {
        super(conversation);
        this.avatarUrl = conversation.avatarUrl;
        this.type = conversation.type;
        this.participants = conversation.participants;
        this.title = conversation.title;
        this.lastMessage = conversation.lastMessage;
    }
}

export enum ConversationType {
    group = "group",
    direct = "direct"
}
