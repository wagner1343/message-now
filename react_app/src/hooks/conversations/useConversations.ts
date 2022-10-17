import axios from "src/axios/axios";
import useAuth from "src/hooks/auth/useAuth";
import useCollection from "src/hooks/firebase/useCollection";
import CreateMessageRequest from "src/models/CreateMessageRequest";
import {Conversation, IConversation} from "@message_now/core";

export default function useConversations() {
    const {
        auth: {
            uid
        }
    } = useAuth();
    const conversationsRef = useCollection<IConversation>(`/users/${uid}/conversations`, {
        limit: 10
    });


    const sendMessage = async (conversationId: string, createMessageRequest: CreateMessageRequest) => {
        await axios.post(`/conversations/${conversationId}/messages`, createMessageRequest);
    }

    const createConversation = async (name: string, participants: string[]): Promise<Conversation> => {
        const response = await axios.post(`/conversations`, {
            participants,
            title: name
        });

        return new Conversation(response.data);
    }

    return {
        conversations: conversationsRef.ordered?.map((c) => new Conversation(c)),
        sendMessage,
        createConversation,
        ...conversationsRef
    }
}