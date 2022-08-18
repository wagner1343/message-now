import {Conversation, Message, Paginator} from '@twilio/conversations';
import {Avatar} from 'material-ui';
import React, {useEffect, useState} from 'react';
import {Profile} from 'src/models/Profile';
import ConversationListItem from "src/ui/pages/Home/components/ConversationListItem";
import ConversationListItemLoading from "src/ui/pages/Home/components/ConversationListItemLoading";

interface ConversationListItemContainer {
    conversation: Conversation;
}

function ConversationListItemContainer({conversation}: ConversationListItemContainer) {
    const [contactProfile, setContactProfile] = useState<Profile>();
    const [lastMessage, setLastMessage] = useState<Message>();

    const loadLastMessage = async () => {
        const paginator = await conversation.getMessages(1);
        setLastMessage(paginator.items[0]);
    }

    const handleMessageAdded = (message: Message) => {
        setLastMessage(message);
    };

    useEffect(() => {
        loadLastMessage();

        conversation.on("messageAdded", handleMessageAdded);
        return () => {
            conversation.off("messageAdded", handleMessageAdded)
        };
    }, [conversation]);
    return (
        contactProfile ?
            (<ConversationListItem title={contactProfile.name} lastMessage={lastMessage?.body ?? "Nova mensagem"}
                                   avatar={<Avatar src={contactProfile.avatarUrl}/>}/>)
            : (<ConversationListItemLoading/>)
    );
}

export default ConversationListItemContainer;