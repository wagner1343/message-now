import express from "express";
import morgan from "morgan";
import cors from "cors";
import {createServer} from "@message_now/express_server";
import makeConversationsController from "./factories/controllers/makeConversationsController";
import makeConversationMessagesController from "./factories/controllers/makeConversationMessagesController";
import {authenticateFirebaseUser} from "@message_now/firebase";
import {firebaseAuth} from "./firebase/firebase";
import helmet from "helmet";
import {makeGetConversation} from "./factories/usecases/conversations/makeGetConversation";

process.env['GOOGLE_APPLICATION_CREDENTIALS'] = "keys/project-key.json";

const server = express();

server.use(morgan('dev'));
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(authenticateFirebaseUser(firebaseAuth as any));
createServer(server, makeConversationsController(), makeConversationMessagesController(), makeGetConversation());

server.listen(8080, () => {
    console.log("Listening on 8080 ...");
});