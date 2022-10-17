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
import {makeExpressApp} from "./factories/express/makeExpressApp";
import {makeSocketIoServer} from "./factories/socket/makeSocketIoServer";
import {makeHttpServer} from "./factories/http/makeHttpServer";

process.env['GOOGLE_APPLICATION_CREDENTIALS'] = "keys/project-key.json";

const app = makeExpressApp();
const httpServer = makeHttpServer();
const io = makeSocketIoServer();

io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    console.log("token", token);
    socket.data.idToken = await firebaseAuth.verifyIdToken(token);
    next();
});
io.on("connection", (socket) => {
    const {uid} = socket.data.idToken;
    if(!uid) {
        throw Error("User not authenticated");
    }
    return socket.join(uid);
});
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(authenticateFirebaseUser(firebaseAuth as any));
createServer(app, makeConversationsController(), makeConversationMessagesController(), makeGetConversation());

io.listen(3000);
console.log("SocketIo listening on 3000 ...")

httpServer.listen(8080, () => {
    console.log("Listening on 8080 ...");
});
