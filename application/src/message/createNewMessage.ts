import {Create, IMessage, MessageMeta} from "@message_now/core";

export const createNewMessage = (body: string, authorId: string, conversationId: string): Create<IMessage> => ({
    body,
    authorId,
    conversationId,
    createdAt: new Date(Date.now()),
    meta: new MessageMeta({readBy: [], deliveredTo: []})
})
