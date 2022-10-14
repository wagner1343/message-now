import {Router} from "express";
import {ConversationMessagesController, ConversationsController} from "./controllers";
import expressAsyncHandler from "express-async-handler";
import {ensureIsConversationParticipant} from "./middlewares/conversation/ensureIsConversationParticipant";
import {GetConversation} from "@message_now/core/src";

const apiRoutes = (router: Router, conversationsController: ConversationsController, messagesController: ConversationMessagesController, getConversation: GetConversation) => {
    const conversationsRouter = Router();
    conversationsRouter.post("/", (req, res) => conversationsController.create(req, res));
    conversationsRouter.get("/", (req, res) => conversationsController.list(req, res));

    const messagesRouter = Router();
    messagesRouter.post("/", (req, res) => messagesController.create(req, res));
    messagesRouter.get("/", (req, res) => messagesController.list(req, res));

    const v1Router = Router();
    v1Router.use("/conversations", conversationsRouter);
    v1Router.use("/conversations/:conversationId", expressAsyncHandler(ensureIsConversationParticipant(getConversation)));
    v1Router.use("/conversations/:conversationId/messages", messagesRouter);

    const apiRouter = Router();
    apiRouter.use("/api/v1", v1Router);

    router.use(apiRouter);
    return router;
}

export default apiRoutes;
