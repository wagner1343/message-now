import {MessageMeta} from "./MessageMeta";
import {Entity, IEntity} from "../entity/Entity";

export interface IMessage extends IEntity {
    body: string;
    createdAt: Date;
    meta: MessageMeta;
    authorId: string;
    conversationId: string;
}

export class Message extends Entity implements IMessage {
    body: string;
    createdAt: Date;
    meta: MessageMeta;
    authorId: string;
    conversationId: string;

    constructor(message: IMessage) {
        super(message);
        this.body = message.body;
        this.createdAt = message.createdAt;
        this.meta = message.meta;
        this.authorId = message.authorId;
        this.conversationId = message.conversationId;
    }
}