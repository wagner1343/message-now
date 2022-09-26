import makeAddConversationMessage from "../usecases/makeAddConversationMessage";
import {ConversationMessagesController} from "@message_now/express_server";

const makeConversationMessagesController = () => {
    return new ConversationMessagesController(makeAddConversationMessage());
}

export default makeConversationMessagesController;
