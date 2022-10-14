import express from "express";
import {CreateGroupConversation} from "@message_now/core";
import {ListConversationsForUser} from "@message_now/core/src";

export class ConversationsController {
    private readonly _createGroupConversation: CreateGroupConversation;
    private readonly _listConversationsForUser: ListConversationsForUser;

    constructor(createGroupConversation: CreateGroupConversation, listConversationsForUser: ListConversationsForUser) {
        this._createGroupConversation = createGroupConversation;
        this._listConversationsForUser = listConversationsForUser;
    }

    async create(req: express.Request, res: express.Response) {
        const {title, participants} = req.body;
        const conversation = await this._createGroupConversation(title, [...participants, res.locals.idToken.uid]);
        res.status(201);
        res.json(conversation);
    }

    async list(req: express.Request, res: express.Response) {
        const {limit, offset} = req.body;
        const userId = res.locals.idToken.uid;
        res.json(await this._listConversationsForUser(userId, limit, offset));
    }
}
