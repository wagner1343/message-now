import React, {Key} from 'react';
import ConversationListItem from "src/ui/pages/Home/components/ConversationList/ConversationListItem";
import useAuth from "src/hooks/auth/useAuth";
import {Avatar} from "@mui/material";
import {useConversationsProvider} from "src/ui/components/ConversationsProvider";
import {Conversation} from "@message_now/core";

interface ConversationListItemContainer {
    key?: Key;
    conversation: Conversation;
}

function ConversationListItemContainer({key, conversation}: ConversationListItemContainer) {
    const {auth: {uid}} = useAuth();
    const {setSelectedConversation, selectedConversation} = useConversationsProvider();

    return (
        <ConversationListItem
            isSelected={selectedConversation?.id === conversation.id}
            onClick={() => setSelectedConversation(conversation)}
            key={key} title={conversation.getTitle(uid)}
            lastMessage={conversation.lastMessage?.body ?? "Nenhuma mensagem"}
            avatar={<Avatar src={conversation.avatarUrl}/>}/>
    );
}


export default ConversationListItemContainer;
