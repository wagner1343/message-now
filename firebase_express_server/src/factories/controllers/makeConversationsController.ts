import {ConversationsController} from "@message_now/express_server";
import makeCreateGroupConversations from "../usecases/conversations/makeCreateGroupConversations";
import makeListConversationsForuser from "../usecases/conversations/makeListConversationsForuser";

const makeConversationsController = () => {
    return new ConversationsController(makeCreateGroupConversations(), makeListConversationsForuser())
}

export default makeConversationsController;
