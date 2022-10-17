import {Entity} from "../entity/Entity";
import {Message} from "../message";
import {ConversationType} from "./ConversationType";
import {IConversation} from "./IConversation";

export class Conversation extends Entity implements IConversation {
    avatarUrl?: string;
    type: ConversationType;
    participants: string[];
    title?: string;
    lastMessage?: Message;

    constructor(conversation: IConversation) {
        super(conversation);
        this.avatarUrl = conversation.avatarUrl;
        this.type = conversation.type;
        this.participants = conversation.participants;
        this.title = conversation.title;
        this.lastMessage = conversation.lastMessage;
    }

    getTitle(currentUserId: string): string {
        return this.type === ConversationType.group ? this.title ?? "Group Conversation" : this.participants.find((pId) => pId !== currentUserId) ?? "Conversation";
    }
}


