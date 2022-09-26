import {Router} from "express";
import {ConversationsController} from "./controllers/conversations";
import {ConversationMessagesController} from "./controllers/conversationMessages";

const apiRoutes = (router: Router, conversationsController: ConversationsController, messagesController: ConversationMessagesController) => {
    const conversationsRouter = Router();
    conversationsRouter.post("/", (req, res) => conversationsController.create(req, res));

    const messagesRouter = Router();
    messagesRouter.post("/", messagesController.create);

    const v1Router = Router();
    v1Router.use("/conversations", conversationsRouter);
    v1Router.use("/messages", messagesRouter);

    const apiRouter = Router();
    apiRouter.use("/api/v1", v1Router);

    router.use(apiRouter);
    return router;
}

export default apiRoutes;
