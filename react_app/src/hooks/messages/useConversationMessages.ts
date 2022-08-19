import useCollection from "src/hooks/firebase/useCollection";
import useAuth from "src/hooks/auth/useAuth";
import {Message} from "@message_now/core";

export default function useConversationMessages(conversationId: string) {
    const {auth: {uid}} = useAuth();
    const messagesPath = `users/${uid}/conversations/${conversationId}/messages`;
    const messagesCollection = useCollection<Message>(messagesPath);
    console.log("messagesPath", messagesPath);
    return {
        ...messagesCollection
    }
}
