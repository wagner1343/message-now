import {GetConversation} from "@message_now/core/src";
import express from "express";

export const ensureIsConversationParticipant = (getConversation: GetConversation) => async function (req, res: express.Response, next) {
    const {conversationId} = req.params;
    const userId = res.locals.idToken.uid;

    const conversation = await getConversation(conversationId);
    if(!conversation.participants.some(p => p === userId)) {
        res.sendStatus(404);
        return;
    }

    res.locals.conversation = conversation;
    next();
    return;
}
