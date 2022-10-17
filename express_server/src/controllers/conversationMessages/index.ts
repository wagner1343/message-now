import express from "express";
import {AddMessageToConversation} from "@message_now/core";
import {Conversation, GetConversation, ListMessagesForConversation} from "@message_now/core";

export class ConversationMessagesController {
    private readonly _addMessageToConversation: AddMessageToConversation;
    private readonly _listMessagesForConversation: ListMessagesForConversation;
    private readonly _getConversation: GetConversation;

    constructor(addMessageToConversation: AddMessageToConversation, listMessagesForConversation: ListMessagesForConversation, getConversation: GetConversation) {
        this._addMessageToConversation = addMessageToConversation;
        this._listMessagesForConversation = listMessagesForConversation;
        this._getConversation = getConversation;
    }

    async create(req: express.Request, res: express.Response) {
        const {body} = req.body;
        const conversation = this._conversation(res);
        const uid = this._userId(res);
        const message = await this._addMessageToConversation(conversation.id, uid, body);
        res.status(201);
        res.json(message);
    }

    async list(req: express.Request, res: express.Response) {
        const {limit, offset} = req.body;
        const conversation = this._conversation(res);
        res.json(await this._listMessagesForConversation(conversation.id, limit, offset));
    }

    private _conversation(res: express.Response): Conversation {
        return res.locals.conversation;
    }

    private _userId(res: express.Response): string {
        return res.locals.idToken.uid;
    }
}
