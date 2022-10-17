import React, {createContext, Dispatch, SetStateAction, useContext, useState} from "react";
import useConversations from "src/hooks/conversations/useConversations";
import CreateMessageRequest from "src/models/CreateMessageRequest";
import {Conversation} from "@message_now/core";

interface ConversationsProviderType {
    selectedConversation?: Conversation;
    setSelectedConversation: Dispatch<SetStateAction<Conversation | undefined>>;
    conversations?: Conversation[];
    isLoadingConversations: boolean;
    sendMessage: (message: CreateMessageRequest) => Promise<any>;
    isSendingMessage: boolean;
    createConversation: (name: string, participants: string[]) => Promise<any>;
}

const ConversationsContext =
    createContext<ConversationsProviderType>(
        undefined as any as ConversationsProviderType
    );

export const useConversationsProvider = () =>
    useContext<ConversationsProviderType>(ConversationsContext);

export default function ConversationsProvider({children}) {
    const [selectedConversation, setSelectedConversation] = useState<Conversation>();
    const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);
    const {
        isLoading: isLoadingConversations,
        conversations,
        sendMessage: sendMessageToConversation,
        createConversation
    } = useConversations();

    const sendMessage = async (createMessageRequest: CreateMessageRequest) => {
        if (!selectedConversation) {
            return;
        }
        try {
            setIsSendingMessage(true);
            await sendMessageToConversation(selectedConversation.id, createMessageRequest);
        } catch (e) {
            console.log(e);
        } finally {
            setIsSendingMessage(false);
        }
    }
    return (
        <ConversationsContext.Provider value={{
            sendMessage,
            setSelectedConversation,
            selectedConversation,
            isLoadingConversations,
            conversations,
            isSendingMessage,
            createConversation
        }}>
            {children}
        </ConversationsContext.Provider>
    );
}
