import express from "express";
import {AddMessageToConversation} from "@message_now/core";

export class ConversationMessagesController {
    addMessageToConversation: AddMessageToConversation;

    constructor(addMessageToConversation: AddMessageToConversation) {
        this.addMessageToConversation = addMessageToConversation;
    }

    async create(req: express.Request, res: express.Response) {
        const {body} = req.body;
        const {conversationId} = req.params;
        const {uid} = (req as any).idToken;
        const conversation = await this.addMessageToConversation(conversationId, uid, body);
        res.status(201);
        res.json(conversation);
    }
}
