import * as functions from "firebase-functions";
import express, {NextFunction} from "express";
import cors from "cors";
import morgan from "morgan";
import authenticateFirebaseUser from "./middleware/authenticateFirebaseUser";
import {firebaseAdmin, firestore} from "./firebase";
import {AuthenticatedRequest} from "./requests/AuthenticatedRequest";
import Message from "./models/Message";
import Conversation, {ConversationType} from "./models/Conversation";
import firebase from "firebase";
import DocumentReference = firebase.firestore.DocumentReference;
import bodyParser from "body-parser";

process.env['GOOGLE_APPLICATION_CREDENTIALS'] = "keys/project-key.json";


const app = express();

app.use(cors({origin: true}));
app.use(authenticateFirebaseUser);
app.use(morgan("short"));
app.use(bodyParser.json());


const handleInternalError = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        next();
    }
    catch (e) {
        res.sendStatus(500);
    }
}


app.use(handleInternalError);

const postMessage = async (req: AuthenticatedRequest, res: express.Response) => {
    const {conversationId} = req.params;
    const userId = req.idToken.uid;
    const {body} = req.body;

    await addMessageAndBroadcast(conversationId, createMessage(body, userId));

    res.sendStatus(200);
}

const createMessage = (body: string, authorId: string): Message => {
    return {
        body,
        createdAt: firebaseAdmin.firestore.Timestamp.now(),
        meta: {
            readBy: [],
            deliveredTo: [],
        },
        authorId
    }
}

const createGroupConversation = async (req: AuthenticatedRequest, res: express.Response) => {
    const userId = req.idToken.uid;

    const {title, participants} = req.body;

    const conversation: Conversation = {
        type: ConversationType.group,
        participants: [userId, ...participants],
        title
    }

    const conversationRef = firestore.collection("conversations").doc();
    await conversationRef.set(conversation);

    addMessageAndBroadcast(conversationRef.id, createMessage("Group created", "system"));

    res.send(conversation);
}

const addMessageAndBroadcast = async (conversationId: string, message: Message) => {
    const {messageId} = await addMessageToConversation(conversationId, message);
    await broadcastMessageReceived(conversationId, messageId);
    await broadcastConversationUpdated(conversationId);
}

const broadcastConversationUpdated = async (conversationId: string) => {
    const conversationDoc = await firestore.collection("conversations").doc(conversationId).get();
    const conversation = conversationDoc.data() as Conversation | null;
    if (!conversation) {
        return;
    }

    for (const participantId of conversation.participants) {
        await firestore.collection("users")
            .doc(participantId)
            .collection("conversations")
            .doc(conversationId)
            .set(conversation);
    }
}

const broadcastMessageReceived = async (conversationId: string, messageId: string) => {
    const conversationDoc = await firestore.collection("conversations").doc(conversationId).get();
    const conversation = conversationDoc.data() as Conversation | null;

    const messageDoc = await firestore.collection("conversations")
        .doc(conversationId).collection("messages").doc(messageId).get();
    const message = messageDoc.data() as Message | null;

    if (!message || !conversation) {
        return;
    }

    for (const participantId of conversation.participants) {
        await firestore.collection("users")
            .doc(participantId).collection("conversations")
            .doc(conversationId).collection("messages")
            .doc(messageId).set(message);
    }
}

const addMessageToConversation = async (conversationId: string, message: Message) => {
    const conversationRef = firestore.collection("conversations").doc(conversationId);
    const messageDoc = conversationRef.collection("messages").doc();
    await messageDoc.set(message);
    await conversationRef.set({
        lastMessage: message
    }, {
        merge: true
    });

    return {
        messageId: messageDoc.id,
        message
    }
}

app.post("/conversations/:conversationId/messages", postMessage as any);
app.post("/conversations", createGroupConversation as any);

app.listen(8080, () => {
    console.log(`Example app listening on port ${8080}`)
})

