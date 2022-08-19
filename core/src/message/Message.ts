import {MessageMeta} from "src/message/MessageMeta";

export abstract class Message {
    id?: string;
    body: string;
    createdAt: Date;
    meta: MessageMeta;
    authorId: string;
    conversationId: string;
}

export function constructMessage(body: string, authorId: string, conversationId: string): Message {
    return {
        meta: {
            deliveredTo: [],
            readBy: []
        },
        conversationId,
        body,
        createdAt: new Date(Date.now()),
        authorId
    }
}