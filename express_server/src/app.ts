import middlewares from "./middlewares";
import express from "express";
import apiRoutes from "./apiRoutes";
import {ConversationsController} from "./controllers/conversations";
import {ConversationMessagesController} from "./controllers/conversationMessages";

export const createServer = (application: express.Application, conversationsController: ConversationsController, messagesController: ConversationMessagesController) => {
    apiRoutes(application, conversationsController, messagesController);

    application.use(middlewares.notFound);
    application.use(middlewares.errorHandler);

    return application;
}