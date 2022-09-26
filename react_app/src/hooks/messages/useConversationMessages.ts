import useCollection from "src/hooks/firebase/useCollection";
import useAuth from "src/hooks/auth/useAuth";
import {IMessage} from "@message_now/core";

export default function useConversationMessages(conversationId: string) {
    const {auth: {uid}} = useAuth();
    const messagesPath = `users/${uid}/conversations/${conversationId}/messages`;
    const messagesCollection = useCollection<IMessage>(messagesPath);
    console.log("messagesPath", messagesPath);
    return {
        ...messagesCollection
    }
}
