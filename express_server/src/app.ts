import express from "express";
import apiRoutes from "./apiRoutes";
import {ConversationMessagesController, ConversationsController} from "./controllers";
import {GetConversation} from "@message_now/core";

export const createServer = (application: express.Application, conversationsController: ConversationsController, messagesController: ConversationMessagesController, getConversation: GetConversation) => {
    apiRoutes(application, conversationsController, messagesController, getConversation);
    return application;
}