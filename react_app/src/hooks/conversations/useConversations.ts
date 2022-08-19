import axios from "src/axios/axios";
import useAuth from "src/hooks/auth/useAuth";
import useCollection from "src/hooks/firebase/useCollection";
import CreateMessageRequest from "src/models/CreateMessageRequest";
import {Conversation} from "@message_now/core";

export default function useConversations() {
    const {
        auth: {
            uid
        }
    } = useAuth();
    const conversationsRef = useCollection<Conversation>(`/users/${uid}/conversations`, {
        limit: 10
    });


    const sendMessage = async (conversationId: string, createMessageRequest: CreateMessageRequest) => {
        await axios.post(`/conversations/${conversationId}/messages`, createMessageRequest);
    }

    const createConversation = async (name: string, participants: string[]) => {
        return await axios.post(`/conversations`, {
            participants,
            title: name
        });
    }

    return {
        ...conversationsRef,
        sendMessage,
        createConversation
    }
}