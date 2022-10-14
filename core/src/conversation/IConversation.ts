import {IEntity} from "../entity/Entity";
import {Message} from "../message";
import {ConversationType} from "./ConversationType";

export interface IConversation extends IEntity {
    avatarUrl?: string;
    type: ConversationType;
    participants: string[];
    title?: string;
    lastMessage?: Message;
}