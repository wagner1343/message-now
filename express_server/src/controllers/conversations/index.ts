import express from "express";
import {CreateGroupConversation} from "@message_now/core";

export class ConversationsController {
    createGroupConversation: CreateGroupConversation;

    constructor(createGroupConversation: CreateGroupConversation) {
        this.createGroupConversation = createGroupConversation;
    }

    async create(req: express.Request, res: express.Response) {
        const {title, participants} = req.body;
        const conversation = await this.createGroupConversation(title, [...participants, res.locals.idToken.uid]);
        res.status(201);
        res.json(conversation);
    }
}
