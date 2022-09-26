import {ConversationsController} from "@message_now/express_server";
import makeCreateGroupConversations from "../../factories/usecases/makeCreateGroupConversations";

const makeConversationsController = () => {
    return new ConversationsController(makeCreateGroupConversations())
}

export default makeConversationsController;
