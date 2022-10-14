import makeAddConversationMessage from "../usecases/messages/makeAddConversationMessage";
import {ConversationMessagesController} from "@message_now/express_server";
import makeListMessagesForConversation from "../usecases/messages/makeListMessagesForConversation";
import {makeGetConversation} from "../usecases/conversations/makeGetConversation";

const makeConversationMessagesController = () => {
    return new ConversationMessagesController(makeAddConversationMessage(), makeListMessagesForConversation(), makeGetConversation());
}

export default makeConversationMessagesController;
